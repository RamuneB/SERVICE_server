const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Vartotojo schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pridedame metodą slaptažodžio patikrinimui
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sukuriame ir eksportuojame User modelį
const User = mongoose.model('User', userSchema);
module.exports = User;
