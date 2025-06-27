import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ success: false, message: "Filename missing" });
    }

    const inputPath = path.resolve(UPLOAD_DIR, name);
    const outputName = `converted-${name}.webp`;
    const outputPath = path.resolve(UPLOAD_DIR, outputName);

    await sharp(inputPath).toFormat('webp', { quality: 80 }).toFile(outputPath);

    return NextResponse.json({
      success: true,
      convertedName: outputName,
    });
  } catch (error: any) {
    console.error('Error in convert API:', error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
