const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for security
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

// Remove sensitive data before sending the user object
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password; // Remove the password field
    delete ret.__v; // Remove the version key
    delete ret.resetToken; // Remove resetToken
    delete ret.resetTokenExpires; // Remove resetTokenExpires
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
