import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required"]
        },
        companyWebsite: {
            type: String,
            required: false,
            match: [/^https?:\/\/.+\..+/, 'Invalid URL'],
        },
        location: {
            type: String,
            required: [true, "Location is required"]
        },
        jobRole: {
            type: String,
            required: [true, "Job role is required"]
        },
        startDate: {
            type: String,
            required: [true, "Start date is required"]
        },
        endDate: {
            type: String,
            required: [true, "End date is required"]
        },
        isPresent: {
            type: Boolean,
            required: false,
            default: false
        },
        employmentType: {
            type: String,
            required: [true, "Employment type is required"]
        },
        jobDescription: {
            type: String,
            required: [true, "Job description is required"]
        }
    },
    { timestamps: true }
)

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;