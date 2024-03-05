import { Product } from "../../models/productsModel.js";

// Обробка Get-запитів для філтрації продуктів
const getProductsFromAllFilters = async (req, res) => {
  const { category, title, filter } = req.query;
  const userBlood = req.user.blood;
  console.log('userBlood', userBlood);
  let userSearchProducts = [];
  let numberProducts = 0;
  let groupBlood;

  console.log("Received parameters - title:", title, "category:", category, "filter:", filter);
  console.log("query = ", req.query);

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

  console.log(groupBlood)

  const allQuery = {
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(category && { category }),
    ...(filter && { filter }),
  };

  console.log('allQuery', allQuery)

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

  console.log("query ->", query);

  userSearchProducts = await Product.find(query).exec();
  numberProducts = userSearchProducts.length;

  res.status(200).json({ numberProducts, userSearchProducts });
};

export default getProductsFromAllFilters;


