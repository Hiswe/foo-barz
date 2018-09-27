<script>
import { mapActions } from 'vuex'

export default {
  name: `page-nights`,
  computed: {
    nights() {
      return this.$store.getters.nights()
    },
  },
  methods: {
    editNight(night) {
      this.$router.push(`/nights/${night.barId}/${night.id}`)
    },
    ...mapActions([`REMOVE_NIGHT`]),
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Perdition list",
    "remove": "remove",
    "at": " at",
    "for": " for",
    "people": "{count} peoples"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)")
  ul.nights
    li.night(
      v-for="night in nights"
      :key="night.id"
      @click="editNight(night)"
    )
      p.night__date {{ night.createdAt | date }}
      .night__text
        p.night__title
          span.night__name {{ night.name }}
          | {{ $t(`at`) }}
          |
          span.night__bar {{ night.barName }}
      .night__cost
        p.night__price {{ night.total.all | price }}
        template(v-if="night.total.perPerson")
        p.night__price-per-person
          | {{ night.total.perPerson | price }} {{ $t(`for`) }}
        p.night__guests
          | {{ $t(`people`, {count: night.persons.length}) }}
      //- foobarz-button(
      //-   @click.stop="REMOVE_NIGHT({nightId: night.id})"
      //- ) {{$t(`remove`)}}
</template>

<style lang="scss" scoped>
.nights {
  list-style: none;
  padding: 0;
}
.night {
  text-align: center;
  border: 2px solid var(--c-black);
  padding: 0 0.5rem 1rem;

  &__link {
    text-decoration: none;
    color: white;
  }
  &__date {
    font: var(--font-mono);
    font-size: 0.8em;
    color: var(--c-primary);
    margin: 0.5rem 0;
  }
  &__text,
  &__cost {
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
  &__title {
    color: var(--c-primary);
    margin: 0;
  }
  &__name {
    display: block;
  }
  &__name,
  &__bar,
  &__price {
    font-size: 1.2em;
  }
  &__name,
  &__bar {
    color: white;
  }
  &__price {
    color: var(--c-accent);
    margin: 0;
  }
  &__price-per-person,
  &__guests {
    font-size: 0.8em;
    margin: 0;
    color: var(--c-primary);
  }
  &__price-per-person {
    margin-top: 0.5rem;
  }
}
</style>
