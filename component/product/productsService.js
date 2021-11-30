const Product = require('../../models/schema/Product');

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Product.findById(id)
            .then(data => {
                if (!data)
                    res.status(400).send({message : "Not found product with id " + id});
                else
                    res.send(data);
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving product with id " + id});
            })

    }
    else {
        Product.find()
            .then(data => {
                res.send(data);
            })
            .catch(err=>{
                res.status(500).send({message:err.message || "Error occurred while retrieving product information!"});
            });
    }
}

exports.list = (req, res) => {
    let perPage=9;
    let page= (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page : 1;
    console.log(page);
    let myquery = {};
    if (req.query.search) {
        myquery.$or = [
            {"name" : {$regex : req.query.search, $options : 'i'}},
            {"description" : {$regex : req.query.search, $options : 'i'}},
        ];
    }
    Product.find(myquery)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.find(myquery).countDocuments((err, count) => { 
                if (err) return next(err);
                console.log(count);
                res.send({products: products,
                            current: page, pages: Math.ceil(count/perPage)});
            });
        });
}