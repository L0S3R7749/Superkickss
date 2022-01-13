const Product = require('../../models/Product');

module.exports ={
    randomProduct: ()=>{
        return Product.aggregate([
            {$sample: {size: 6} }
        ]);
    }
}