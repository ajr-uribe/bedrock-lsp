import { fileURLToPath } from 'node:url';

import * as fs from 'fs/promises';

export function getSchemaRequestService() {
  return async (uri: string): Promise<string> => {
    if (uri.startsWith('file://')) {
      const fsPath = fileURLToPath(uri);
      return await fs.readFile(fsPath, 'utf8');
    }

    if (
      uri.startsWith('http://') ||
      uri.startsWith('https://')
    ) {
      const res = await fetch(uri);

      if (!res.ok)
        throw new Error(
          `Failed to fetch ${uri}: ${res.statusText}`
        );

      return await res.text();
    }

    throw new Error(`Unhandled protocol: ${uri}`);
  };
}
