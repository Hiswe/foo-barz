<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import BarMenu from '@/components/nights/BarMenu'
import NightTotal from '@/components/nights/NightTotal'

export default {
  name: `page-night`,
  components: {
    BarMenu,
    NightTotal,
  },
  created() {
    if (!this.isValidParams) return this.$router.push({ name: `404` })
  },
  computed: {
    barId() {
      return this.$route.params.barId
    },
    nightId() {
      return this.$route.params.nightId
    },
    ...mapState({
      isValidParams(state) {
        const isValidBar = state.barz.ids.includes(this.barId)
        const isValidNight = state.nights.ids.includes(this.nightId)
        return isValidBar && isValidNight
      },
      bar(state) {
        return state.barz.entities[this.barId]
      },
      night(state) {
        return state.nights.entities[this.nightId]
      },
    }),
  },
  methods: {
    ...mapActions({
      removeArticle: `REMOVE_NIGHT_ARTICLE`,
      addPerson: `ADD_PERSON`,
      removePerson: `REMOVE_PERSON`,
    }),
  },
}
</script>

<i18n>
{
  "en": {
    "selection": "selection",
    "people": "people"
  }
}
</i18n>

<template lang="pug">
//- foobarz-main-content.night(page="night" noPadding :title="$t(`title`)")
section.night(v-if="isValidParams")

  night-total.night__total(:night="night")
  bar-menu.night__menu(
    :bar="bar"
    :nightId="nightId"
  )

  foobarz-button(@click="addPerson({nightId})" fab)
    foobarz-icon(name="person-add" :scale="1.5")

  section.selection.selection--articles(v-if="night.articles.length")
    h3.selection__title {{ $t('selection') }}
    .selection__content
      button.article(
        v-for="article in night.articles"
        :key="article.id"
        @click="removeArticle({nightId, articleId: article.id})"
      )
        foobarz-icon(
          :name="bar.articles[article.articleId].icon"
          :style="{'--secondary-color': bar.articles[article.articleId].color}"
        )
  section.selection.selection--people(v-if="night.persons.length")
    h3.selection__title {{ $t('people') }}
    .selection__content
      button.article(
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
  --total-height: 70px;
  position: relative;
  // padding-left: percentage(1/3);

  &__total {
    height: var(--total-height);
    top: 0;
    left: 0;
    right: 0;
  }

  &__menu {
    position: absolute;
    top: var(--total-height);
    left: 0;
    bottom: var(--navigation-height);
    width: percentage(1/3);
  }
}

.article {
  border: 0;
  background: none;

  &--add-person {
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
  }
}

.bar-menu {
  margin: 0;
  padding: 1rem 0;
  text-align: center;
  grid-area: menu;
}
.selection {
  padding-left: percentage(1/3);

  &--articles {
    grid-area: articles;
  }
  &--people {
    grid-area: people;
  }

  &__title {
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
}
</style>
