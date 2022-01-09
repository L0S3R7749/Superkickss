module.exports.home = (req,res)=>{
    res.render('./default/index',{title: 'Homepage',
    body:'../../views/default/home'});
}
