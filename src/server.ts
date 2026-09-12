import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  TextDocumentSyncKind,
  CompletionItemKind,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getLanguageService } from 'vscode-json-languageservice/lib/esm/jsonLanguageService.js';
import {
  isUuidValueContext,
  getUuidValueCompletion,
  patchUuidKeyCompletions,
} from './features/uuid';
import { bedrockSchemas } from './loadSchemas.js';

const connection = createConnection(ProposedFeatures.all);

const documents = new TextDocuments(TextDocument);

const jsonLanguageService = getLanguageService({});

jsonLanguageService.configure({
  schemas: bedrockSchemas as any,
});

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        triggerCharacters: ['"', ':', '$'],
      },
      hoverProvider: true,
    },
  };
});

async function validate(document: TextDocument) {
  const jsonDoc =
    jsonLanguageService.parseJSONDocument(document);
  const diagnostics = await jsonLanguageService.doValidation(
    document,
    jsonDoc
  );

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

documents.onDidChangeContent((c) => validate(c.document));
documents.onDidClose((e) => {
  connection.sendDiagnostics({
    uri: e.document.uri,
    diagnostics: [],
  });
});

connection.onCompletion(async (params) => {
  const doc = documents.get(params.textDocument.uri);

  if (!doc) return null;

  const lineBefore = doc.getText({
    start: {
      line: params.position.line,
      character: 0,
    },
    end: params.position,
  });

  const jsonDoc = jsonLanguageService.parseJSONDocument(doc);
  const base = await jsonLanguageService.doComplete(
    doc,
    params.position,
    jsonDoc
  );
  const items = base?.items ?? [];

  if (isUuidValueContext(lineBefore)) {
    items.unshift(getUuidValueCompletion());
  }

  patchUuidKeyCompletions(items);

  return {
    isIncomplete: false,
    items,
  };
});

connection.onHover(async (params) => {
  const doc = documents.get(params.textDocument.uri);

  if (!doc) return null;

  const jsonDoc = jsonLanguageService.parseJSONDocument(doc);

  return jsonLanguageService.doHover(
    doc,
    params.position,
    jsonDoc
  );
});

documents.listen(connection);
connection.listen();
