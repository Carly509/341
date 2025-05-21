const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const result = await mongodb.getDb().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contacts', error: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('contacts').find({ _id: contactId }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contact', error: err });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };

        const result = await mongodb.getDb().collection('contacts').insertOne(contact);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Contact created successfully', userId: result.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating contact', error: err });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };

        const result = await mongodb.getDb().collection('contacts').updateOne({ _id: contactId }, { $set: user });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact', error: err });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact', error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
