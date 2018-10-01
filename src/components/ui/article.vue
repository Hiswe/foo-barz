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
.article(
  v-if="props.article"
)
  foobarz-icon.article__icon(
    :name="props.article.icon"
    :style="{'--secondary-color': props.article.color}"
  )
  template(v-if="!simple")
    .article__name {{ props.article.name }}
    .article__price {{ props.article.price | price }}
</template>

<style lang="scss" scoped>
.article {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.15rem;
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
    flex: 0 0 auto;
    color: var(--c-primary-lighter);
    text-align: center;
  }

  &__price {
    color: var(--c-accent);
    position: absolute;
    z-index: 2;
    top: 0.15rem;
    right: 0.15rem;
  }
  &__icon {
    z-index: 2;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }
}
</style>
