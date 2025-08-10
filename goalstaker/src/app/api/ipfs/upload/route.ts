import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const form = new FormData();
  form.append('file', buffer, file.name);

  const pinataRes = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${(form as any)._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY!,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
    },
  });

  const ipfsHash = pinataRes.data.IpfsHash;
  return NextResponse.json({ cid: ipfsHash, url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` });
}
