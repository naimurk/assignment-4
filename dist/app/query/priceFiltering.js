"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceFilter = void 0;
const PriceFilter = (modelQuery, query) => {
    const queryObj = Object.assign({}, query);
    // //exact match
    if (queryObj.maxPrice && query.minPrice) {
        const priceFilter = modelQuery.find({
            "price": { $gte: query.minPrice, $lte: query.maxPrice },
        });
        return priceFilter;
    }
    else if (queryObj.maxPrice) {
        const priceFilter = modelQuery.find({
            "price": { $lte: query.maxPrice },
        });
        return priceFilter;
    }
    else if (queryObj.minPrice) {
        const priceFilter = modelQuery.find({
            "price": { $gte: query.minPrice },
        });
        return priceFilter;
    }
    return modelQuery;
};
exports.PriceFilter = PriceFilter;
