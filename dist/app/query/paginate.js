"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (modelQuery, query) => {
    if (query.page || query.limit) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        modelQuery.skip(skip).limit(limit);
    }
    else {
        modelQuery.skip(0).limit(10);
    }
    return modelQuery;
};
exports.paginate = paginate;
