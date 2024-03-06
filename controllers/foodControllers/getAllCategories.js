import fs from 'fs/promises';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsPath = path.join(__dirname, 'productsCategories.json');

export const productsCategories = async (req, res) => {

const categoriesData = await fs.readFile(productsPath, 'utf-8');

const categories = JSON.parse(categoriesData);

  res.status(200).json(categories);
}
