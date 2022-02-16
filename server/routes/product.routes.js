const ProductController = require("../controllers/product.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {

    app.get("/api/products", ProductController.findAllProducts);
    app.post("/api/products", authenticate, ProductController.createNewProduct);
    app.get("/api/productsbyseller/:username", authenticate, ProductController.findAllProductsBySeller);
    app.get("/api/products/:id", ProductController.findOneProduct); 
    app.delete("/api/products/:id", authenticate, ProductController.deleteProduct);
    app.put("/api/products/:id", authenticate, ProductController.updateProduct);
    
}