import { productsCategories } from "./getAllCategories.js";
import getProductsFromAllFilters from "./getProductsFromAllFilter.js";
import {controllersWrapper}  from "../../helpers/controllersWrapper.js";

export default {
  productsCategories: controllersWrapper(productsCategories),
  getProductsFromAllFilters: controllersWrapper(getProductsFromAllFilters),
};