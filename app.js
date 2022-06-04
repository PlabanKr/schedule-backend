const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT ? process.env.PORT : 5300;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
