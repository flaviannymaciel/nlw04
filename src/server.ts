import 'reflect-metadata'; // importante vir primeiro
import express from 'express';
import './database';

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World NLW04!' });
});

const port = 3456;
app.listen(port, () => console.log(`Server is running`));
