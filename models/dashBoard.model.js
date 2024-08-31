const db = require("../config/db.config");

const productCount = () => {
  return new Promise((resolve, reject) => {
    const queryActive =
      "SELECT count(*) as count FROM products WHERE isactive = ?";
    const queryTotal = "SELECT count(*) as count FROM products";

    Promise.all([
      new Promise((resolveQuery, rejectQuery) => {
        db.query(queryActive, [1], (err, result) => {
          if (err) return rejectQuery(err);
          resolveQuery(result[0].count);
        });
      }),
      new Promise((resolveQuery, rejectQuery) => {
        db.query(queryTotal, (err, result) => {
          if (err) return rejectQuery(err);
          resolveQuery(result[0].count);
        });
      }),
    ])
      .then(([activeCount, totalCount]) => {
        resolve({ activeCount, totalCount });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const salesunit = () => {
  return new Promise((resolve, reject) => {
    const queryUnit = "SELECT SUM(quantity) AS units FROM sales";
    const queryRevenue = `
      SELECT SUM(s.quantity * p.price) AS total_revenue
      FROM products p
      JOIN sales s ON p.id = s.product_id`;

    Promise.all([
      new Promise((resolveQuery, rejectQuery) => {
        db.query(queryUnit, (err, result) => {
          if (err) return rejectQuery(err);
          resolveQuery(result[0].units);
        });
      }),
      new Promise((resolveQuery, rejectQuery) => {
        db.query(queryRevenue, (err, result) => {
          if (err) return rejectQuery(err);
          resolveQuery(result[0].total_revenue);
        });
      }),
    ])
      .then(([units, revenue]) => {
        resolve({ units, revenue });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const productRevenue = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    DATE_FORMAT(aggregated_data.date, '%b/%Y') AS date,
    aggregated_data.revenue
    FROM (
      SELECT 
          DATE_FORMAT(s.date, '%Y-%m-01') AS date,
          SUM(s.quantity * p.price) AS revenue
      FROM 
          products p
      JOIN 
        sales s ON p.id = s.product_id
      GROUP BY 
        DATE_FORMAT(s.date, '%Y-%m-01')
    ) AS aggregated_data
      ORDER BY 
      aggregated_data.date
    LIMIT 0, 1000;
  `;

    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Function to get the sold units for each product
const soldUnits = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        p.name,
        SUM(s.quantity) AS units
      FROM 
        products p
      JOIN 
        sales s ON p.id = s.product_id
      GROUP BY 
        p.id, p.name
    `;

    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  productCount,
  productRevenue,
  soldUnits,
  salesunit,
};
