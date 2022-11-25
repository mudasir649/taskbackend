import express from "express"
import { successResponse, failedResponse } from "../utils/response.js";
import { Vehicle } from "../models/VehicleSchema.js";
import mongoose from "mongoose";

// method to get all records of vehicle
const getMethod = (async (req, res) => {
    try {
        const vehicle = await Vehicle.find().limit(10).sort({ createdAt: -1 });
        return successResponse(
            res,
            "All data is retrieved.",
            true,
            vehicle
        )
    } catch (error) {
        return failedResponse(
            res,
            "failed to retrieved data.",
            false
        )
    }
});


// method for pagination
const getPaginate = async (req, res) => {
    const { page } = req.query;
    const pages = page - 1
    try {
        const vehicle = await Vehicle.find().skip(pages * 10).limit(10);
        const countVehicle = await Vehicle.countDocuments();
        return res.status(200).json({ data: vehicle, count: countVehicle });
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}


// method to find record by Id for edit form
const getById = (async (req, res) => {
    const id = req.params.id
    try {
        const vehicle = await Vehicle.findById({_id: mongoose.Types.ObjectId(id)});
        return successResponse(
            res,
            "All data is retrieved.",
            true,
            vehicle
        )
    } catch (error) {
        return failedResponse(
            res,
            "failed to retrieved data.",
            false
        )
    }
});


// psot method to post data
const postMethod = (async (req, res) => {
    const data = req.body;
    try {
        const vehicle = await Vehicle.create(data)
        return successResponse(
            res,
            "Vehicle record is inserted successfully.",
            true,
            vehicle
        )
    } catch (error) {
        return failedResponse(
            res,
            "failed to insert vehicle record.",
            false
        )
    }
});

// update method
const updateMethod = (async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try {
        const vehicle = await Vehicle.updateOne({_id: mongoose.Types.ObjectId(id)}, {data})
        return successResponse(
            res,
            "Vehicle record is updated successfully.",
            true,
            vehicle
        )
    } catch (error) {
        return failedResponse(
            res,
            "failed to update vehicle record.",
            false
        )
    }
});

// delete method
const deleteMethod = (async (req, res) => {
    const id = req.params.id;
    try {
        const vehicle = await Vehicle.findByIdAndDelete({_id: mongoose.Types.ObjectId(id)})
        return successResponse(
            res,
            "Vehicle record is inserted successfully.",
            true,
            vehicle
        )
    } catch (error) {
        return failedResponse(
            res,
            "failed to insert vehicle record.",
            false
        )
    }
});


export {
    getById,
    getPaginate,
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod
};