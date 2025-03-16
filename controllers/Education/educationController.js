import Education from "../../models/Education/education.model.js";

// Get all education
export async function getAllEducation(req, res) {
    try {
        const education = await Education.find();
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Create a new education
export async function createEducation(req, res) {
    try {
        const newEducation = new Education(req.body);
        const savedEducation = await newEducation.save();

        res.status(201).json({
            message: 'Education created successfully',
            educationCreated: savedEducation,
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

        res.status(400).json({
            message: 'Error creating experience',
            error: error.message
        });
    }
}

// Get education by ID
export async function getEducationById(req, res) {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                message: 'Education not found',
            });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({
            // Handle server error
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Update education by ID
export async function updateEducation(req, res) {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEducation) {
            return res.status(404).json({
                message: 'Education not found',
            });
        }

        res.status(200).json({
            message: 'Education updated successfully',
            educationUpdated: updatedEducation,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating education',
            error: error.message,
        });
    }
}

// Delete education by ID
export async function deleteEducation(req, res) {
    try {
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);

        if (!deletedEducation) {
            return res.status(404).json({
                message: 'Education not found',
            });
        }

        res.status(200).json({
            message: 'Education deleted successfully',
            educationDeleted: deletedEducation,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting education',
            error: error.message,
        });
    }
}