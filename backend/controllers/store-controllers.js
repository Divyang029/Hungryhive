const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Store = require('../models/store');

const getAllStore = async (req,res,next) => {
    let stores;
        try {
            stores = await Store.find({});
        } catch (err) {
            const error = new HttpError(
            'Fetching store failed, please try again later.',
            500
        );
        return next(error);
    }
        res.json({stores: stores.map(store => store.toObject({ getters: true }))});
}

const getStoreById = async (req,res,next) => {
    const storeid = req.params.storeid;
    let store;
    try {
        store = await Store.findById(storeid);
    } catch (err) {
        const error = new HttpError(
            'Fetching store failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({store: store.toObject()});
}

const addNewStore = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { userId, store_name, description, store_address, menu} = req.body;

    const createdStore = new Store({
        user: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
        store_name: store_name,
        description: description,
        store_address: {
            house_no: store_address.house_no,
            street: store_address.street,
            area: store_address.area,
            pincode: store_address.pincode,
            city: store_address.city,
            state: store_address.state,
            country: store_address.country
        },
        menu: menu.map(item => ({
            item_photo: item.item_photo,
            item_name: item.item_name,
            item_price: item.item_price,
            item_quantity: item.item_quantity,
            item_description: item.item_description,
            item_type: item.item_type,
            item_category: item.item_category
        }))
    });

    try {
        await createdStore.save();
    } catch (err) {
        const error = new HttpError('Creating store failed, please try again later.', 500);
        return next(error);
    }
    res.status(201).json({ store: createdStore.toObject({ getters: true }) });
}

const updateStoreById = async (req,res,next) => {
    const storeid = req.params.storeid;
    const {
        store_name,
        description,
        store_address,
        menu
    } = req.body;

    let updatedStore;
    try {
        updatedStore = await Store.findByIdAndUpdate(
            storeid,
            {
                store_name: store_name,
                description: description,
                store_address: {
                    house_no: store_address.house_no,
                    street: store_address.street,
                    area: store_address.area,
                    pincode: store_address.pincode,
                    city: store_address.city,
                    state: store_address.state,
                    country: store_address.country
                },
                menu: menu.map(item => ({
                    item_photo: item.item_photo,
                    item_name: item.item_name,
                    item_price: item.item_price,
                    item_quantity: item.item_quantity,
                    item_description: item.item_description,
                    item_type: item.item_type,
                    item_category: item.item_category
                }))
            },
            { new: true, runValidators: true }
        );
    } catch (err) {
        const error = new HttpError('Updating store failed, please try again later.', 500);
        return next(error);
    }

    if (!updatedStore) {
        const error = new HttpError('Could not find a store for the provided ID.', 404);
        return next(error);
    }
    res.status(200).json({ store: updatedStore.toObject({ getters: true }) });
}

const deleteStoreById = async(req,res,next) => {
    const storeid = req.params.storeid;
    let store;
    try {
        store = await Store.findByIdAndDelete(cartid);
    } catch (err) {
        const error = new HttpError(
            'Deleting  Store failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({message: "deleting done"});
}

exports.getAllStore = getAllStore;
exports.getStoreById = getStoreById;
exports.addNewStore = addNewStore;
exports.updateStoreById = updateStoreById;
exports.deleteStoreById = deleteStoreById;