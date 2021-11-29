const apicaller = require('../../public/js/apiCaller');
const Product = require('../../models/schema/Product');

exports.find = (req, res) => {
    if (req.query.page) {
        let perPage=9;
        let page=req.query.page||1;
        Product.find() 
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => { 
                    if (err) return next(err);
                    res.send({products: products,
                                current: page, pages: Math.ceil(count/perPage)});
                });
            });
    } else if (req.query.search) {
        
    } else {
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
}