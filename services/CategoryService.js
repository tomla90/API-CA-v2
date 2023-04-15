class CategoryService {
  constructor(db) {
      this.Category = db.Category;
  }

  async getAll() {
      return this.Category.findAll();
  }

  async getOne(id) {
    return this.Category.findOne({ where: { id: id } });
  }

  async create(name) {
    console.log('Creating category with name:', name);
    try {
      const categories = await this.Category.findAll({
        order: [['id', 'ASC']],
      });

      let nextId = 1;
      for (let i = 0; i < categories.length - 1; i++) {
        if (categories[i].id + 1 < categories[i + 1].id) {
          nextId = categories[i].id + 1;
          break;
        }
      }
      if (nextId === 1 && categories.length > 0) {
        nextId = categories[categories.length - 1].id + 1;
      }

     
      const category = await this.Category.create({ id: nextId, name: name });
      console.log('Created category:', category);
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
  async update(id, name) {
      return this.Category.update({ name: name }, { where: { id: id } });
  }

  async delete(id) {
      return this.Category.destroy({ where: { id: id } });
  }
}

module.exports = CategoryService;