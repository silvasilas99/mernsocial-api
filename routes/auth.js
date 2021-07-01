const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ message: 'Wellcome to auth routes' });
})

module.exports = router;