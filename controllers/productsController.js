// In-memory smartphone store
let products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    RAM: '8GB',
    storage: '256GB',
    battery: '3274 mAh',
    camera: '48MP triple',
    stock: 50
  },
  {
    id: 2,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    RAM: '12GB',
    storage: '512GB',
    battery: '5000 mAh',
    camera: '200MP quad',
    stock: 30
  },
  {
    id: 3,
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: 899,
    RAM: '12GB',
    storage: '128GB',
    battery: '5050 mAh',
    camera: '50MP triple',
    stock: 40
  }
];

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};

const createProduct = (req, res) => {
  try {
    const { name, brand, price, RAM, storage, battery, camera, stock } = req.body;
    if (!name || !brand || price == null || !stock) {
      return res.status(400).json({ error: 'Required fields: name, brand, price, stock' });
    }
    const newProduct = {
      id: products.length + 1,
      name,
      brand,
      price: parseFloat(price),
      RAM,
      storage,
      battery,
      camera,
      stock: parseInt(stock)
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const updates = req.body;
  products[index] = { ...products[index], ...updates };
  res.json(products[index]);
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
