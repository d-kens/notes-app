const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
	max: 5, // Limit each IP to 5 requests per `window` per minute
    message: {
        message: 'Too many login requests from this IP, try again after a 60 seconds pause'
    },
    handler: (req, res, next, options) => { // handles what is going to happen when this limit is achieved
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter