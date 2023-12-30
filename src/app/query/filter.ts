import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"


export const filter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const queryObj = { ...query }
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

    ]
    excludedFields.forEach((keyword) => delete queryObj[keyword])
    modelQuery = modelQuery.find(queryObj)

    return modelQuery
  }