class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    validate() {
        if (!this.id || !this.name) {
            throw new Error('Invalid User properties');
        }
    }
}

module.exports = User;
