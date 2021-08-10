export type DB = {
  credentials: Credential[];
};

export type Credential = {
  service: string;
  username: string;
  password: string;
};
