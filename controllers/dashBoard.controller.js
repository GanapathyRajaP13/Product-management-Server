const dash = require("../models/dashBoard.model");

exports.getProductCount = async (req, res) => {
  try {
    const count = await dash.productCount();
    if (!count || count.length === 0) {
      return res.status(404).send({ message: "No products found." });
    }
    res.status(200).json(count);
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).send({ error: "Error fetching product count." });
  }
};

exports.getProductSalesUnit = async (req, res) => {
  try {
    const data = await dash.salesunit();
    if (!data || data.length === 0) {
      return res.status(404).send({ message: "No Data found." });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching product Data:", error);
    res.status(500).send({ error: "Error fetching product Data." });
  }
};

exports.getProductRevenue = async (req, res) => {
  try {
    const revenue = await dash.productRevenue();
    if (!revenue || revenue.length === 0) {
      return res.status(404).send({ message: "No product revenue found." });
    }
    res.status(200).json(revenue);
  } catch (error) {
    console.error("Error fetching product revenue:", error);
    res.status(500).send({ error: "Error fetching product revenue." });
  }
};

exports.getUnitSold = async (req, res) => {
  try {
    const units = await dash.soldUnits();
    if (!units || units.length === 0) {
      return res.status(404).send({ message: "No Units found." });
    }
    res.status(200).json(units);
  } catch (error) {
    console.error("Error fetching product Units:", error);
    res.status(500).send({ error: "Error fetching product Units." });
  }
};
