const express = require('express'),
    validate = require('express-validation');
    
const paramValidation = require('../../config/param-validation'),
    userCtrl = require('../../controllers/user.controller')
    mailCtrl = require('../../controllers/mail.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/invitation/users/:userId')
  .post(function(req, res, next){
      req.receiver = req.user;
      next();
  }, function(req, res, next) {
    userCtrl.load(req, res, next, req.decoded._id);
  }, mailCtrl.sendInvitation);

// TODO
router.route('/invitation')
  .post(
    // validate(paramValidation.sendInvitation), 
  function(req, res, next){
    userCtrl.load(req, res, next, req.body.invitee);
    req.receiver = req.user;
    next();
  }, function(req, res, next) {
    userCtrl.load(req, res, next, req.decoded._id);
  }, mailCtrl.sendInvitation);

router.param('userId', userCtrl.load);

module.exports = router;