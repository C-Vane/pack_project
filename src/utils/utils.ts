import { hash } from 'bcryptjs';

const hashPassword = async (password?: string) => {
  return password ? await hash(password, 12) : undefined;
};

export const isValidEmail = (email: string) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    return false;
  }
  return email.match(validRegex);
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const Utils = {
  hashPassword,
  isValidEmail,
  isBase64Image,
};
