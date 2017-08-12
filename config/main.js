const secrets = require('./secrets');

if (!secrets) {
  console.log('You must create a secrets file');
}

module.exports = {
  secret: secrets.JWT_SECRET,
  database: process.env.NODE_ENV === 'production' 
    ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/builtright`
    : `mongodb://localhost:27017/builtright`,
  port: 3000,
  mailgun_priv_key: process.env.MAILGUN_PRIV_KEY || secrets.MAILGUN_PRIV_KEY,
  mailgun_domain: process.env.MAILGUN_DOMAIN || secrets.MAILGUN_DOMAIN,
  mailchimpApiKey: process.env.MAILCHIMP_API_KEY || secrets.MAILCHIMP_API_KEY,
  sendgridApiKey: 'sendgrid api key here' || secrets.SENDGRID_API_KEY,
  stripeApiKey: 'stripe api key goes here' || secrets.STRIPE_API_KEY,
  test_port: 3001,
  test_db: 'mern-starter-test',
  test_env: 'test'
}; 