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
  .bar-menu__list
    button.bar-menu__article(
      v-for="article in bar.articles"
      :key="article.id"
      @click="addArticle({barId: bar.id, nightId, article})"
    )
      foobarz-article(:article="article")
</template>

<style lang="scss" scoped>
.bar-menu {
  background: linear-gradient(
    to bottom,
    var(--c-black),
    var(--c-primary-darkest)
  );
  margin: 0;
  padding: 0.5rem;
  overflow-x: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;

  &__list {
    display: flex;
    flex-wrap: nowrap;
  }

  &__article {
    flex: 0 0 auto;
    margin: 0 0.25rem;
    background: var(--c-black);
    border: 1px solid var(--c-primary-darker);
    height: 70px;
    width: 70px;
    padding: 0;
    position: relative;
    display: block;
    border-radius: 0.5rem;
  }
}
</style>
