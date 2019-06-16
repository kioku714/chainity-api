var jwt = require('jsonwebtoken');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var User = require('../models/user.model');
var config = require('../config/config');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ejs = require('ejs');
var debug = require('debug')('api:mail');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: true,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

 const encode = function(_id, email) {
  var cipher = crypto.createCipher('aes-256-cbc', 'CHANGE_THIS_TO_SOMETHING_RANDOM') // TODO
  var result = cipher.update(_id + '::' + email + '::' + Date.now(), 'utf8', 'base64')
  return result += cipher.final('base64')
 }
 
/**
 * Send invitation
 * @param {string} req.body.email - email of new user.
 * @param res
 * @param next
 * @returns {*}
 */
function sendInvitation(req, res, next) {
  var invitationFrom = req.user.name;
  var invitationLink = config.web.uri  + '/#/invitation?token=' + encode(req.receiver._id, req.receiver.email);

  ejs.renderFile(__dirname + "/../emails/invite.ejs", {
    'invitationFrom': invitationFrom, 
    'invitationLink': invitationLink,
    'groupName': req.groupName,
    'contact': config.email.contact
  }, function (err, data) {
    if (err) {
        console.error(err);
        next(err);
    } else {
      var mailOptions = {
        from: invitationFrom + ' ' + '<' + config.email.notification + '>', // sender address
        // from: invitationFrom + ' ' + '<' + config.email.contact + '>', // sender address
        to: req.receiver.email, // list of receivers
        subject: req.groupName + ' 커뮤니티 초대장', // Subject line
        html: data
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          next(err);
        else
          debug('Message sent successfully as %s to %s', info.messageId, info.accepted)
          debug('Preview URL: ' + nodemailer.getTestMessageUrl(info));
          res.json(info);
      });
    }  
  });

}

/**
 * @deprecated
 * Send approved 
 * @param {string} req.body.email - email of user to be approved.
 * @param {string} req.body.name - name of user to be approved.
 * @param res
 * @param next
 * @returns {*}
 */
function sendApprovalComplete(req, res, next) {
  var receiver = {
    email : req.body.email,
    name : req.body.name
  }
  var loginLink = config.web.uri  + '/login';

  ejs.renderFile(__dirname + "/../emails/welcome.ejs", {
    'email': receiver.email, 
    'name': receiver.name,
    'loginLink': loginLink,
    'groupName': req.groupName,
    'contact': config.email.contact
  }, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      var mailOptions = {
        from: invitationFrom + ' ' + '<' + config.email.notification + '>', // sender address
        to: receiver.email, // list of receivers
        subject: req.groupName + ' 회원 가입 승인 안내', // Subject line
        html: data
      };
      
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          next(err);
        else
          res.json(info);
      });
    }
  })
}

module.exports = { sendInvitation, sendApprovalComplete};