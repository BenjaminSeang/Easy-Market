const ProductController = require("../controllers/product.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {

    app.get("/api/products", ProductController.findAllProducts);
    app.post("/api/products", authenticate, ProductController.createNewProduct);
    app.get("/api/productsbyuser/:username", authenticate, ProductController.findAllProductsByUser);
    app.get("/api/products/:id", ProductController.findOneProduct); 
    app.delete("/api/products/:id", ProductController.deleteProduct);
    app.put("/api/products/:id", ProductController.updateProduct);
    
}