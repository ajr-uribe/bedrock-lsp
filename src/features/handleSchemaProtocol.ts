import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs/promises';

export function createSchemaRequestService() {
  return async (uri: string): Promise<string> => {
    if (
      uri.startsWith('http://') ||
      uri.startsWith('https://')
    ) {
      const res = await fetch(uri);
      if (!res.ok) throw new Error(`Failed to fetch ${uri}`);
      return await res.text();
    }

    if (uri.startsWith('file://')) {
      return await fs.readFile(fileURLToPath(uri), 'utf8');
    }

    throw new Error(`Unhandled: ${uri}`);
  };
}
