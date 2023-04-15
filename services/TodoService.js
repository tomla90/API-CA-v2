class TodoService {
    constructor(db) {
        this.db = db;
        this.Todo = db.Todo;
    }

    async getAll(userId) {
        return await this.Todo.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: this.db.Category,
                    attributes: ['id', 'name'],
                },
            ],
        });
    }

    async getOne(id, userId) {
        return this.Todo.findOne({
          where: { id: id, UserId: userId },
          include: [
            {
              model: this.db.Category,
              attributes: ['id', 'name'],
            },
          ],
        });
      }

    async create(name, CategoryId, UserId) {
        console.log('Creating todo with name:', name, 'CategoryId:', CategoryId, 'and UserId:', UserId);
        try {
        
          const todos = await this.Todo.findAll({
            order: [['id', 'ASC']],
          });
    
          let nextId = 1;
          for (let i = 0; i < todos.length - 1; i++) {
            if (todos[i].id + 1 < todos[i + 1].id) {
              nextId = todos[i].id + 1;
              break;
            }
          }
          if (nextId === 1 && todos.length > 0) {
            nextId = todos[todos.length - 1].id + 1;
          }
    
         
          const todo = await this.Todo.create({ id: nextId, name: name, CategoryId: CategoryId, UserId: UserId });
          console.log('Created todo:', todo);
          return todo;
        } catch (error) {
          console.error('Error creating todo:', error);
          throw error;
        }
      }

    async update(id, name) {
        return this.Todo.update({ name: name }, { where: { id: id} });
    }
    async delete(id, userId) {
        return this.Todo.destroy({ where: { id: id, UserId: userId } });
    }
}

module.exports = TodoService;