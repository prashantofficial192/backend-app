import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minLength: [2, "Name must be at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        messageBody: {
            type: String,
            required: [true, "Message is required"],
        },
        messageStatus: {
            type: String,
            enum: ["Unread", "Read", "Replied"],
            default: "Unread",
        }
    },
    { timestamps: true }
)

const Contact = mongoose.model("Contact", contactSchema)

export default Contact