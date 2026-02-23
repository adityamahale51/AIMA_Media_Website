const fs = require('fs');
const path = require('path');

class JsonDB {
  constructor(filename) {
    this.filepath = path.join(__dirname, '..', 'data', filename);
    this.ensureFile();
  }

  ensureFile() {
    const dir = path.dirname(this.filepath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.filepath)) fs.writeFileSync(this.filepath, '[]', 'utf-8');
  }

  read() {
    try {
      const content = fs.readFileSync(this.filepath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2), 'utf-8');
  }

  findAll() {
    return this.read();
  }

  findById(id) {
    return this.read().find(item => item.id === id || item.id === String(id));
  }

  findOne(query) {
    const data = this.read();
    return data.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  find(query) {
    const data = this.read();
    return data.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  create(item) {
    const data = this.read();
    if (!item.id) item.id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    if (!item.createdAt) item.createdAt = new Date().toISOString();
    data.push(item);
    this.write(data);
    return item;
  }

  update(id, updates) {
    const data = this.read();
    const index = data.findIndex(item => item.id === id || item.id === String(id));
    if (index === -1) return null;
    data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
    this.write(data);
    return data[index];
  }

  delete(id) {
    const data = this.read();
    const filtered = data.filter(item => item.id !== id && item.id !== String(id));
    this.write(filtered);
    return filtered.length < data.length;
  }
}

module.exports = JsonDB;
