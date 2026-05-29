import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type,
      addRandomSuffix: true,
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    console.error('Upload failed', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
