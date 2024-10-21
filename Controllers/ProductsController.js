const { format } = require('date-fns');
const productsData = {
    products: require('../model/products.json'),
    setProducts: function (data) { this.products = data; }
};

const getAllProducts = (req, res) => {
    res.json(productsData.products);
}

const getSingleProduct = (req, res) => {
    const productId = parseInt(req.params.id); 
    const product = productsData.products.find(product => product.id === productId); 

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
}

const createNewProduct = (req, res) => {
    const singleProduct = {
        id: productsData.products?.length 
            ? productsData.products[productsData.products.length - 1].id + 1 
            : 1,
        product_name: req.body.name, 
        product_version: req.body.version,
        product_company: req.body.company,
        product_created_time: format(new Date(), 'ddMMyyyy\tHH:mm:ss')
    };

    const validationRules = [
        {
            field: singleProduct.product_name,
            validate: value => !!value, 
            message: "Product name is required."
        },
        {
            field: singleProduct.product_name,
            validate: value => value.length >= 3,
            message: "Product name must be at least 3 characters long."
        },
        {
            field: singleProduct.product_version,
            validate: value => !!value,
            message: "Product version is required."
        },
        {
            field: singleProduct.product_version,
            validate: value => /^\d+(\.\d+)*$/.test(value), 
            message: "Product version must be a valid version format (e.g., 1.0 or 2.1.0)."
        },
        {
            field: singleProduct.product_company,
            validate: value => !!value,
            message: "Product company is required."
        },
        {
            field: singleProduct.product_company,
            validate: value => value.length >= 2,
            message: "Product company name must be at least 2 characters long."
        },
        {
            field: singleProduct.product_created_time,
            validate: value => !!value,
            message: "Product created time is required."
        }
    ];    

    for (const rule of validationRules) {
        if (!rule.validate(rule.field)) {
            return res.status(400).json({ "message": rule.message });
        }
    }

    productsData.setProducts([...productsData.products || [], singleProduct]);
    res.status(201).json(productsData.products);
}

const updateProduct = (req, res) => {
    const productId = parseInt(req.body.id); 
    const product = productsData.products.find(prod => prod.id === productId);
    if (product) {
        product.name = req.body.name || product.name;
        product.version = req.body.version || product.version;
        product.company = req.body.company || product.company;
        product.createdAt = format(new Date(), 'ddMMyyyy\tHH:mm:ss'); 

        productsData.products.sort((a, b) => a.id - b.id);

        return res.status(200).json({ "message": "Product record updated successfully.", "products": productsData.products });
    }

    return res.status(400).json({ "message": "Unable to update product record. Product not found." });
};

const deleteProduct = (req, res) => {
    const productId = parseInt(req.body.id);
    const product = productsData.products.find(prod => prod.id === productId);

    if (!product) {
        return res.status(404).json({ "message": "No product data to be deleted." });
    }

    const filteredProducts = productsData.products.filter(prod => prod.id !== productId);
    productsData.setProducts(filteredProducts);
    productsData.products.sort((a, b) => a.id - b.id);
    return res.status(200).json(productsData.products);
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}