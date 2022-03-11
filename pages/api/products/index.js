import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);
    case "POST":
      return await saveProduct(req, res);
    default:
      console.log("Method not allowed");
  }
}
// * GET PRODUCT FROM DataBase using GET
const getProduct = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM product");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// * SAVE PRODUCT TO DataBase using POST
const saveProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const [result] = await pool.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });
    return res
      .status(200)
      .json({ name, price, description, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};