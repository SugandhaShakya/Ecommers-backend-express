const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        require:[true, 'Please add a name']
    },
    email: {
        type: String,
        require:[true, 'Please add an email'],
        unique: true
    },
    passwordHash: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    street: {
        type: String,
        default:'',
    },
    apartment: {
        type: String,
        default:'',
    },
    city: {
        type: String,
        default:'',
    },
    country: {
        type: String,
        default:'',
    }
},{
    timestamps:true
});


// userSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// });

// userSchema.set('toJSON',{
//     virtuals: true,
// });

module.exports = mongoose.model('User', userSchema);

