import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"


export const dateFilter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const queryObj = { ...query }
    // console.log(queryObj)
    // //exact match
    if(queryObj.startDate && queryObj.endDate){
      const dateFilter = modelQuery.find({
        // "price": { $gte: query.minPrice,$lte: query.maxPrice },
        startDate: {$lte: new Date(queryObj.startDate)},
        endDate: {$lte: new Date(queryObj.endDate)},
      })
      return dateFilter
    }
    else if(queryObj.startDate){
      const dateFilter = modelQuery.find({
        startDate: queryObj.startDate,
      })
      return dateFilter
    }

    else if(queryObj.endDate){
      const dateFilter = modelQuery.find({
        endDate:queryObj.endDate
      })
      return dateFilter
    }
    return modelQuery
  }