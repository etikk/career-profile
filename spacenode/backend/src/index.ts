const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

//load json data from assets/example.json
const data = require("./assets/example.json");

console.log(data.validUntil);
console.log(data.legs.length);
console.table(data.legs);
