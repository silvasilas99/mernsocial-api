const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ message: 'Wellcome to user routes' });
})

module.exports = router;