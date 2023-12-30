"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const sort = (modelQuery, query) => {
    if ((query.sortBy === "title" ||
        query.sortBy === "price" ||
        query.sortBy === "startDate" ||
        query.sortBy === "endDate" ||
        query.sortBy === "language" ||
        query.sortBy === "durationInWeeks") &&
        query.sortOrder) {
        const sortBy = query.sortBy;
        const sortOrder = query.sortOrder;
        const sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
        modelQuery.sort(sortStr);
    }
    return modelQuery;
};
exports.sort = sort;
