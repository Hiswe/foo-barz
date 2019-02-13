<template lang="pug">
dl.category
  dt.category__title {{title}}
  dd.category__content
    slot
</template>

<style lang="scss" scoped>
.category,
.category__content {
  margin: 0;
  padding: 0;
}
.category {
  margin-top: 1rem;
  background: var(--c-primary-white);
  position: relative;

  &__title,
  &__content {
    z-index: 2;
    position: relative;
  }
  &__title {
    font-size: 1.5rem;
    text-align: center;
    background: var(--c-primary-white);
    padding: 0.5rem 0 1rem;
    border-radius: var(--border-radius);
    color: var(--c-accent-darker);
    text-transform: uppercase;
    font-weight: 300;
  }
  &__content {
    text-align: center;
  }
}
</style>

<script>
export default {
  name: `category`,
  props: {
    title: String,
  },
}
</script>
