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
    },
    remove: async (req,res,next)=>{
        let user_id=req.body.userId;
        let itemId=req.body.productId;
        let itemSize=parseInt(req.body.productSize);
        let cart=await services.remove(user_id,itemId,itemSize);
        console.log(cart);
        if(!cart){
            res.status(500).send({message: 'Error'});
        }else{
            res.status(201).send(cart);
        }
    },
    update: async (req,res,next)=>{
        let user_id=req.body.userId;
        let itemId=req.body['id[]'];
        let itemSize=req.body['size[]'];
        let quantity=req.body['quantity[]'];
        let items=[];
        for(let i=0;i<itemId.length;i++){
            itemSize[i]=parseInt(itemSize[i]);
            quantity[i]=parseInt(quantity[i]);
            items.push({
                itemId: itemId[i],
                itemSize: itemSize[i],
                quantity: quantity[i],
            })
        }
        const cart = await services.update(user_id,items);
        if(!cart){
            res.status(500).send({message: 'Error'});
        }else{
            res.status(300).send(cart);
        }
    },
};
