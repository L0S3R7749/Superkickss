const Product = require('../../models/Product');

module.exports = {
    list: (page = 1, perPage = 9) => {
        return Product
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage);
    },

    search_list: (searchString, page = 1, perPage = 9) => {
        let myquery = {};
        myquery = {
            "name": {
                $regex: searchString,
                $options: 'i'
            }
        };
        return Product
            .find(myquery)
            .skip((perPage * page) - perPage)
            .limit(perPage);
    },

    filter_list: (gender, type, min, max, page = 1, perPage = 9) => {
        if (gender == '' && type == '') {
            return Product.find({
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
                .skip((perPage * page) - perPage)
                .limit(perPage);
        } else if (gender == '') {
            return Product.find({
                    'category.type': type,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
                .skip((perPage * page) - perPage)
                .limit(perPage);
        } else if (type == '') {
            return Product.find({
                    'category.gender': gender,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
                .skip((perPage * page) - perPage)
                .limit(perPage);
        } else {
            return Product.find({
                    'category.gender': gender,
                    'category.type': type,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
                .skip((perPage * page) - perPage)
                .limit(perPage);
        }
    },

    customCount: (searchString) => {
        return Product
            .countDocuments(searchString ? {
                "name": {
                    $regex: searchString,
                    $options: 'i'
                }
            } : {});
    },

    filterCount: (gender,type,min,max)=>{
        if (gender == '' && type == '') {
            return Product.countDocuments({
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
        } else if (gender == '') {
            return Product.countDocuments({
                    'category.type': type,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
        } else if (type == '') {
            return Product.countDocuments({
                    'category.gender': gender,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
        } else {
            return Product.countDocuments({
                    'category.gender': gender,
                    'category.type': type,
                    price: {
                        $gt: min,
                        $lt: max
                    }
                })
        }
    },

    findSingleProduct: (id) => {
        return Product
            .findById(id);
    },

    rating: async (productId, userId, rating, content) => {
        let product = await Product.findById(productId);
        let comment = {
            userId: userId,
            rating: rating,
            content: content,
        };
        product.comments.push(comment);
        product.save();
        return comment;
    },

    getRating: async (productId, page, perPage = 5) => {
        let product = await Product.findById(productId)
            .populate('comments.userId');

        let comments = product.comments.slice(perPage * page - perPage, perPage * page);
        const respone = {
            allComment: product.comments,
            comments,
        };
        return respone;
    },
};