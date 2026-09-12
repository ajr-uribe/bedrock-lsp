import { randomUUID } from 'node:crypto';
import {
  CompletionItem,
  CompletionItemKind,
} from 'vscode-json-languageservice';

export function isUuidValueContext(lineBefore: string): boolean {
  return /"(uuid|id|.*_id)"\s*:\s*"?[^"]*$/.test(lineBefore);
}

export function getUuidValueCompletion(): CompletionItem {
  const uuid = randomUUID();

  return {
    label: uuid,
    kind: CompletionItemKind.Value,
    detail: 'UUID v4',
    insertText: uuid,
    sortText: '0',
  };
}

export function patchUuidKeyCompletions(
  items: CompletionItem[]
) {
  const uuid = randomUUID();

  for (const item of items) {
    const clean = item.label.replaceAll('"', '');

    if (
      clean === 'uuid' ||
      clean == 'id' ||
      clean.endsWith('_id')
    ) {
      const newText = `"${clean}": "${uuid}"`;

      item.insertText = newText;

      // @ts-ignore
      if (item.textEdit) item.textEdit.newText = newText;
      item.detail = 'Insert with UUID';
    }
  }
}
