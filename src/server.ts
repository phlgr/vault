import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_request, response) => {
  response.send('Hello Credentials!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}! 🚀`);
});
