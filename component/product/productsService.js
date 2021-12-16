const Product = require('../../models/Product');

module.exports = {
    list: (page=1,perPage=9) => {
        return Product
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage);
    },

    search_list: (searchString,page=1,perPage=9) => {
        let myquery = {};
        myquery = {"name" : {$regex : searchString, $options : 'i'}};
        return Product
            .find(myquery)
            .skip((perPage * page) - perPage)
            .limit(perPage);
    },

    customCount: (searchString) => {
        return Product
            .countDocuments(searchString ? {"name" : {$regex : searchString, $options : 'i'}} : {});
    },

    findSingleProduct: (id) => {
        return Product
            .findById(id);
    },

    rating: async (productId,userId,fullname,content) =>  {
        // console.log(productId);
        let product=await Product.findById(productId);
        // console.log(product);
        let comment={
            userId: userId,
            fullname: fullname,
            content: content,
        };
        product.comments.push(comment);
        product.save();
        return comment;
    },

    getRating: (productId) =>{
        return product= Product.findById(productId);
    }
};