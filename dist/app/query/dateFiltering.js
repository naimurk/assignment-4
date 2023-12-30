"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFilter = void 0;
const dateFilter = (modelQuery, query) => {
    const queryObj = Object.assign({}, query);
    // console.log(queryObj)
    // //exact match
    if (queryObj.startDate && queryObj.endDate) {
        const dateFilter = modelQuery.find({
            // "price": { $gte: query.minPrice,$lte: query.maxPrice },
            startDate: { $lte: new Date(queryObj.startDate) },
            endDate: { $lte: new Date(queryObj.endDate) },
        });
        return dateFilter;
    }
    else if (queryObj.startDate) {
        const dateFilter = modelQuery.find({
            startDate: queryObj.startDate,
        });
        return dateFilter;
    }
    else if (queryObj.endDate) {
        const dateFilter = modelQuery.find({
            endDate: queryObj.endDate
        });
        return dateFilter;
    }
    return modelQuery;
};
exports.dateFilter = dateFilter;
