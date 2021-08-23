export type DB = {
  credentials: Credential[];
};

export type Credential = {
  _id?: string;
  service: string;
  username: string;
  password: string;
};
