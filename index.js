const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const ASTRO_URL = "https://astrosphericpublicaccess.azurewebsites.net/api/GetSky_V1";
const APIKey = "39936ACC3653A75D9348C52DD89974B416DB4F1BF6798B023A3EB860D15983883C9DC51F";

app.post("/sky", async (req, res) => {
  try {
    const nowUTC = Date.now();
    const payload = {
      Latitude: 29.9204,
      Longitude: -96.9263,
      MSSinceEpoch: nowUTC,
      APIKey
    };

    const result = await axios.post(ASTRO_URL, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.status(200).json(result.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Proxy error",
      detail: error.message,
      response: error.response?.data || null
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Astrospheric proxy running on port ${PORT}`);
});
