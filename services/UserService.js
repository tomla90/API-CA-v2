class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async getOne(email) {
        return this.User.findOne({
            where: {email: email}
        })
    }

    async create(name, email, encryptedPassword, salt) {
        console.log('Creating user with name:', name, 'and email:', email);
        try {
          const users = await this.User.findAll({
            order: [['id', 'ASC']],
          });
      
          let nextId = 1;
          for (let i = 0; i < users.length - 1; i++) {
            if (users[i].id + 1 < users[i + 1].id) {
              nextId = users[i].id + 1;
              break;
            }
          }
          if (nextId === 1 && users.length > 0) {
            nextId = users[users.length - 1].id + 1;
          }
      
          const user = await this.User.create({
            id: nextId,
            name: name,
            email: email,
            encryptedPassword: encryptedPassword,
            salt: salt
          });
          console.log('Created user:', user);
          return user;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      }
}

module.exports = UserService;