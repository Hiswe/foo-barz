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

<template lang="pug">
//- foobarz-main-content.night(page="night" noPadding :title="$t(`title`)")
section.night(v-if="isValidParams")
  foobarz-header(:title="bar.name")
  foobarz-button.night__add-person(@click="addPerson({nightId})" fab)
    foobarz-icon(name="person-add" :scale="1.5")

  night-total.night__total(:night="night")

  bar-menu.night__menu(
    :bar="bar"
    :nightId="nightId"
  )

  section.selection.selection--articles(v-if="night.articles.length")
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
  --total-height: 60px;
  --menu-size: #{percentage(2/7)};
  position: relative;
  padding-bottom: calc(var(--navigation-height) + var(--total-height));

  &__total {
    position: fixed;
    height: calc(var(--navigation-height) + var(--total-height));
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__menu {
    // position: fixed;
    // top: var(--total-height);
    // right: 0;
    // left: 0;
    // bottom: calc(var(--navigation-height) + var(--total-height));
    // width: var(--menu-size);
  }

  &__add-person {
    bottom: calc(var(--navigation-height) + var(--total-height) + 0.5rem);
    // top: 0.25rem;
    // right: 0.25rem;
    // right: var(--menu-size);
  }
}

.article {
  border: 0;
  background: none;
  width: 100%;
  padding: 100% 0 0;
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }
}
.selection {
  padding: 1rem 0.5rem;
  padding-right: var(--menu-size);

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 0.5rem;

    // .icon {
    //   height: 100%;
    // }
  }
}

.selection + .selection {
  border-top: 5px solid var(--c-primary-darker);
}
</style>
