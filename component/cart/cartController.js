const services=require('./cartService');

module.exports={
    cart: async (req,res,next)=>{
        let user_id=req.user._id;
        let cart=await services.getCart(user_id);
        let total=0;
        for( let i=0;i<cart.items.length; i++){
            total+=cart.items[i].itemId.price * cart.items[i].quantity;
        }
        res.render('./default/index', { title: 'Cart' ,body: '../cart/cart',cart: cart, total:total});
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
