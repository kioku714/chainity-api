var Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      email: Joi.string().email().required(),
      status: Joi.string().required(),
      role: Joi.string().required()
    }
  },
  updateUser: {
    body: {
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  register: {
    body: {
      invitee: Joi.string().hex().required(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  sendInvitation: {
    body: {
      invitee: Joi.string().hex().required()
    }
  }
};