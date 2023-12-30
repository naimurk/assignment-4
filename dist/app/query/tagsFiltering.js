"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsFiltering = void 0;
const tagsFiltering = (modelQuery, query) => {
    const queryObj = Object.assign({}, query);
    // console.log(queryObj)
    // //exact match
    if (queryObj.tags) {
        const dateFilter = modelQuery.find({
            "tags.name": queryObj.tags
        });
        return dateFilter;
    }
    return modelQuery;
};
exports.tagsFiltering = tagsFiltering;
