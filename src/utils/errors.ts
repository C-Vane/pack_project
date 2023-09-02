import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { routes } from './routes';

export const handleApiErrors = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: any
) => {
  if (error && typeof error === 'number') {
    return res
      .status(error)
      .json({ error: ERROR_CODES_MESSAGES[error] || 'Unidentified error' });
  }

  if (error && error instanceof mongoose.Error.ValidationError) {
    for (let field in error.errors) {
      const msg = error.errors[field].message;
      return res.status(412).json({ error: msg });
    }
  }

  res.redirect(routes.serverError);
  return res.status(500).json({ error: error.message || 'Server Down' });
};

export const ERROR_CODES_MESSAGES: { [key: number]: string } = {
  500: 'Server Down',
  400: 'Invalid value',
  405: 'Method Not Allowed',
};
