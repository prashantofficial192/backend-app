import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Skill name is required"]
        },
        image: {
            type: String,
            required: [true, "Skill image is required"],
        },
        proficiency: {
            type: String,
            required: [true, "Skill proficiency is required"],
        },
        category: {
            type: String,
            required: [true, "Skill category is required"],
            enum: {
                values: ["Developer Tools", "Programming Skills", "Other"],
            }
        },
        experience: {
            type: String,
        }
    },
    { timestamps: true }
)

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;