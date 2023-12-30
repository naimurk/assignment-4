"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const filter = (modelQuery, query) => {
    const queryObj = Object.assign({}, query);
    //exact match
    const excludedFields = [
        'page',
        'searchTerm',
        'limit',
        'sortBy',
        'sortOrder',
        'fields',
        "minPrice",
        "maxPrice",
        "startDate",
        "endDate",
        "level",
        "tags"
    ];
    excludedFields.forEach((keyword) => delete queryObj[keyword]);
    modelQuery = modelQuery.find(queryObj);
    return modelQuery;
};
exports.filter = filter;
