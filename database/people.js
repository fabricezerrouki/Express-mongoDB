const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const peopleSchema = new Schema({
    Xid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    apps: { type: Array },
    serviceId: { type: String },
    service: { type: Schema.Types.ObjectId, ref: 'service' }
},{ versionKey: false })

module.exports = mongoose.model('people', peopleSchema);
