export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image: string;
  password?: string;
}

export interface DBUser {
  id: string;
  email: string;
  name: string;
  image: string;
  backgroundImage: string;
  bio: string;
}

export interface SignUpUser {
  email: string;
  name: string;
  password?: string;
  image?: string;
  bio?: string;
  externalId?: string;
}

export interface UserModifiableAttributes {
  image?: string;
  bio?: string;
  name?: string;
  backgroundImage?: string;
}
