const AuthenticationController = require('../controllers/authentication');
const UserController = require('../controllers/user');
const ChatController = require('../controllers/chat');
const CommunicationController = require('../controllers/communication');
const StripeController = require('../controllers/stripe');
const express = require('express');
const passport = require('passport');
const constants = require('../constants');
const buildRoutes = require('./build.js');
const commentRoutes = require('./comment.js');
const ROLE_MEMBER = constants.ROLE_MEMBER;
const ROLE_CLIENT = constants.ROLE_CLIENT;
const ROLE_OWNER = constants.ROLE_OWNER;
const ROLE_ADMIN = constants.ROLE_ADMIN;

const passportService = require('../config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    const apiRoutes = express.Router()
    const authRoutes = express.Router()
    const userRoutes = express.Router()
    const chatRoutes = express.Router()
    const payRoutes = express.Router()
    const communicationRoutes = express.Router();

    //= ========================
    // Auth Routes
    //= ========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);
    apiRoutes.use('/builds', buildRoutes);
    apiRoutes.use('/comments', commentRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // Password reset request route (generate/send token)
    authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

    // Password reset route (change password using token)
    authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

    //= ========================
    // User Routes
    //= ========================

    // Set user routes as a subgroup/middleware to apiRoutes
    apiRoutes.use('/user', userRoutes);

    // View user profile route
    userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

    // Test protected route
    apiRoutes.get('/protected', requireAuth, (req, res) => {
      res.send({ content: 'The protected test route is functional!' });
    });

    apiRoutes.get('/admins', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
      res.send({ content: 'Admin dashboard is working.' });
    });

    //= ========================
    // Chat Routes
    //= ========================

    // Set chat routes as a subgroup/middleware to apiRoutes
    apiRoutes.use('/chat', chatRoutes);

    // View messages to and from authenticated user
    chatRoutes.get('/', requireAuth, ChatController.getConversations);

    // Retrieve single conversation
    chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

    // Send reply in conversation
    chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

    // Start new conversation
    chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

    //= ========================
    // Payment Routes
    //= ========================
    apiRoutes.use('/pay', payRoutes);

    // Webhook endpoint for Stripe
    payRoutes.post('/webhook-notify', StripeController.webhook);

    // Create customer and subscription
    payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

    // Update customer object and billing information
    payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

    // Delete subscription from customer
    payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

    // Upgrade or downgrade subscription
    payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

    // Fetch customer information
    payRoutes.get('/customer', requireAuth, StripeController.getCustomer);

    //= ========================
    // Communication Routes
    //= ========================
    apiRoutes.use('/communication', communicationRoutes);

    // Send email from contact form
    communicationRoutes.post('/contact', CommunicationController.sendContactForm);

    app.use('/health', function(req, res, next) {
      res.send('OK');
    });
    // Set url for API group routes
    app.use('/api', apiRoutes);
};
