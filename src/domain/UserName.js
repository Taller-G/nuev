class UserName {
    constructor(name) {
        this.name = name;
        this.validate();
    }

    validate() {
        if (!this.name || this.name.length === 0) {
            throw new Error('User name cannot be empty');
        }
    }
}

module.exports = UserName;
