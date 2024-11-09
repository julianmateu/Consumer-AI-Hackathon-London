
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
});

export async function POST(request: Request) {
    const files = request.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
        console.log('No files uploaded');
        return new Response('No files uploaded', { status: 400 });
    }
    
    // Handle the files (e.g., save to disk, upload to cloud storage)
    console.log('Received files:', files.map((file) => file.originalname));
    
    // For demonstration, we'll just return a success message
    return new Response('Files uploaded successfully', { status: 200 });
}
