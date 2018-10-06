<script>
export default {
  name: `foobarz-night-total`,
  props: {
    night: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template lang="pug">
.totals
  p.totals__all
    span.totals__price {{ night.total.all | price }}
  p.totals__person(v-if="night.total.perPerson")
    span.totals__person-count {{night.persons.length}}
    span.totals__price {{ night.total.perPerson | price }}
</template>

<style lang="scss" scoped>
.totals {
  grid-area: total;
  background: var(--c-primary-darkest);
  padding: 0 3.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);

  &__all,
  &__person {
    margin: 0;
    padding: 0 0.5rem;
    font-size: 1.75rem;
    white-space: nowrap;
  }

  &__all {
    text-align: center;
  }

  &__price {
    color: var(--c-accent);
  }

  &__person-count {
    &::after {
      content: '*';
    }
  }
}
</style>
