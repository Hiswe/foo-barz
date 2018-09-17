<template lang="pug">
foobarz-main-content(page="night" :title="$t(`title`)")
  dl.totals
    dt.totals__label {{ $t( 'total') }}
    dd.totals__value {{ night.total.all | price }}
    template(v-if="night.total.perPerson")
      dt.totals__label {{ $t( 'total-person') }} ({{night.persons.length}})
      dd.totals__value {{ night.total.perPerson | price }}

  menu.night__items
    button.night__action(
      v-for="article in bar.articles"
      :key="article.id"
      @click="addArticle({barId, nightId, article})"
    )
      foobarz-icon(:name="article.icon")
      div {{ article.price | price }}
    button.night__action.night__action--add-person(
      @click="addPerson({nightId})"
    )
      foobarz-icon(name="person-add" :scale="2.5")
  template(v-if="night.articles.length")
    h2.night__title {{ $t('selection') }}
    div
      button.night__action(
        v-for="article in night.articles"
        :key="article.id"
        @click="removeArticle({nightId, articleId: article.id})"
      )
        foobarz-icon(
          :name="article.icon"
        )
  template(v-if="night.persons.length")
    h2.night__title {{ $t('people') }}
    div
      button.night__action(
        v-for="person in night.persons"
        :key="person.id"
        @click="removePerson({nightId, personId: person.id})"
      )
        foobarz-icon(
          name="person"
          :scale="2.5"
        )
</template>

<style lang="scss" scoped>
.night {
  &__title {
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
  &__items {
    margin: 0;
    padding: 1rem 0;
    text-align: center;
  }
  &__action {
    border: 0;
    background: none;

    &--add-person {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
    }
  }
}
.totals {
  background: var(--c-primary-darker);
  padding: 1rem;
  margin: 0;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.5rem;
  border-radius: 0.5rem;

  &__label,
  &__value {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  &__label {
    text-transform: uppercase;
    font-size: 0.9rem;
    grid-row: 1;
  }
  &__value {
    grid-row: 2;
    color: var(--c-accent);
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Night",
    "total": "total",
    "total-person": "per person",
    "selection": "selection",
    "people": "people"
  }
}
</i18n>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: `page-night`,
  computed: {
    barId() {
      return this.$route.params.barId
    },
    nightId() {
      return this.$route.params.nightId
    },
    ...mapState({
      bar(state) {
        return state.barz.list.find(bar => bar.id === this.barId)
      },
      night(state) {
        return state.nights.list.find(night => night.id === this.nightId)
      },
    }),
  },
  methods: {
    ...mapActions({
      addArticle: `ADD_NIGHT_ARTICLE`,
      removeArticle: `REMOVE_NIGHT_ARTICLE`,
      addPerson: `ADD_PERSON`,
      removePerson: `REMOVE_PERSON`,
    }),
  },
}
</script>
