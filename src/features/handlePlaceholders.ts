import { placeholders } from '../data/placeholders';

import type { CompletionItem } from 'vscode-languageserver/node';

function getPlaceholderForValueContext(
  lineBefore: string,
  uri: string
) {
  for (const [name, def] of Object.entries(placeholders)) {
    if (def.fileMatch && !def.fileMatch.test(uri)) continue;
    if (def.valueRegex.test(lineBefore)) {
      return { name, def, value: def.generate() };
    }
  }
  return null;
}

function getPlaceholderForKey(label: string, uri: string) {
  const clean = label.replaceAll('"', '');
  for (const [name, def] of Object.entries(placeholders)) {
    if (def.fileMatch && !def.fileMatch.test(uri)) continue;
    if (def.keyRegex.test(clean)) {
      return { name, def, value: def.generate(), clean };
    }
  }
  return null;
}

export function getPlaceholderValueCompletion(
  lineBefore: string,
  uri: string
): CompletionItem | null {
  const match = getPlaceholderForValueContext(lineBefore, uri);
  if (!match) return null;

  return {
    label: match.value,
    kind: match.def.kind,
    detail: match.def.detail,
    insertText: match.value,
    sortText: match.def.sortText ?? '0',
  };
}

export function patchPlaceholderKeyCompletions(
  items: CompletionItem[],
  uri: string
) {
  for (const item of items) {
    const match = getPlaceholderForKey(item.label, uri);
    if (!match) continue;

    const newText = `"${match.clean}": "${match.value}"`;
    item.insertText = newText;
    // @ts-ignore
    if (item.textEdit) item.textEdit.newText = newText;
    item.detail = `Insert with ${match.name}`;
  }
}
