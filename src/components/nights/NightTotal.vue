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

<i18n>
{
  "en": {
    "total": "total",
    "total-person": "per person"
  }
}
</i18n>

<template lang="pug">
dl.totals
  dt.totals__label {{ $t( 'total') }}
  dd.totals__value {{ night.total.all | price }}
  template(v-if="night.total.perPerson")
    dt.totals__label {{ $t( 'total-person') }} ({{night.persons.length}})
    dd.totals__value {{ night.total.perPerson | price }}
</template>

<style lang="scss" scoped>
.totals {
  background: linear-gradient(
    to bottom,
    var(--c-primary-darker),
    var(--c-black)
  );
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  margin: 0;
  display: grid;
  grid-template-rows: repeat(2, min-content);
  grid-gap: 0.5rem;
  grid-area: total;

  &__label,
  &__value {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  &__label {
    text-transform: uppercase;
    font-size: 0.8rem;
    grid-row: 1;
  }
  &__value {
    grid-row: 2;
    color: var(--c-accent);
  }
}
</style>
