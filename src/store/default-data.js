import clonedeep from 'lodash.clonedeep'
import shortid from 'shortid'

export const articles = {
  ctFq_MtBE: {
    id: `ctFq_MtBE`,
    icon: `beer`,
    name: `beer leo`,
    color: `#738588`,
    price: 70,
    archived: false,
  },
  __ay3tMUY: {
    id: `__ay3tMUY`,
    icon: `whisky`,
    name: `sangsom`,
    color: `#738588`,
    price: 375,
    archived: false,
  },
  Zd6cI_aIP: {
    id: `Zd6cI_aIP`,
    icon: `water`,
    name: `mixer`,
    color: `#738588`,
    price: 30,
    archived: false,
  },
  '53ARc_XD5': {
    id: `53ARc_XD5`,
    icon: `bucket`,
    name: `ice bucket`,
    color: `#738588`,
    price: 30,
    archived: false,
  },
  WPXHXTsJp: {
    id: `WPXHXTsJp`,
    icon: `promotion`,
    name: `3 beers`,
    color: `#738588`,
    price: 200,
    archived: false,
  },
}

export const bar = {
  id: `_d6caZLLC`,
  name: `generic bar`,
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
  {
    id: `mNCknxH-2`,
    name: `fastfood`,
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

export const colorList = [
  `#738588`,
  `#000`,
  `rgb(237, 98, 55)`,
  `rgb(151, 192, 92)`,
  `rgb(70, 169, 238)`,
]

export function createArticle() {
  return {
    id: shortid.generate(),
    icon: icons[0].name,
    name: `new product`,
    color: colorList[0],
    price: 100,
    archived: false,
  }
}
