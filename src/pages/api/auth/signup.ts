import { NextApiRequest, NextApiResponse } from 'next';

import { createUser } from '@/src/utils/db';

import { handleApiErrors } from '@/src/utils/errors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!req.body) {
      return res.status(400).json({ error: 'Data is missing' });
    }

    const { name, email, password } = JSON.parse(req.body);

    const user = await createUser({ name, email, password });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    handleApiErrors(req, res, error);
  }
}

export default handler;
