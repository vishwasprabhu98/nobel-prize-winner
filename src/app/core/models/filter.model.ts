export interface NobelPrizeListFilter {
  nobelPrizeYear: number | null
  yearTo: number | null
  nobelPrizeCategory: string | null
}
export interface NobelPrizeListFilterPayload extends NobelPrizeListFilter {
  offset: number
  limit: number
}