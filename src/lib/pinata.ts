// lib/pinata.ts
import axios from 'axios';

const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY!;
const PINATA_BASE_URL = "https://api.pinata.cloud";

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export async function pinJSONToIPFS(json: Record<string, any>): Promise<PinataResponse> {
  try {
    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinJSONToIPFS`,
      json,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error pinning JSON to IPFS:", error);
    throw error;
  }
}

export async function pinFileToIPFS(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  const FormData = (await import('form-data')).default;
  const form = new FormData();
  form.append('file', fileBuffer, fileName);

  try {
    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinFileToIPFS`,
      form,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${(form as any)._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error pinning file to IPFS:", error);
    throw error;
  }
}