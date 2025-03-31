export interface NobelPrizeList {
  nobelPrizes: NobelPrize[];
  meta:        Meta;
  links:       Links;
}

export interface Links {
  first: string;
  self:  string;
  next:  string;
  last:  string;
}

export interface Meta {
  offset:     number;
  limit:      number;
  count:      number;
  terms:      string;
  license:    string;
  disclaimer: string;
}

export interface NobelPrize {
  awardYear:           string;
  category:            Category;
  categoryFullName:    Category;
  dateAwarded:         Date;
  prizeAmount:         number;
  prizeAmountAdjusted: number;
  links:               Link[];
  laureates:           Laureate[];
}

export interface Category {
  en:  string;
  no?: string;
  se?: string;
}

export interface Laureate {
  id:          string;
  knownName?:  Name;
  fullName?:   Name;
  portion:     string;
  sortOrder:   string;
  motivation:  Category;
  links:       Link[];
  orgName?:    OrgName;
  nativeName?: string;
}

export interface Name {
  en: string;
}

export interface Link {
  rel:    Rel;
  href:   string;
  action: Action;
  types:  Types;
}

export enum Action {
  Get = "GET",
}

export enum Rel {
  Laureate = "laureate",
  NobelPrize = "nobelPrize",
}

export enum Types {
  ApplicationJSON = "application/json",
}

export interface OrgName {
  en: string;
  no: string;
}
