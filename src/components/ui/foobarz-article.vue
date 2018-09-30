<script>
export default {
  name: `foobarz-article`,
  props: {
    article: {
      type: Object,
      required: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template lang="pug" functional>
.article(v-if="props.article")
  foobarz-icon.article__icon(
    :name="props.article.icon"
    :style="{'--secondary-color': props.article.color}"
  )
  template(v-if="!props.simple")
    .article__name {{ props.article.name }}
    .article__price {{ props.article.price | price }}
</template>

<style lang="scss" scoped>
.article {
  position: relative;

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
