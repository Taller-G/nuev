const User = require('../domain/User');
const UserRepository = require('../domain/UserRepository');

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(dto) {
        const user = new User(dto.id, dto.name);
        this.userRepository.save(user);
        return user;
    }
}

module.exports = CreateUser;
