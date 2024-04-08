const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//get all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=8f639debdf1b433eaa2d41633738764b";

  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});
//get target amount
app.get("/convert", async (req, res) => {
  const { date, souceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const dataURL =
      `https://openexchangerates.org/api/historical/${date}.json?app_id=8f639debdf1b433eaa2d41633738764b`;
    const dataResponse = await axios.get(dataURL);
    const rates = dataResponse.data.rates;

    //rates
    const sourceRate=rates[souceCurrency];
    const targetRate=rates[targetCurrency];

    // final target value
    const targetAmount=(targetRate/sourceRate)*amountInSourceCurrency;

   return res.json(targetAmount.toFixed(2));

  } catch (err) {
    console.error(err);
  }
});

//listen to port
app.listen(5000, () => {
  console.log("server started");
});
