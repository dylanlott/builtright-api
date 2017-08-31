module.exports = {
  secret: process.env.JWT_SECRET,
  database: process.env.NODE_ENV === 'production'
    ? `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${MONGODB_PORT}/builtright`
    : `mongodb://localhost:27017/builtright`,
  port: 3000,
  mailgun_priv_key: process.env.MAILGUN_PRIV_KEY || 'mailgun_priv_key',
  mailgun_domain: process.env.MAILGUN_DOMAIN || 'mailgun_domain',
  mailchimpApiKey: process.env.MAILCHIMP_API_KEY || 'mailchimp_api_key',
  sendgridApiKey: 'sendgrid api key here',
  stripeApiKey: 'stripe api key goes here',
  test_port: 3001,
  test_db: 'mern-starter-test',
  test_env: 'test'
};
