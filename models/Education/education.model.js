import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
    {
        instituteName: {
            type: String,
            required: [true, "Institute name is required"]
        },
        fieldOfStudy: {
            type: String,
            required: [true, "Field of study is required"]
        },
        location: {
            type: String,
            required: [true, "Location is required"]
        },
        startDate: {
            type: String,
            required: [true, "Start date is required"]
        },
        endDate: {
            type: String,
            required: [true, "End date is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        instituteLink: {
            type: String,
            required: false,
            match: [/^https?:\/\/.+\..+/, 'Invalid URL'],
        },
        isCurrentlyEntolled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    { timestamps: true }
)

const Education = mongoose.model("Education", educationSchema);

export default Education;