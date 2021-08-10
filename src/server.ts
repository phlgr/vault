import express from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_request, response) => {
  const credentials = await readCredentials();

  response.status(200).json(credentials);
});

app.get('/', (_request, response) => {
  response.send('Hello Credentials!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}! 🚀`);
});
