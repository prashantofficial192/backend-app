import Experience from "../../models/Experience/Experience.js";

export async function getAllExperience(req, res) {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error', // Handle server error
            error: error.message,
        });
    }
}


// create experience
export async function createExperience(req, res) {
    try {
        // Create a new experience with the request body data
        const newExperience = new Experience(req.body);

        // Save the new experience to the database
        const savedExperience = await newExperience.save();

        res.status(201).json({
            message: 'Experience created successfully',
            experienceCreated: savedExperience,
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

// Get an experience by ID
export async function getExperienceById(req, res) {
    try {
        const experience = await Experience.findById(req.params.id); // Find an experience by its ID from the request parameters

        if (!experience) {
            return res.status(404).json({
                // If experience not found, return a 404 response
                message: 'Experience not found',
            });
        }
        res.status(200).json(experience); // Return the found experience as a JSON response
    } catch (error) {
        res.status(500).json({
            // Handle server error
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Update an experience by ID
export async function updateExperience(req, res) {
    try {
        const updateExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Update the experience with the request body data and return the updated record
        );

        if (!updateExperience) {
            return res.status(404).json({
                // If experience not found, return a 404 response
                message: 'Experience not found',
            });
        }

        res.status(200).json({
            // Return the updated experience as a JSON response
            message: 'Experience updated successfully',
            experienceUpdated: updateExperience,
        });
    } catch (error) {
        res.status(400).json({
            // Handle any error during experience update
            message: 'Error updating experience',
            error: error.message,
        });
    }
}

// Delete an experience by ID
export async function deleteExperience(req, res) {
    try {
        const deleteExperience = await Experience.findByIdAndDelete(req.params.id); // Find and delete an experience by its ID

        if (!deleteExperience) {
            return res.status(404).json({
                // If experience not found, return a 404 response
                message: 'Experience not found',
            });
        }

        res.status(200).json({
            // Return the deleted experience as a JSON response
            message: 'Experience deleted successfully',
            experienceDeleted: deleteExperience,
        });
    } catch (error) {
        res.status(500).json({
            // Handle server error
            message: 'Server Error',
            error: error.message,
        });
    }
}