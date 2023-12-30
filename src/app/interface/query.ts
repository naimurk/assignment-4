export type TQueryObj = {
    [key: string]: unknown
    page?: string
    limit?: string
    // searchTerm?: string
    // fields?: string
    sortBy?: string
    sortOrder?: string,
    minPrice?:string,
    maxPrice?:string,
    startDate?: string,
    endDate?: string,
    provider?: string,
    durationInWeeks?: string,
    level?: string
    tags?:string
  }