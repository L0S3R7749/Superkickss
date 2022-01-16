const services = require('./productsService');

module.exports = {
    list: async (req, res, next) => {
        try {
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
            const productList = await services.list(page);
            const countAll = await services.customCount();
            const pages = Math.ceil(countAll / 9);

            res.render('./default/index', {
                title: 'Products',
                body: '../product/shop',
                home: '/product?',
                products: productList,
                current: page,
                pages: pages
            });
        } catch (err) {
            next(err);
        }
    },

    search: async (req, res, next) => {
        try {
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
            const productList = await services.search_list(req.query.search, page);
            const countAll = await services.customCount(req.query.search);
            const pages = Math.ceil(countAll / 9);

            res.render('./default/index', {
                title: 'Search Results',
                body: '../product/shop',
                home: `/product/search?search=${req.query.search}&`,
                products: productList,
                current: page,
                pages: pages
            });
        } catch (err) {
            next(err);
        }
    },

    filter: async (req, res, next) => {
        const regex = /[.\-\ *+?^${}()|[\]\\]/g;
        const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
        const gender = (req.query.gender === undefined) ? '' : req.query.gender;
        const type = (req.query.type === undefined) ? '' : req.query.type;
        const brand = (req.query.brand === undefined) ? '' : req.query.brand;
        let price = req.query.price.split(regex);
        const min = price[1];
        const max = price[price.length - 1];
        const nameSort = (req.query.nameSort === undefined) ? 0 : parseInt(req.query.nameSort);
        const priceSort = (req.query.priceSort === undefined) ? 0 : parseInt(req.query.priceSort);

        try {
            const productList = await services.filter_list(gender, type, brand, min, max, nameSort, priceSort, page);
            const countAll = await services.filterCount(gender, type, brand, min, max);
            const pages = Math.ceil(countAll / 9);
            price = `%24${min}+-+%24${max}`
            res.render('./default/index', {
                title: 'Search Results',
                body: '../product/shop',
                home: `/product/filter?gender=${gender}&type=${type}&price=${price}&`,
                products: productList,
                current: page,
                pages: pages,
            });
        } catch (err) {
            next(err);
        }
    },

    product_detail: async (req, res, next) => {
        try {
            const idTarget = req.query.id;
            const targetProduct = await services.findSingleProduct(idTarget);
            /*find ramdom product by brand*/
            const randomProducts = await services.findRandomProductByBrand(targetProduct._id, targetProduct.brand);
            res.render('./default/index', {
                title: 'Product Detail',
                body: '../product/detail',
                product: targetProduct,
                randomProducts: randomProducts,
            });
        } catch (err) {
            next(err);
        }
    },

    rate: async (req, res, next) => {
        try {
            const {
                productId,
                userId,
                rating,
                content,
            } = req.body;
            const comment = await services.rating(productId, userId,
                rating, content);
            const product = await services.findSingleProduct(productId);
            let rate = parseInt(rating);
            let len = product.comments.length;
            for (let i = 0; i < len; i++) {
                rate += product.comments[i].rating;
            }
            rate = rate / (len + 1);
            rate = (Math.round(rate * 100) / 100).toFixed(1);
            await services.updateRate(productId, rate);
            let response = {
                comment,
                rate
            }
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },

    getRatings: async (req, res, next) => {
        const productId = req.params.id;
        try {
            let perPage = 5;
            let page = !Number.isNaN(req.query.page) && req.query.page > 0 ? Number.parseInt(req.query.page) : 1;
            let getRating = await services.getRating(productId, page, perPage);
            let totalPage = Math.ceil(getRating.allComment.length / perPage);
            const respone = {
                perPage,
                totalPage,
                rates: getRating.comments,
            }
            res.status(200).json(respone);
        } catch (err) {
            next(err);
        }
    },
};