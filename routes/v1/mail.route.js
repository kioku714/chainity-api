const express = require('express'),
    validate = require('express-validation');
    
const paramValidation = require('../../config/param-validation'),
    userCtrl = require('../../controllers/user.controller')
    mailCtrl = require('../../controllers/mail.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/invitation')
  .post(validate(paramValidation.sendInvitation), 
  (req, res, next) => userCtrl.load(req, res, next, req.body.invitee),
  (req, res, next) => {
    req.receiver = req.user;
    userCtrl.load(req, res, next, req.decoded._id);
  }, mailCtrl.sendInvitation);

router.param('userId', userCtrl.load);

module.exports = router;