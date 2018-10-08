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
.totals(:class="{'totals--divided': night.total.perPerson}")
  foobarz-per-person.totals__per-person(
    :total="night.total"
    :persons="night.persons"
  )
  p.totals__all {{ night.total.all | price }}
</template>

<style lang="scss" scoped>
.totals {
  $root: &;
  grid-area: total;
  background: var(--c-primary-darkest);
  padding: 0 4rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-family: var(--font-mono);
  white-space: nowrap;

  &--divided {
    padding-left: 1rem;

    #{$root}__all {
      color: white;
      // opacity: 0.5;

      &::before {
        content: '=';
        padding-right: 0.25em;
        color: black;
      }
    }
  }

  &__all,
  &__person {
    margin: 0;
    padding: 0 0.5rem;
  }

  &__all {
    text-align: center;
    color: var(--c-accent);
  }

  &__person-count {
    &::after {
      content: '*';
    }
  }
}
</style>
