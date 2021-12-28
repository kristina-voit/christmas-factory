import Product from "../models/christmas.model.js";

const getProducts= async (req, res) => {
  const allProducts = await Product.find();
  res.json(allProducts);
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  const foundProduct = await Product.findById(productId);
  res.json(foundProduct);
};

const postProduct = async (req, res) => {
  // neues Product Object aus den Request-Daten erstellen
  const newProduct = new Product({
    // new kommt aus Objektorientierung, man erstellt damit eine "Schablone"
    // wenn ich drauf zugreife, habe ich eine Instanziierung
    name: req.body.name,
    price: req.body.price,
    isDecorated: req.body.isDecorated,
    category: req.body.category,
    packageSize: req.body.packageSize,
    contactEmail: req.body.contactEmail,
    tags: req.body.tags,
  }); // neue Instanz unseres models
  const result = await newProduct.save();
  res.json(result);
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;

  const result = await Product.findByIdAndUpdate(productId, product, {
    returnDocument: "after",
  });
  res.json(result);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result) {
      res.json({ status: "Successfully deleted Product!" });
    } else {
      res.json({ status: "Could not delete Product" });
    }
  } catch (error) {
    res.json({ status: "Something else happend" });
  }
};

export { getProducts, getProduct, postProduct, updateProduct, deleteProduct };