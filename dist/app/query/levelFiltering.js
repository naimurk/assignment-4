"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelFilter = void 0;
const levelFilter = (modelQuery, query) => {
    const queryObj = Object.assign({}, query);
    // console.log(queryObj)
    // //exact match
    if (queryObj.level) {
        const levelFilter = modelQuery.find({
            "details.level": queryObj.level
        });
        return levelFilter;
    }
    return modelQuery;
};
exports.levelFilter = levelFilter;
