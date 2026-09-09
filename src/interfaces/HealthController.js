class HealthController {
    constructor(getHealthStatusUseCase) {
        this.getHealthStatusUseCase = getHealthStatusUseCase;
    }

    async getHealth(req, res) {
        const health = await this.getHealthStatusUseCase.execute();
        res.json(health);
    }
}

module.exports = HealthController;
