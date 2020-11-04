const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(16, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.get("password"), salt, (err, hash) => {
            if (err) return next(err);
            this.set("password", hash);
            next();
        });
    });
});

module.exports = mongoose.model("Users", userSchema);
