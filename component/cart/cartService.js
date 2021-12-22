const Cart=require('../../models/Cart');

module.exports={
    getCart: async (user_id)=> {
        return Cart.findOne({user_id: user_id})
                    .populate('items.itemId');
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
                if(checkId==true&&checkSize==true){
                    return null;
                }else{
                    cart.items.push(items);
                    return cart.save();
                }
            }
        }catch(err){
            console.log(err);
        }
    },
    remove: async (user_id,itemId,itemSize)=>{
        try{
            let cart= await Cart.updateOne({'user_id': user_id,},{
                            $pull:{
                                items: {
                                    'itemId': itemId,
                                    'itemSize': itemSize,
                                }
                            }
                        })
            return cart;
        }catch(err){
            console.log(err);
            return null;
        }
    },
    
    removeCart: (id) => {return Cart.findByIdAndRemove(id);},

    update: async (user_id,items)=>{
        return Cart.findOneAndUpdate({user_id: user_id},{items:items});
    },

    getCartForOrder: (user_id) => {
        return Cart.findOne({user_id: user_id})
                    .populate('user_id')
                    .populate('items.itemId');
    },
    getCartById: (id) => {
        return Cart.findById(id)
                    .populate('user_id')
                    .populate('items.itemId');
    }
};
