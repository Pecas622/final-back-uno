import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collections = 'users';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Aplica el plugin de paginación al esquema
userSchema.plugin(mongoosePaginate);

export const modelUser = model('users', userSchema);