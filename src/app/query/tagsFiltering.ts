import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"


export const tagsFiltering = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const queryObj = { ...query }
    // console.log(queryObj)
    // //exact match
    if(queryObj.tags){
      const dateFilter = modelQuery.find({
       "tags.name" : queryObj.tags
      })
      return dateFilter
    }
 
    return modelQuery
  }