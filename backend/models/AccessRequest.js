const mongoose = require('mongoose');

const accessRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AccessRequest', accessRequestSchema);
