<template lang="pug">
foobarz-main-content(page="edit-article" :title="article.name")
  form.product(@submit.prevent="updateProducts()")
    foobarz-icon.product__icon(:name="article.icon" :scale="4")
    foobarz-input(v-model="article.name")
    foobarz-input(v-model="article.price" type="number")
    foobarz-button(type="submit") {{ $t(`update`) }}
</template>

<style lang="scss" scoped>
.product {
  &__icon {
    display: block;
    margin: 0 auto;
  }
  &__name,
  &__price {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>

<i18n>
{
  "en": {
    "update": "update",
    "updated": "article updated"
  }
}
</i18n>

<script>
import { mapMutations } from 'vuex'

export default {
  name: `page-edit-article`,
  data() {
    return {
      article: {},
    }
  },
  methods: {
    updateProducts() {
      this.ARTICLE_UPDATE(this.article)
      this.$notify(this.$t(`updated`))
    },
    ...mapMutations([`ARTICLE_UPDATE`]),
  },
  created() {
    const { id } = this.$route.params
    const article = this.$store.state.articles.list.find(
      product => product.id === id,
    )
    // make a draft of the current product
    this.article = { ...article }
  },
}
</script>
