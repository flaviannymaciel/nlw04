import express from 'express';
const app = express();
const port = 3456;

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World NLW04!' });
});

app.listen(port, () => console.log(`Server is running`));
