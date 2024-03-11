import { Product } from "../../models/productsModel.js";

const getProductsFromAllFilters = async (req, res) => {
  const { category, title, filter } = req.query;
  const userBlood = req.user.blood;
  let userSearchProducts = [];
  let numberProducts = 0;
  let groupBlood;


  switch (userBlood) {
    case 1:
      groupBlood = "groupBloodNotAllowed.1";
      break;
    case 2:
      groupBlood = "groupBloodNotAllowed.2";
      break;
    case 3:
      groupBlood = "groupBloodNotAllowed.3";
      break;
    case 4:
      groupBlood = "groupBloodNotAllowed.4";
      break;
    default:
      groupBlood = "groupBloodNotAllowed.1";
  }


  const allQuery = {
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(category && { category }),
    ...(filter && { filter }),
  };


  const recomendedProducs = {
    [groupBlood]: true,
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(category && { category }),
    ...(filter && { filter }),
  };

  const notRecomendedProducs = {
    [groupBlood]: { $ne: true },
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(category && { category }),
    ...(filter && { filter }),
  };

  let query = {};

  switch (filter) {
    case 'all':
      query = { ...allQuery };
      break;
    case 'recomended':
      query = { ...recomendedProducs };
      break;
    case 'not-recomended':
      query = {...notRecomendedProducs};
      break;
    default:
      query = { ...allQuery };
  }


  userSearchProducts = await Product.find(query).exec();
  numberProducts = userSearchProducts.length;

  res.status(200).json({ numberProducts, userSearchProducts });
};

export default getProductsFromAllFilters;


