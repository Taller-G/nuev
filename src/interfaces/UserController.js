const CreateUser = require('../application/CreateUser');
const InMemoryUserRepository = require('../infrastructure/InMemoryUserRepository');

class UserController {
    constructor() {
        this.userRepository = new InMemoryUserRepository();
        this.createUserUseCase = new CreateUser(this.userRepository);
    }

    createUser(req, res) {
        const userDto = req.body;
        const user = this.createUserUseCase.execute(userDto);
        res.json(user);
    }
}

module.exports = UserController;
