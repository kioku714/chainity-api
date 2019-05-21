var Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  SMTP_HOST: Joi.string().required()
    .description('SMTP host required to send mail'),
  SMTP_PORT: Joi.number()
    .default(465),
  SMTP_USER: Joi.string().required()
    .description('SMTP user required to send mail'),
  SMTP_PASSWORD: Joi.required()
    .description('SMTP password required to send mail'),
  EMAIL_NOTIFICATION: Joi.string()
    .default('notification@chainity.co.kr'),
  EMAIL_CONTACT: Joi.string()
    .default('contact@chainity.co.kr'),
  WEB3_PROVIDER: Joi.required()
    .description('Web3 provier required to connect etherem network'),
  CONTRACT_ACCOUNT: Joi.required()
    .description('Contract account required for smart contract'),
  CONTRACT_ABI: Joi.required()
    .description('Contract ABI required for smart contract'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host required'),
  MONGO_PORT: Joi.number()
    .default(27017),
  ROOT_ID: Joi.string()
  .default('system'),
  ROOT_PASSWORD: Joi.string()
  .default('system'),
  ROOT_ROLE: Joi.string()
  .default('system'),
  GAS_PRICE: Joi.number()
  .default(1000000000), // 0.000000001 Ether (1 Gwei)
  GAS_LIMIT: Joi.number()
  .default(100000),
  IMAGE_UPLOAD_PATH: Joi.string()
  .default('upload/profile/'),
  IMAGE_URI: Joi.required()
    .description('Image uri required for thumbnail and avatar'),
  WEB_URI: Joi.required()
    .description('Web uri required to access web from email'),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  smtp: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASSWORD
  },
  email: {
    notification : envVars.EMAIL_NOTIFICATION,
    contact: envVars.EMAIL_CONTACT,
  },
  web3: {
    provier: envVars.WEB3_PROVIDER
  },
  contract: {
    abi: envVars.CONTRACT_ABI,
    account: envVars.CONTRACT_ACCOUNT
  },
  gas: {
    price: envVars.GAS_PRICE,
    limit: envVars.GAS_LIMIT
  },
  root: {
    id: envVars.ROOT_ID,
    password: envVars.ROOT_PASSWORD,
    role: envVars.ROOT_ROLE,
    keyStore: envVars.ROOT_KEYSTORE
  },
  bank: {
    nh : {
      api: envVars.BANK_NH_API,
      account: envVars.BANK_NH_FIN_ACCOUNT
    }
  },
  image: {
    uploadPath: envVars.IMAGE_UPLOAD_PATH,
    uri: envVars.IMAGE_URI
  },
  web: {
    uri: envVars.WEB_URI
  }
};

module.exports = config;