const Product = require('../models/Product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/Category');
exports.createProduct = (req, res) => {
    // return res.status(200).json({
    //     file: req.files,
    //     body: req.body
    // })
    const {
        name,
        price,
        description,
        category,
        quantity,
        createdBy
    } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
        // we got some images of product
        productPictures = req.files.map(file => {
            return {
                img: file.filename
            }
        })
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        quantity: quantity,
        description: description,
        productPictures: productPictures,
        category: category,
        createdBy: req.user._id
    });

    product.save((error, prod) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        if (prod) {
            return res.status(201).json({
                product: prod
            })
        }
    })
};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id type')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) {
                            return res.status(400).json({ error });
                        }
                        if (category.type) {
                            if (products.length > 0) {
                                return res.status(200).json({
                                    products,
                                    productsByPrice: {
                                        under5k: products.filter(product => product.price <= 5000),
                                        under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                        under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                        under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                        under30k: products.filter(product => product.price > 20000 && product.price <= 30000)
                                    }
                                })
                            }
                        }
                        else {
                            return res.status(200).json({ products })
                        }
                    })
            }
            else {
                return res.status(200).json({ category })
            }
        })
};

// new update
exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findOne({ _id: productId }).exec((error, product) => {
            if (error) return res.status(400).json({ error });
            if (product) {
                res.status(200).json({ product });
            }
        });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};

exports.deleteProductById = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
        .select("_id name price quantity slug description productPictures category")
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({ products });
};