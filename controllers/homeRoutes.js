const router = require('express').Router();
const {User, Category} = require('../models');

router.get('/', async(req, res) => {
    try{
        const userData = await User.findAll({
            include : [
                {
                    model: Category,
                    attributes: ['category_name']
                },
            ],
        });
        const users = userData.map((user) => user.get({ plain:true }));
        res.status(200).json({users});
        
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/buds', async function(req, res) {
try {
    const categories = await Category.findAll()
    console.log(categories);
    const parseData = categories.map((category) => category.get({plain:true}));
    console.log(parseData);
    res.render('buds', {parseData})
} catch (error) {
    res.json(error)
}
})

router.get('/bets', function(req, res) {
    res.render('bets', {nums:[{value:9},{value:8},{value:3},{value:7}]})
}) 

module.exports = router;