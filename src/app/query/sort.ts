import { Query } from "mongoose";
import { TQueryObj } from "../interface/query";

export const sort = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (
    (query.sortBy === "title" ||
      query.sortBy === "price" ||
      query.sortBy === "startDate" ||
      query.sortBy === "endDate" ||
      query.sortBy === "language" ||
      query.sortBy === "durationInWeeks") &&
    query.sortOrder
  ) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    const sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
    modelQuery.sort(sortStr);
  }

  return modelQuery;
};
