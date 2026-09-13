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
  patchPlaceholderKeyCompletions,
  getPlaceholderValueCompletion,
} from './features/handlePlaceholders';
import { bedrockSchemas } from './loadSchemas.js';

import { createSchemaRequestService } from './features/handleSchemaProtocol.js';

const connection = createConnection(ProposedFeatures.all);

const documents = new TextDocuments(TextDocument);

const schemaService = createSchemaRequestService();

const jsonLanguageService = getLanguageService({
  schemaRequestService: schemaService,
});

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

documents.onDidChangeContent((e) => {
  validate(e.document);
});

documents.onDidOpen((e) => {
  validate(e.document);
});

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
    start: { line: params.position.line, character: 0 },
    end: params.position,
  });

  const placeholderValue = getPlaceholderValueCompletion(
    lineBefore,
    doc.uri
  );
  if (placeholderValue) {
    return {
      isIncomplete: false,
      items: [placeholderValue],
    };
  }

  const jsonDoc = jsonLanguageService.parseJSONDocument(doc);
  const base = await jsonLanguageService.doComplete(
    doc,
    params.position,
    jsonDoc
  );

  const items = base?.items ?? [];

  patchPlaceholderKeyCompletions(items, doc.uri);

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
