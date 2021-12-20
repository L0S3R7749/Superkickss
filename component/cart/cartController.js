const services=require('./cartService');

module.exports={
    cart: (req,res,next)=>{
        res.render('./default/index', { title: 'Cart' ,body: '../order/cart'});
    },
    add: async(req,res,next)=>{
        let userId=req.body.userId;
        let itemId=req.body.itemId;
        let itemSize=req.body.itemSize;
        let itemQuantity=req.body.itemQuantity;

        try{
            const addCart=await services.addCart(userId,itemId,itemSize,itemQuantity);
            if(!addCart){
                res.status(400).send({message: `Can't add to cart`});
            }else{
                return addCart;
            }
        }catch(err){
            console.log(err);
        }
        
    }
};
