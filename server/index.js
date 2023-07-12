const port = process.env.PORT || 3000

const express = require('express')
const app = express()
app.use(express.json())

app.listen(port, () => {
  console.log(`Book api server listening on ${port}`);
});

module.exports = {
  app: app
};