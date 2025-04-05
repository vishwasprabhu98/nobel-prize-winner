// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const winnerMockData: any = {
  meta: {
    offset: 0,
    limit: 15,
    count: 100,
    terms: '',
    license: '',
    disclaimer: '',
  },
  nobelPrizes: [
  {
    awardYear: '2024',
    category: {
      en: 'Chemistry',
      no: 'Kjemi',
      se: 'Kemi',
    },
    categoryFullName: {
      en: 'The Nobel Prize in Chemistry',
      no: 'Nobelprisen i kjemi',
      se: 'Nobelpriset i kemi',
    },
    dateAwarded: '2024-10-09',
    prizeAmount: 11000000,
    prizeAmountAdjusted: 11000000,
    links: [
      {
        rel: 'nobelPrize',
        href: 'https://api.nobelprize.org/2/nobelPrize/che/2024',
        action: 'GET',
        types: 'application/json',
      },
    ],
    laureates: [
      {
        id: '1039',
        knownName: {
          en: 'David Baker',
        },
        fullName: {
          en: 'David Baker',
        },
        portion: '1/2',
        sortOrder: '1',
        motivation: {
          en: 'for computational protein design',
          se: 'för datorbaserad proteindesign',
        },
        links: [
          {
            rel: 'laureate',
            href: 'https://api.nobelprize.org/2/laureate/1039',
            action: 'GET',
            types: 'application/json',
          },
        ],
      },
      {
        id: '1040',
        knownName: {
          en: 'Demis Hassabis',
        },
        fullName: {
          en: 'Demis Hassabis',
        },
        portion: '1/4',
        sortOrder: '2',
        motivation: {
          en: 'for protein structure prediction',
          se: 'för proteinstrukturprediktion',
        },
        links: [
          {
            rel: 'laureate',
            href: 'https://api.nobelprize.org/2/laureate/1040',
            action: 'GET',
            types: 'application/json',
          },
        ],
      },
      {
        id: '1041',
        knownName: {
          en: 'John Jumper',
        },
        fullName: {
          en: 'John Jumper',
        },
        portion: '1/4',
        sortOrder: '3',
        motivation: {
          en: 'for protein structure prediction',
          se: 'för proteinstrukturprediktion',
        },
        links: [
          {
            rel: 'laureate',
            href: 'https://api.nobelprize.org/2/laureate/1041',
            action: 'GET',
            types: 'application/json',
          },
        ],
      },
    ],
  },
]
};
