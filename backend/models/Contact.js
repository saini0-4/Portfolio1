const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/contacts.json');
const DATA_DIR = path.dirname(DATA_FILE);

class Contact {
  constructor({ id, name, email, message, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.createdAt = createdAt || new Date();
  }

  // Ensure data directory exists
  static async ensureDataDir() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
      // Directory might already exist, that's fine
    }
  }

  // Read all contacts from file
  static async getAll() {
    try {
      await this.ensureDataDir();
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist yet, return empty array
        return [];
      }
      throw error;
    }
  }

  // Save a new contact
  static async create(contactData) {
    await this.ensureDataDir();
    const contacts = await this.getAll();
    
    const newContact = {
      id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
      ...contactData,
      createdAt: contactData.createdAt || new Date().toISOString()
    };

    contacts.push(newContact);
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8');
    
    return new Contact(newContact);
  }

  // Get contact by ID
  static async getById(id) {
    const contacts = await this.getAll();
    return contacts.find(c => c.id === id);
  }
}

module.exports = Contact;
