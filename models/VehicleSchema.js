// vehicle schema for adding vehicle record
import mongoose, { Schema } from "mongoose";

const VehicleSchema = new Schema({
    type: String,
    color: String,
    model: String,
    make: String,
    registration_no: Number
}, { timestamps: true });

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);