class ChironCliGateway {
    /**
     * Detects the Chiron CLI on this machine.
     * Must never throw: on any failure it resolves to
     * { version: 'not_installed', channel: null, installed_at: null, source: 'none' }.
     *
     * @returns {Promise<{version: string, channel: string|null, installed_at: string|null, source: 'manifest'|'cli_exec'|'none'}>}
     */
    async getCliInfo() {
        throw new Error('Not implemented');
    }
}

module.exports = ChironCliGateway;
