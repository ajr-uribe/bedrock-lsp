import { randomUUID } from 'node:crypto';
import { CompletionItemKind } from 'vscode-languageserver/node';
import { type CompletionItem } from 'vscode-languageserver/node';

type PlaceholderDef = {
  valueRegex: RegExp;
  keyRegex: RegExp;
  generate: () => string;
  kind: CompletionItemKind;
  detail: string;
  sortText?: string;
  fileMatch?: RegExp;
};

export const placeholders = {
  uuid: {
    valueRegex: /"(uuid|id|.*_id)"\s*:\s*"?[^"]*$/,
    keyRegex: /^(uuid|id|.*_id)$/,
    generate: () => randomUUID(),
    kind: CompletionItemKind.Value,
    detail: 'UUID v4',
  },
  name: {
    valueRegex: /"name"\s*:\s*"?[^"]*$/,
    keyRegex: /^name$/,
    generate: () => 'pack.name',
    kind: CompletionItemKind.Value,
    detail: 'Pack Name Translation Key',
    sortText: '0',
    fileMatch: /manifest\.json$/,
  },
  description: {
    valueRegex: /"description"\s*:\s*"?[^"]*$/,
    keyRegex: /^description$/,
    generate: () => 'pack.description',
    kind: CompletionItemKind.Value,
    detail: 'Pack Description Translation Key',
    sortText: '0',
    fileMatch: /manifest\.json$/,
  }
} satisfies Record<string, PlaceholderDef>
