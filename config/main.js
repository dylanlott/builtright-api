module.exports = {
  secret: 'super secret passphrase',
  database: process.env.NODE_ENV === 'production' 
    ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/builtright`
    : `mongodb://localhost:27017/builtright`,
  port: 3000,
  mailgun_priv_key: process.env.MAILGUN_PRIV_KEY,
  mailgun_domain: process.env.MAILGUN_DOMAIN,
  mailchimpApiKey: process.env.MAILCHIMP_API_KEY,
  sendgridApiKey: 'sendgrid api key here',
  stripeApiKey: 'stripe api key goes here',
  test_port: 3001,
  test_db: 'mern-starter-test',
  test_env: 'test'
}; 