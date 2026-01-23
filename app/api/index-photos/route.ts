export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'index_photo');
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir);
    } catch {
      files = [];
    }
    const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
    const images = files
      .filter((f) => allowed.has(path.extname(f).toLowerCase()))
      .sort();
    return NextResponse.json({ images });
  } catch (e) {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
