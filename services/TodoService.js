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

    async create(name, categoryId, userId) {
        return this.Todo.create({ name: name, CategoryId: categoryId, UserId: userId });
    }

    async update(id, name, userId) {
        return this.Todo.update({ name: name }, { where: { id: id, UserId: userId } });
    }
    async delete(id, userId) {
        return this.Todo.destroy({ where: { id: id, UserId: userId } });
    }
}

module.exports = TodoService;