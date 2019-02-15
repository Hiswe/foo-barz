<script>
import { mapActions } from 'vuex'

import { NIGHT_ARTICLE_ADD } from '@/store/actions'

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
      addArticle: NIGHT_ARTICLE_ADD,
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
    var(--c-black) 65%,
    var(--c-accent-darkest)
  );
  margin: 0;
  padding: 0 0.5rem 0.25rem;
  overflow-x: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;

  &__list {
    display: flex;
    flex-wrap: nowrap;
  }

  &__article {
    flex: 0 0 auto;
    margin: 0 0.25rem;
    background: none;
    border: none;
    height: 80px;
    width: 80px;
    padding: 0;
    position: relative;
    display: block;
    border-radius: 0.5rem;
  }
}
</style>
