import { Product } from "../../models/productsModel.js";
import { bloodGroups } from "../../helpers/patterns.js";

const getProductsFromAllFilters = async (req, res) => {
  const { category, title, filter } = req.query;
  const userBlood = req.user.blood;
  let userSearchProducts = [];
  let numberProducts = 0;
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


