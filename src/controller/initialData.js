const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');

// helper fucntion to get categories and sub-categories in hierarchical  manner
// so it will make a recursive call to find the childrens of any category
function getCatHelper(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            parentId: cat.parentId,
            name: cat.name,
            slug: cat.slug,
            type: cat.type,
            categoryImage: cat.categoryImage,
            children: getCatHelper(categories, cat._id)
        })
    }
    return categoryList;
}

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select('_id name description quantity price productPictures slug category')
        .populate('category')
        .exec();
    const orders = await Order.find({})
        .populate("items.productId", "name")
        .exec();
    return res.status(200).json({
        categories: getCatHelper(categories),
        products,
        orders
    });
}