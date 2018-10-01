import clonedeep from 'lodash.clonedeep'

export const articles = {
  ctFq_MtBE: {
    id: `ctFq_MtBE`,
    icon: `beer`,
    name: `beer leo`,
    color: `#738588`,
    price: 70,
  },
  __ay3tMUY: {
    id: `__ay3tMUY`,
    icon: `whisky`,
    name: `sangsom`,
    color: `#738588`,
    price: 375,
  },
  Zd6cI_aIP: {
    id: `Zd6cI_aIP`,
    icon: `water`,
    name: `mixer`,
    color: `#738588`,
    price: 30,
  },
  '53ARc_XD5': {
    id: `53ARc_XD5`,
    icon: `bucket`,
    name: `ice bucket`,
    color: `#738588`,
    price: 30,
  },
  WPXHXTsJp: {
    id: `WPXHXTsJp`,
    icon: `promotion`,
    name: `3 beers`,
    color: `#738588`,
    price: 200,
  },
}

export const bar = {
  id: `_d6caZLLC`,
  name: `generic`,
  isDefault: true,
  articles: clonedeep(articles),
}

export const icons = [
  {
    id: `3di0TB3TT`,
    name: `beer`,
  },
  {
    id: `eNc8GKOWP`,
    name: `whisky`,
  },
  {
    id: `ig_yZ7meQ`,
    name: `bucket`,
  },
  {
    id: `9Jn_cJqXl`,
    name: `water`,
  },
  {
    id: `2LEQRlbIj`,
    name: `promotion`,
  },
]

export const night = {
  name: `new-night`,
  createdAt: new Date().valueOf,
  articles: [],
  persons: [],
  total: {
    all: 0,
    perPerson: false,
  },
}
