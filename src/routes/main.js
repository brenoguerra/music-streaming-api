const express = require('express');
const router = express.Router();

const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: "Music Streaming API",
    version: "0.0.1",
    author: "Swaggerzinho",
    description: "API simples desenvolvida com base no aplicativo de streaming musical Spotify."
  });
});

module.exports = router;
