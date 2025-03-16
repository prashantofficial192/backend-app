import Experience from "../../models/Experience/Experience.js";

export async function getAllExperience(req, res) {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({
            // Handle server error
            message: 'Server Error',
            error: error.message,
        });
    }
}