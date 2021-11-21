module.exports.contact = (req,res,next)=>{
    res.render('./default/index',{title: 'Contact',
    body:'../../views/contact/contact',});
}
