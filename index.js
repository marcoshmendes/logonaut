require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const { authenticate } = require('./middlewares/auth');
const { getLogs, getErrorLogs } = require('./controllers/logController');

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: { err: 'too_many_requests' }
});

app.use(limiter);

app.get('/logs', authenticate, getLogs);
app.get('/logs/error', authenticate, getErrorLogs);

app.listen(PORT, () => {
	console.log(`🚀 Logonaut running at: http://localhost:${PORT}`);
});
