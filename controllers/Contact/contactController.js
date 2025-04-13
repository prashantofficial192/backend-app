import Contact from "../../models/Contact/contact.model.js";

// Get all contacts
export async function getAllContacts(req, res) {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });

    }
}

// Get a contact by ID
export async function getContactById(req, res) {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Create a contact
export async function createContact(req, res) {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json({
            message: 'Contact created successfully',
            contactCreated: savedContact,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};

            // Extract field-specific validation errors
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

// Update a contact
export async function updateContactById(req, res) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            message: 'Contact updated successfully',
            contactUpdated: updatedContact,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Delete a contact
export async function deleteContactById(req, res) {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            message: 'Contact deleted successfully',
            contactDeleted: deletedContact,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}