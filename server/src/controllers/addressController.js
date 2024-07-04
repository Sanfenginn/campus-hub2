const axios = require("axios");

const getAddress = async (req, res, next) => {
  const { input } = req.query;

  try {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const country = "au";
    console.log("apiKey", apiKey);
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input
    )}&filter=countrycode:${country}&apiKey=${apiKey}`;
    const response = await axios.get(url);
    // console.log("response data: ", response.data);
    res.formatResponse(200, response.data);
  } catch (err) {
    next(err);
  }
};

module.exports = getAddress;
