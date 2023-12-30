import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"


export const PriceFilter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const queryObj = { ...query }
    // //exact match
    if(queryObj.maxPrice && query.minPrice){
      const priceFilter = modelQuery.find({
        "price": { $gte: query.minPrice,$lte: query.maxPrice },
      })
      return priceFilter
    }
    else if(queryObj.maxPrice){
      const priceFilter = modelQuery.find({
        "price": { $lte: query.maxPrice },
      })
      return priceFilter
    }

    else if(queryObj.minPrice){
      const priceFilter = modelQuery.find({
        "price": { $gte: query.minPrice },
      })
      return priceFilter
    }
    return modelQuery
  }