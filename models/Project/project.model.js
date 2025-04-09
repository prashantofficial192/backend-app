import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            minLength: [40, 'Project title must be at least 40 characters'],
        },
        image: {
            type: String,
            required: [true, 'Project image is required'],
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
        },
        startDate: {
            type: String,
            required: [true, 'Project start date is required'],
        },
        endDate: {
            type: String,
            required: [true, 'Project end date is required'],
        },
        technologyUsed: {
            type: [String],
            required: [true, 'Technology used is required'],
        },
        categories: {
            type: [String],
            required: [true, 'Project categories are required'],
        },
        sourceCodeLink: {
            type: String,
            required: [true, 'Source code link is required'],
        },
        liveLink: {
            type: String,
            required: [true, 'Live link is required'],
        },
        slug: {
            type: String,
            unique: true,
        }
    },
    { timestamps: true }
)

// Create a slug before saving the project
projectSchema.pre('save', function (next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
})

const Project = mongoose.model('Project', projectSchema);

export default Project;