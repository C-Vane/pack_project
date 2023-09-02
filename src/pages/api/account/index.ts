import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { updateUserAttributes } from '@/src/utils/db';
import { authOptions } from '../auth/[...nextauth]';
import { handleApiErrors } from '@/src/utils/errors';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'PATCH') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user || !session.user.email) {
      return res.status(401).json('Unauthorized: Please log in.');
    }

    const { name, image, bio } = JSON.parse(req.body);

    const user = await updateUserAttributes({
      email: session.user.email,
      name,
      image,
      bio,
    });

    console.log(user);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    handleApiErrors(req, res, error);
  }
}

export default handler;
