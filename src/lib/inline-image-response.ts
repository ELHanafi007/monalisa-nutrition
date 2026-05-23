import { NextResponse } from 'next/server';

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
