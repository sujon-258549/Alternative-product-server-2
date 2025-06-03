"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose Schema
const contactSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author selection is required'],
        ref: 'User', // Assuming this references a User model
    },
    sendId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author selection is required'],
        ref: 'User', // Assuming this references a User model
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [1, 'Message must be at least 10 characters'],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
});
// Create and export the Model
const Contact = (0, mongoose_1.model)('Contact', contactSchema);
exports.default = Contact;
