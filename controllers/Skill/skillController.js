import Skill from "../../models/Skill/skill.model.js"
import cloudinary from "../../config/cloudinaryConfig.js";
import streamifier from "streamifier";

// Get all skills
export async function getAllSkills(req, res) {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

export async function createSkill(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: 'Skill image is required'
            });
        }

        // Upload image to Cloudinary
        const skillImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'skills'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        });

        // Create and save skill
        const newSkill = new Skill({
            ...req.body,
            image: skillImage.secure_url
        });

        const savedSkill = await newSkill.save();

        res.status(201).json({
            message: "Skill created successfully",
            skillCreated: savedSkill
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            message: 'Error creating skill',
            error: error.message
        });
    }
}

// Get skill by ID
export async function getSkillById(req, res) {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: 'Skill not found',
            });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Update skill by ID
export async function updateSkillById(req, res) {
    try {
        const file = req.file
        let skillImageUrl;

        if (file && file.image) {
            const skillImageUpload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'skills'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
            skillImageUrl = skillImageUpload.secure_url
        }

        const updateSkillData = { ...req.body }
        if (skillImageUrl) updateSkillData.image = skillImageUrl

        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, updateSkillData, { new: true });

        if (!updatedSkill) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            message: 'Skill updated successfully',
            skillUpdated: updatedSkill,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Delete skill by ID
export async function deleteSkillById(req, res) {
    try {
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

        if (!deletedSkill) {
            return res.status(404).json({
                message: 'Skill not found',
            });
        }

        res.status(200).json({
            message: 'Skill deleted successfully',
            skillDeleted: deletedSkill,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}