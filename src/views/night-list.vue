<script>
import { mapActions, mapGetters } from 'vuex'

import { NIGHT_DELETE } from '@/store/actions'

export default {
  name: `page-nights`,
  computed: {
    ...mapGetters([`weeklyTotal`]),
    nights() {
      return this.$store.getters.nights()
    },
  },
  methods: {
    editNight(night) {
      this.$router.push(`/nights/${night.barId}/${night.id}`)
    },
    remove(nightId) {
      this.deleteNight({ nightId })
    },
    ...mapActions({
      deleteNight: NIGHT_DELETE,
    }),
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Nights history",
    "weekly-total": "this week:",
    "at": " at"
  },
  "fr": {
    "title": "Historique des sorties",
    "weekly-total": "cette semaine :",
    "at": " à"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)" noPadding)
  dl.weekly-total
    dt.weekly-total__label {{ $t('weekly-total') }}
    dd.weekly-total__price {{ weeklyTotal | price }}
  foobarz-ul
    foobarz-li.night(
      v-for="night in nights"
      :key="night.id"
      @click="editNight(night)"
      @remove="remove(night.id)"
    )
      .night__text
        p.night__title
          span.night__date {{ night.createdAt | date }}
          | {{ $t(`at`) }}
          |
          span.night__bar {{ night.barName }}
      .night__cost(:class="{'night__cost--divided': night.total.perPerson}")
        foobarz-per-person.night__per-person(
          :total="night.total"
          :persons="night.persons"
        )
        p.night__total {{ night.total.all | price }}

</template>

<style lang="scss" scoped>
.night {
  $root: &;
  text-align: center;

  /deep/ .list__item-content {
    display: flex;
    align-items: center;
  }

  &__link {
    text-decoration: none;
    color: white;
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
  &__date {
    display: block;
  }
  &__bar,
  &__total,
  &__per-person {
    font-size: 1.2em;
  }
  &__date,
  &__bar {
    color: white;
  }
  &__total {
    color: var(--c-accent);
    margin: 0;
  }
  &__per-person,
  &__guests {
    margin: 0;
    color: var(--c-primary);
  }
  &__cost--divided {
    #{$root}__total {
      font-size: 1rem;
      padding-top: 0.15em;
      opacity: 0.35;
    }
  }
}

.weekly-total {
  padding: 0.5rem;
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: baseline;
  background: var(--c-primary-darker);

  &__label,
  &__price {
    margin: 0;
  }
  &__price {
    padding: 0 0 0 0.25em;
    font-size: 1.5rem;
    color: var(--c-accent);
  }
}
</style>
