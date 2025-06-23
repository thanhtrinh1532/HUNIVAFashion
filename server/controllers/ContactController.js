const { Contact } = require('../models/Contact'); // Import từ models/Contact.js

const ContactController = {
  // Lấy tất cả liên hệ
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching contacts', details: error.message });
    }
  },

  // Lấy liên hệ theo ID
  getContactById: async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching contact', details: error.message });
    }
  },

  // Tạo liên hệ mới
  createContact: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }
      const newContact = await Contact.create({ name, email, message }); // Sử dụng object cho create
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: 'Error creating contact', details: error.message });
    }
  },

  // Cập nhật liên hệ
  updateContact: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      await contact.update({ name, email, message });
      res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating contact', details: error.message });
    }
  },

  // Xóa liên hệ
  deleteContact: async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      await contact.destroy();
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting contact', details: error.message });
    }
  },
};

module.exports = ContactController;