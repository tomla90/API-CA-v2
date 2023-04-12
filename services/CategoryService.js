class CategoryService {
    constructor(db) {
        this.Category = db.Category;
    }

    async getAll(userId) {
        return this.Category.findAll({ where: { UserId: userId } });
    }

    async create(name, userId) {
        console.log('Creating category with name:', name, 'and UserId:', userId);
        try {
          const category = await this.Category.create({ name: name, UserId: userId });
          console.log('Created category:', category);
          return category;
        } catch (error) {
          console.error('Error creating category:', error);
          throw error;
        }
      }
    async update(id, name, userId) {
        return this.Category.update({ name: name }, { where: { id: id, UserId: userId } });
    }

    async delete(id, userId) {
        return this.Category.destroy({ where: { id: id, UserId: userId } });
    }
}

module.exports = CategoryService;