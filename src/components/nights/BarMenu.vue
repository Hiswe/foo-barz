<script>
import { mapActions } from 'vuex'

export default {
  name: `foobarz-bar-menu`,
  props: {
    bar: {
      type: Object,
      required: true,
    },
    nightId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      addArticle: `ADD_NIGHT_ARTICLE`,
    }),
  },
}
</script>

<template lang="pug">
menu.bar-menu
  button.bar-menu__article(
    v-for="article in bar.articles"
    :key="article.id"
    @click="addArticle({barId: bar.id, nightId, article})"
  )
    .article
      foobarz-icon.article__icon(
        :name="article.icon"
        :style="{'--secondary-color': article.color}"
      )
      .article__name {{ article.name }}
      .article__price {{ article.price | price }}
</template>

<style lang="scss" scoped>
.bar-menu {
  background: var(--c-black);
  margin: 0;
  padding: 0.5rem;
  overflow-y: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;

  &__article {
    background: var(--c-primary-darkest);
    border: 0;
    width: 100%;
    padding: 0;
    padding-top: 100%;
    position: relative;
    display: block;
    border-radius: 0.5rem;
  }

  &__article + &__article {
    margin-top: 0.5rem;
  }
}
.article {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__name,
  &__price {
    font-size: 0.7rem;
  }

  &__name {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    transform-origin: bottom left;
    transform: rotate(-0.25turn) translateY(100%);
    color: var(--c-primary-lighter);
  }

  &__price {
    color: var(--c-accent);
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
  }
  &__icon {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
    padding: 0.5rem;
    height: 100%;
    width: 100%;
  }
}
</style>
