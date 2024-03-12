import { Product } from "../../models/productsModel.js";

const getProductsFromAllFilters = async (req, res) => {
  const { category, title, filter } = req.query;
  const userBlood = req.user.blood;
  let userSearchProducts = [];
  let numberProducts = 0;
  const bloodGroups = {
  1: "groupBloodNotAllowed.1",
  2: "groupBloodNotAllowed.2",
  3: "groupBloodNotAllowed.3",
  4: "groupBloodNotAllowed.4",
};

  let groupBlood = bloodGroups[userBlood] || "groupBloodNotAllowed.1";


  const query = {
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(category && { category }),
    ...(filter !== 'all' && {[groupBlood]:filter === 'recomended'?true:{$ne:true}}),
  };



  userSearchProducts = await Product.find(query).exec();
  numberProducts = userSearchProducts.length;

  res.status(200).json({ numberProducts, userSearchProducts });
};

export default getProductsFromAllFilters;


