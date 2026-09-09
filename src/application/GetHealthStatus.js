const ChironCliGateway = require('./ChironCliGateway');

class GetHealthStatus {
    constructor(chironCliGateway) {
        this.chironCliGateway = chironCliGateway;
    }

    async execute() {
        const cli = await this.chironCliGateway.getCliInfo();
        return {
            status: 'ok',
            uptime: process.uptime(),
            chiron_cli: {
                version: cli.version,
                channel: cli.channel,
                installed_at: cli.installed_at,
                source: cli.source
            }
        };
    }
}

module.exports = GetHealthStatus;
