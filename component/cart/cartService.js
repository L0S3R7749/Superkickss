const Cart=require('../../models/Cart');

module.exports={
    getCart: {

    },
    addCart: async (userId,itemId,itemSize,itemQuantity)=>{
        try{
            let cart=await Cart.findOne({user_id: userId});
            itemSize=parseInt(itemSize);
            itemQuantity=parseInt(itemQuantity);
            let items={
                itemId,
                itemSize,
                quantity:itemQuantity,
            }
            if(!cart){
                const newCart=new Cart({
                    user_id: userId,
                    items: items,
                });
                return newCart.save();
            }else{
                let checkId=false;
                let checkSize=false;
                for(let i=0;i<cart.items.length;i++){
                    if(items.itemId==cart.items[i].itemId){
                        checkId=true;
                        if(items.itemSize===cart.items[i].itemSize){
                            checkSize=true;
                            break;
                        }  
                    }
                }
                if(checkId==false){
                    cart.items.push(items);
                    return cart.save();
                }else{
                    if(checkSize==false){
                        cart.items.push(items);
                        return cart.save();
                    }else{
                        return null;
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
    },
};
