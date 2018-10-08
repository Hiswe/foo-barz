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
    remove(nightId) {
      this.REMOVE_NIGHT({ nightId })
    },
    ...mapActions([`REMOVE_NIGHT`]),
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Perdition list",
    "at": " at"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)" noPadding)
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
  &__per-person {
    margin-top: 0.25rem;
  }
  &__cost--divided {
    #{$root}__total {
      font-size: 1rem;
      padding-top: 0.15em;
      opacity: 0.35;
    }
  }
  .night + .night {
    border-top: 2px solid var(--c-black);
  }
}
</style>
