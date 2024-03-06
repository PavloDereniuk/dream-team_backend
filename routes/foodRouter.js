import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import ctrl from "../controllers/foodControllers/index.js";
const foodRouter = express.Router();

foodRouter.get("/categories", authenticate, ctrl.productsCategories);
foodRouter.get("/filter", authenticate, ctrl.getProductsFromAllFilters);

export { foodRouter };
