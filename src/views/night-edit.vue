<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import {
  NIGHT_ARTICLE_REMOVE,
  NIGHT_PERSON_ADD,
  NIGHT_PERSON_REMOVE,
} from '@/store/actions'
import BarMenu from '@/components/nights/bar-menu'
import NightTotal from '@/components/nights/night-total'

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
    bar(state) {
      return this.getBar(this.barId)
    },
    ...mapState({
      isValidParams(state) {
        const isValidBar = state.barz.ids.includes(this.barId)
        const isValidNight = state.nights.ids.includes(this.nightId)
        return isValidBar && isValidNight
      },
      night(state) {
        return state.nights.entities[this.nightId]
      },
    }),
    ...mapGetters([`getBar`]),
  },
  methods: {
    ...mapActions({
      removeArticle: NIGHT_ARTICLE_REMOVE,
      addPerson: NIGHT_PERSON_ADD,
      removePerson: NIGHT_PERSON_REMOVE,
    }),
  },
}
</script>

<template lang="pug">
//- foobarz-main-content.night(page="night" noPadding :title="$t(`title`)")
section.night(v-if="isValidParams")
  foobarz-header(:title="bar.name")
  foobarz-button.night__add-person(@click="addPerson({nightId})" fab)
    foobarz-icon(name="person-add-32")

  night-total.night__total(:night="night")

  bar-menu.night__menu(
    :bar="bar"
    :nightId="nightId"
  )

  section.selection(v-if="night.articles.length")
    .selection__content.selection__content--articles
      .selection__article(
        v-for="article in night.articles"
        :key="article.id"
        @click="removeArticle({nightId, articleId: article.id})"
      )
        foobarz-article(
          :article="bar.articles[article.articleId]"
          simple
        )
  section.selection(v-if="night.persons.length")
    .selection__content.selection__content--people
      button.person(
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
  --menu-size: #{percentage(2/7)};
  position: relative;
  padding-bottom: calc(var(--navigation-height) + var(--total-height));

  &__total {
    position: fixed;
    height: var(--total-height);
    bottom: var(--navigation-height);
    left: 0;
    right: 0;
    z-index: 2;
  }

  &__menu {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &__add-person {
    z-index: 3;
  }
}
.selection {
  padding: 1rem 0.5rem;

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    grid-gap: 0.5rem;
  }

  &__article {
    border: 0;
    background: none;
    width: 100%;
    padding: 100% 0 0;
    position: relative;

    &:only-child {
      // prevent single oversized icon
      max-height: 200px;
      width: 200px;
      padding-top: 200px;
      margin: 0 auto;
    }
  }
}

.selection + .selection {
  border-top: 5px solid var(--c-primary-darker);
}

.person {
  background: none;
  border: 0;
  text-align: center;
}
</style>
