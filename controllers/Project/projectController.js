import Project from "../../models/Project/project.model.js";
import cloudinary from "../../config/cloudinaryConfig.js";
import streamifier from "streamifier";

// Get all projects
export async function getAllProjects(req, res) {
    try {
        const Projects = await Project.find();
        res.status(200).json(Projects);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Get a project by ID
export async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Create project
export async function createProject(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: 'Project image is required.'
            });
        }

        // Upload Image to Cloudinary
        const projectImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'projects',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        })

        const newProject = new Project({
            ...req.body,
            image: projectImage.secure_url
        })

        const savedProject = await newProject.save();

        res.status(201).json({
            message: "Project created successfully",
            projectCreated: savedProject
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
            message: 'Error while creating project',
            error: error.message
        });
    }
}

// Update project by ID
export async function updateProjectById(req, res) {
    try {
        const file = req.file
        let projectImageUrl;

        if (file) {
            // Upload new project image
            const projectImageUpload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'projects',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
            projectImageUrl = projectImageUpload.secure_url;
        }

        const updateProjectData = { ...req.body };
        if (projectImageUrl) {
            updateProjectData.image = projectImageUrl;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateProjectData,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.status(200).json({
            message: 'Project updated successfully',
            projectUpdated: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// Delete project by ID
export async function deleteProjectById(req, res) {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.status(200).json({
            message: 'Project deleted successfully',
            projectDeleted: project
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}