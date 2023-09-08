import express from 'express';

const app = express();
const PORT = 3001;

const users = [
  { username: 'alice', apiKey: 'alice@123' },
  { username: 'bob', apiKey: 'bob@123' },
  { username: 'charlie', apiKey: 'charlie@123' },
];

const apiKeyMiddleware = (req, res, next) => {
  console.log('🚀 ~ req:', req.method);
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(400).json({
      message: 'Missing API key',
    });
  }

  const existingUser = users.find((u) => u.apiKey === apiKey);

  if (!existingUser) {
    return res.status(401).json({
      message: 'API key is not valid',
    });
  }

  next();
};

const loggerAPIMiddleware = (req, res, next) => {
  // method
  // endpoint
  // time
  next();
};

app.use(apiKeyMiddleware);

app.get('/teachers', (req, res) => {
  res.json({
    message: 'API get teacher information',
  });
});

app.get('/students', (req, res) => {
  res.json({
    message: 'API get teacher information',
  });
});

app.get('/subjects', (req, res) => {
  res.json({
    message: 'API get teacher information',
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is running at PORT ${PORT}`);
});
