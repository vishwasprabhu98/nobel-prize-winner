export interface NobelWinner {
  id: string;
  knownName?: FamilyName;
  givenName?: FamilyName;
  familyName?: FamilyName;
  fullName?: FamilyName;
  orgName?: OrgName;
  nativeName?: string;
  founded?: Founded;
  fileName: string;
  gender: string;
  birth?: Birth;
  wikipedia: Wikipedia;
  wikidata: Wikidata;
  sameAs: string[];
  links: Link[];
  nobelPrizes: NobelPrize[];
  meta: Meta;
}

export interface Birth {
  date: string;
  place?: Place;
}

export interface Place {
  city: City;
  country: City;
  cityNow: YNow;
  countryNow: YNow;
  continent: City;
  locationString: City;
}

export interface City {
  en: string;
  no: string;
  se: string;
}

export interface YNow {
  en: string;
  no: string;
  se: string;
  sameAs: string[];
  latitude: string;
  longitude: string;
}

export interface Founded {
  date: string;
  place?: Place;
}

export interface OrgName {
  en: string;
  no: string;
  se: string;
  sameAs?: string[] | string;
}

export interface FamilyName {
  en: string;
  se: string;
}

export interface Link {
  rel: string;
  href: string;
  action: string;
  types: string;
  title?: string;
  class?: string[];
}

export interface Meta {
  terms: string;
  license: string;
  disclaimer: string;
}

export interface NobelPrize {
  awardYear: string;
  category: City;
  categoryFullName: City;
  sortOrder: string;
  portion: string;
  dateAwarded: Date;
  prizeStatus: string;
  motivation: FamilyName;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  affiliations?: Affiliation[];
  links: Link[];
}

export interface Affiliation {
  name: City;
  nameNow: Continent;
  city?: City;
  country: City;
  cityNow?: YNow;
  countryNow: YNow;
  continent: Continent;
  locationString: City;
}

export interface Continent {
  en: string;
}

export interface Wikidata {
  id: string;
  url: string;
}

export interface Wikipedia {
  slug: string;
  english: string;
}
