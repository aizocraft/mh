const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    profilePicture: {
      type: String,
      default: function() {
        // Generate default avatar based on name
        const nameInitial = this.name ? this.name.charAt(0).toUpperCase() : 'U';
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=random&color=fff&size=128`;
      }
    },
    role: {
      type: String,
      enum: ['admin', 'farmer', 'expert'],
      default: 'farmer',
    },
    bio: {
      type: String,
      maxlength: 500,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  { timestamps: true }
);

// Virtual for full address
userSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  if (!addr) return '';
  return [addr.street, addr.city, addr.state, addr.country, addr.zipCode]
    .filter(Boolean).join(', ');
});

module.exports = mongoose.model('User', userSchema);