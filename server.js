const express = require("express");
const path = require("path");

const app = express();
const PORT = 3333;

// Serve the React app
app.use(express.static(path.join(__dirname, "out")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "out", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
