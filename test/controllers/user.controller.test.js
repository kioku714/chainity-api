// 'use strict';
// // var assert = require('assert');
// var sinon = require('sinon');
// // var chai = require('chai');
// // var mongoose = require('mongoose');
// // require('sinon-mongoose');

// const test = require('sinon-test')(sinon);

// const Controller = require('../../controllers/user.controller');
// const User = require('../../models/user.model');

// describe('TodoController testing', function () {
//   let req = {
//     body: {
//         email: "test@test.com",
//         role: "user",
//         status: "active",
//     }
//   },
//     error = new Error({ error: "blah blah" }),
//     res = {}, expectedResult;

//   describe('create', function () {
//     beforeEach(function () {
//         res = {
//             json: sinon.spy(),
//             status: sinon.stub().returns({ end: sinon.spy() })
//         };
//     });
//     it('should return created vehicle obj', test(async function () {
//         expectedResult = req.body
//         this.stub(User, 'create').yields(null, expectedResult);
//         await Controller.create(req, res);
//         // sinon.assert.calledWith(User.create, req.body);
//         sinon.assert.calledWith(res.json, sinon.match({ email: req.body.email }));
//         sinon.assert.calledWith(res.json, sinon.match({ role: req.body.role }));
//     }));
//     // it('should return status 500 on server error', test(function () {
//     //     this.stub(User, 'create').yields(error);
//     //     Controller.create(req, res);
//     //     sinon.assert.calledWith(User.create, req.body);
//     //     sinon.assert.calledWith(res.status, 500);
//     //     sinon.assert.calledOnce(res.status(500).end);
//     // }));
//   });
		
// })