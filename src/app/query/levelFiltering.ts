import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"


export const levelFilter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const queryObj = { ...query }
    // console.log(queryObj)
    // //exact match
    if(queryObj.level){
      const levelFilter = modelQuery.find({
        "details.level": queryObj.level
      })
      return levelFilter
    }
 
    return modelQuery
  }