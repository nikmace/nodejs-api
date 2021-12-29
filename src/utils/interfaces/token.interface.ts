import { Schema } from 'mongoose';

export default interface Token extends Schema {
    id: Schema.Types.ObjectId;
    expiresIn: number;
}
