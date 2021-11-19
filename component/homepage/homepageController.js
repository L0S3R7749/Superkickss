module.exports.home = (req,res,next)=>{
    res.render('./default/index',{title: 'Homepage',
    body:'../../views/default/home',header: '../../views/default/header', footer: '../../views/default/footer'});
}
