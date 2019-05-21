var express = require('express');

var groupRoutes = require('./group.route');
var imageRoutes = require('./image.route')

const router = express.Router();

router.use('/groups', groupRoutes);
router.use('/images', imageRoutes);

module.exports = router;