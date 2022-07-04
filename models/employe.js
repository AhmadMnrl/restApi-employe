var mongoose = require('mongoose');
var Name = 'employe';

var Schema = new mongoose.Schema({

    nama: { type: String, required: true, trim: true },
    jabatan: { type: String, required: true, trim: true },

    isDeleted: { type: Boolean, default: false },

}, { collection: Name, versionKey: false });

mongoose.model(Name, Schema);

module.exports = mongoose.model(Name);