import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isInlineImage } from '@/lib/images';

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

export function inlineImageResponse(src: string): NextResponse {
  const comma = src.indexOf(',');
  if (comma === -1) {
    return new NextResponse('Invalid image data', { status: 400 });
  }

  const header = src.slice(0, comma);
  const data = src.slice(comma + 1);
  const mime = header.match(/data:([^;]+)/)?.[1] ?? 'image/jpeg';
  const buffer = Buffer.from(data, 'base64');

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

/** Serve files from /public when DB stores a local path like /images/products/foo.webp */
export async function staticImageResponse(src: string): Promise<NextResponse | null> {
  const relativePath = src.startsWith('/') ? src : `/${src}`;
  const filePath = path.join(process.cwd(), 'public', relativePath);

  try {
    const buffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).slice(1).toLowerCase();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': MIME[ext] || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return null;
  }
}

export async function resolveImageResponse(src: string): Promise<NextResponse> {
  if (isInlineImage(src)) {
    return inlineImageResponse(src);
  }

  const local = await staticImageResponse(src);
  if (local) return local;

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return NextResponse.redirect(src, 302);
  }

  return new NextResponse('Not found', { status: 404 });
}
