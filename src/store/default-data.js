import clonedeep from 'lodash.clonedeep'

export const articles = [
  {
    id: `ctFq_MtBE`,
    icon: `beer`,
    name: `beer leo`,
    color: `#738588`,
    price: 70,
  },
  {
    id: `__ay3tMUY`,
    icon: `whisky`,
    name: `sangsom`,
    color: `#738588`,
    price: 375,
  },
  {
    id: `Zd6cI_aIP`,
    icon: `water`,
    name: `mixer`,
    color: `#738588`,
    price: 30,
  },
  {
    id: `53ARc_XD5`,
    icon: `bucket`,
    name: `ice bucket`,
    color: `#738588`,
    price: 30,
  },
  {
    id: `WPXHXTsJp`,
    icon: `promotion`,
    name: `promotion – 3 beers`,
    color: `#738588`,
    price: 200,
  },
]

export const bar = {
  id: `_d6caZLLC`,
  name: `generic`,
  isDefault: true,
  articles: clonedeep(articles),
}

export const icons = [
  {
    id: `3di0TB3TT`,
    iconName: `beer`,
  },
  {
    id: `eNc8GKOWP`,
    iconName: `whisky`,
  },
  {
    id: `9Jn_cJqXl`,
    iconName: `water`,
  },
  {
    id: `2LEQRlbIj`,
    iconName: `promotion`,
  },
]
