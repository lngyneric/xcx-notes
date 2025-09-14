// 示例JavaScript代码文件
// 这是一个简单的待办事项管理器

class TodoManager {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  // 添加新的待办事项
  addTodo(title, description = '') {
    const todo = {
      id: this.nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    return todo;
  }

  // 获取所有待办事项
  getAllTodos() {
    return this.todos;
  }

  // 根据ID获取待办事项
  getTodoById(id) {
    return this.todos.find(todo => todo.id === id);
  }

  // 更新待办事项
  updateTodo(id, updates) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    Object.assign(todo, updates, {
      updatedAt: new Date().toISOString()
    });

    return todo;
  }

  // 标记待办事项为完成
  completeTodo(id) {
    return this.updateTodo(id, { completed: true });
  }

  // 删除待办事项
  deleteTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    return this.todos.splice(index, 1)[0];
  }

  // 获取已完成的待办事项
  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  // 获取未完成的待办事项
  getPendingTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  // 清空所有已完成的待办事项
  clearCompleted() {
    const completed = this.getCompletedTodos();
    this.todos = this.getPendingTodos();
    return completed;
  }

  // 获取统计信息
  getStats() {
    const total = this.todos.length;
    const completed = this.getCompletedTodos().length;
    const pending = this.getPendingTodos().length;

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? (completed / total * 100).toFixed(2) + '%' : '0%'
    };
  }
}

// 使用示例
if (require.main === module) {
  const todoManager = new TodoManager();

  // 添加一些示例待办事项
  todoManager.addTodo('学习JavaScript', '深入学习ES6+新特性');
  todoManager.addTodo('完成项目', '完成GitHub同步功能开发');
  todoManager.addTodo('写文档', '为项目编写详细的使用文档');

  // 标记第一个为完成
  todoManager.completeTodo(1);

  // 显示统计信息
  console.log('待办事项统计:', todoManager.getStats());
  console.log('所有待办事项:', todoManager.getAllTodos());
}

module.exports = TodoManager;