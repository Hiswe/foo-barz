<template lang="pug">
foobarz-main-content(page="articles" :title="$t(`title`)")
  .articles
    router-link.articles__item(
      v-for="article in articles"
      :key="article.id"
      :to="`/articles/${article.id}`"
    )
      foobarz-icon.articles__icon(:name="article.icon")
      p.articles__name {{ article.name }}
      p.articles__price {{  article.price }}฿
</template>

<i18n>
{
  "en": {
    "title": "products"
  }
}
</i18n>

<style lang="scss" scoped>
.articles {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 170px));

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    text-decoration: none;
  }
  &__icon {
    flex-grow: 1;
  }
  &__name,
  &__price {
    margin: 0;
  }
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: `page-articles`,
  computed: {
    ...mapState({
      articles: state => state.articles.list,
    }),
  },
}
</script>
