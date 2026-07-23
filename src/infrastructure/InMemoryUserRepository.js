const UserRepository = require('../domain/UserRepository');
const users = new Map();

class InMemoryUserRepository extends UserRepository {
    findById(id) {
        return users.get(id);
    }

    save(user) {
        users.set(user.id, user);
    }
}

module.exports = InMemoryUserRepository;
