import { Query } from "mongoose"
import { TQueryObj } from "../interface/query"
import { filter } from "./filter"
import { PriceFilter } from "./priceFiltering"
import { dateFilter } from "./dateFiltering"
import { levelFilter } from "./levelFiltering"
import { tagsFiltering } from "./tagsFiltering"
import { sort } from "./sort"
import { paginate } from "./paginate"

export const getQuery =  <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const filteredQuery = filter(modelQuery, query)
    const priceQuery = PriceFilter(filteredQuery, query)
    const dateQuery = dateFilter(priceQuery, query)
    const levelQuery = levelFilter(dateQuery, query)
    const tagsQuery = tagsFiltering(levelQuery, query)
    const sortQuery = sort(tagsQuery, query)
    const paginateQuery = paginate(sortQuery, query)
    return paginateQuery
  }