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

    filter_list: (gender, type, brand, min, max, nameSort, priceSort, page = 1, perPage = 9) => {
        let sortQuery={};
        if(nameSort===0&&priceSort===0){

        }else if(nameSort===0) {
            sortQuery={
                price: priceSort,
            }
        }else if(priceSort===0){
            sortQuery={
                name: nameSort,
            }
        }else{
            sortQuery={
                name: nameSort,
                price: priceSort,
            }
        }

        let brandQuery = {};
        if (brand === 'other') {
            brandQuery = {
                'brand': {
                    $nin: ['Adidas', 'Nike', 'adidas', 'nike']
                }
            }
        } else {
            brandQuery = {
                'brand': {
                    $regex: brand,
                    $options: 'i',
                }
            }
        }
        
        let myQuery = {};
        myQuery = {
            $and: [{
                    'category.gender': {
                        $regex: gender,
                        $options: 'i',
                    }
                },
                {
                    'category.type': {
                        $regex: type,
                        $options: 'i',
                    }
                },
                brandQuery,
                {
                    'price': {
                        $gte: min,
                        $lte: max,
                    }
                }
            ]
        };
        return Product
            .find(myQuery)
            .sort(sortQuery)
            .skip((perPage * page) - perPage)
            .limit(perPage);
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

    filterCount: (gender, type, brand, min, max) => {
        let myQuery={};
        let brandQuery = {};
        if (brand === 'other') {
            brandQuery = {
                'brand': {
                    $nin: ['Adidas', 'Nike', 'adidas', 'nike']
                }
            }
        } else {
            brandQuery = {
                'brand': {
                    $regex: brand,
                    $options: 'i',
                }
            }
        }

        myQuery = {
            $and: [{
                    'category.gender': {
                        $regex: gender,
                        $options: 'i',
                    }
                },
                {
                    'category.type': {
                        $regex: type,
                        $options: 'i',
                    }
                },
                brandQuery,
                {
                    'price': {
                        $gte: min,
                        $lte: max,
                    }
                }
            ]
        }
        return Product.countDocuments(myQuery);
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

    updateRate: (productId,rate)=>{
        return Product.findByIdAndUpdate(productId, {
            $set: {
                rate: rate
            }
        });
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

    findRandomProductByBrand: (_id,brand) =>{
        let myQuery={};
        myQuery={
            $and: [
                {brand: brand},
                {_id: {$ne: _id }}
            ]
        }
        return Product.aggregate([
            {$match: myQuery},
            {$sample: {size: 5} }
        ]);
    },
};