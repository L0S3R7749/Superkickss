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
        let product=await Product.findById(productId);
        let comment={
            userId: userId,
            fullname: fullname,
            content: content,
        };
        product.comments.push(comment);
        product.save();
        return comment;
    },

    getRating: async (productId,page,perPage=5) =>{
        let product=await Product.findById(productId);
        let comments=product.comments.slice(perPage*page-perPage,perPage*page);
        const respone={
            allComment: product.comments,
            comments,
        };
        return respone;
    }
};