// Composition root. This is the only file allowed to know every layer at
// once: it wires infrastructure implementations into application use cases
// and hands them to the interface controllers (interfaces/ and domain/ must
// never import infrastructure/ directly).
const http = require('http');

const GetHealthStatus = require('./application/GetHealthStatus');
const ChironCliDetector = require('./infrastructure/ChironCliDetector');
const HealthController = require('./interfaces/HealthController');

const healthController = new HealthController(
    new GetHealthStatus(new ChironCliDetector())
);

const server = http.createServer(async (req, res) => {
    res.json = (body) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
    };

    if (req.method === 'GET' && req.url.split('?')[0] === '/health') {
        try {
            await healthController.getHealth(req, res);
        } catch (err) {
            res.statusCode = 500;
            res.json({ status: 'degraded', error: 'internal_error' });
        }
        return;
    }

    res.statusCode = 404;
    res.json({ error: 'not_found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`nuev listening on port ${PORT}`);
});
