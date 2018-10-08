<script>
export default {
  name: `foobarz-price-per-person`,
  props: {
    total: {
      type: Object,
      default: { perPerson: 0 },
    },
    persons: {
      type: Array,
      default: [],
    },
  },
}
</script>

<template lang="pug">
p.per-person(v-if="total.perPerson && persons.length")
  span.per-person__price {{ total.perPerson | price }}
  span.per-person__time ×
  span.per-person__persons {{ persons.length }}
</template>

<style lang="scss" scoped>
.per-person {
  margin: 0;
  white-space: nowrap;

  &__price {
    color: var(--c-accent);
  }
  &__time {
    padding: 0 0.15em;
  }
}
</style>
