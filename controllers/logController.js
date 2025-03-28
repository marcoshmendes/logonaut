const fs = require('fs').promises;
const path = require('path');

const LOG_FILE = path.resolve(process.env.LOG_FILE_PATH);
const ERROR_LOG_FILE = path.resolve(process.env.ERROR_LOG_FILE_PATH);

function sanitizeLines(queryLines) {
	const DEFAULT_LINES = 1000;
	const MAX_LINES = 5000;
	const parsed = parseInt(queryLines);
	const isInvalid = isNaN(parsed) || parsed <= 0 || parsed > MAX_LINES;

	return isInvalid ? DEFAULT_LINES : parsed;
}

async function getLogs(req, res) {
	const lines = sanitizeLines(req.query.lines);

	try {
		const data = await fs.readFile(LOG_FILE, 'utf8');
		const log = data.split('\n').slice(-lines).join('\n');

		res.status(200).set('Content-Type', 'text/plain').send(log);
	} catch (err) {
		console.error('Error reading log file:', err);
		res.status(500).json({ err: 'log_read_error' });
	}
}

async function getErrorLogs(req, res) {
	const lines = sanitizeLines(req.query.lines);

	try {
		const data = await fs.readFile(ERROR_LOG_FILE, 'utf8');
		const log = data.split('\n').slice(-lines).join('\n');

		res.status(200).set('Content-Type', 'text/plain').send(log);
	} catch (err) {
		console.error('Error reading error log file:', err);
		res.status(500).json({ err: 'error_log_read_error' });
	}
}

module.exports = {
    getLogs,
    getErrorLogs
};
