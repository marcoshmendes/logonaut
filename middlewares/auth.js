const API_TOKEN = process.env.API_TOKEN;

function authenticate(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ err: 'unauthorized' });
	}

	const token = authHeader.split(' ')[1]?.trim();

	if (token !== API_TOKEN) {
		return res.status(403).json({ err: 'forbidden' });
	}

	next();
}

module.exports = { authenticate };