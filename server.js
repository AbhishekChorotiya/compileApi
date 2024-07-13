const express = require("express");
const cors = require("cors");
const axios = require("axios");
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/compile", async (req, res) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  try {
    let bodyContent = JSON.stringify({
      properties: {
        language: req.body.language,
        files: [
          {
            name: req.body.fileName,
            content: req.body.code,
          },
        ],
        stdin: null,
      },
    });

    let reqOptions = {
      url: "https://onecompiler.com/api/code/exec",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
