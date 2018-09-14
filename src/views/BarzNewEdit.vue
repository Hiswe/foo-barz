<template lang="pug">
foobarz-main-content(page="barz-new-edit" :title="title")
  form(@submit.prevent="createUpdateBar")
    foobarz-input(v-model="bar.name")
    dl.articles
      template(v-for="(article, index) in bar.articles" )
        dt.articles__title(
          :key="`${article.id}-title`"
          @click="openEditPanel(index)"
        )
          span.articles__icon
            foobarz-icon(:name="article.icon")
          span.articles__name {{ article.name }}
          span.articles__price {{article.price}}฿
        dd.articles__edit(
          :key="`${article.id}-edit`"
          v-if="editArticle === index"
        )
          foobarz-input.articles__edit-name(v-model="article.name")
          foobarz-input.articles__edit-price(type="number" v-model="article.price")

    foobarz-button(type="submit")
      | {{ $t(isNew ? `submit-new`: `submit-update`) }}
</template>

<style lang="scss" scoped>
.articles {
  &__title {
    display: flex;
    padding: 0.5rem 0;
    align-items: baseline;

    &::before {
      content: '';
      flex: 1 1 auto;
      border-bottom: 3px dotted var(--c-primary-darker);
      order: 1;
    }
  }
  &__icon {
    display: block;
    height: 1.5rem;
    width: 1.5rem;

    .icon {
      width: 100%;
      height: 100%;
    }
  }
  &__price {
    order: 2;
  }
  &__edit {
    display: flex;
    background: black;
    margin: 0;
    padding: 1rem;
    border-radius: 0.5rem;

    &-name {
      flex: 1 1 auto;
    }

    &-price {
      width: 40%;
      margin-left: 1rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "title-new": "new bar – {barName}",
    "title-edit": "edit – {barName}",
    "submit-new": "create",
    "submit-update": "update"
  }
}
</i18n>

<script>
import cloneDeep from 'lodash.clonedeep'
import { mapMutations } from 'vuex'

export default {
  name: `page-bar`,
  data() {
    return {
      editArticle: false,
      bar: {},
    }
  },
  computed: {
    isNew() {
      return this.$route.params.id === `new`
    },
    title() {
      const i18nKey = this.isNew ? `title-new` : `title-edit`
      return this.$t(i18nKey, { barName: this.bar.name })
    },
  },
  created() {
    const { id } = this.$route.params
    if (this.isNew) {
      return (this.bar = this.$store.getters.blankBar())
    }
    const bar = this.$store.state.barz.list.find(bar => bar.id === id)
    if (!bar) return this.$router.push({ name: `404` })
    // make a draft of the current bar
    this.bar = cloneDeep(bar)
  },
  methods: {
    createUpdateBar() {
      this.UPDATE_BAR(this.bar)
    },
    openEditPanel(index) {
      if (this.editArticle === index) {
        return (this.editArticle = false)
      }
      this.editArticle = index
    },
    ...mapMutations([`UPDATE_BAR`]),
  },
}
</script>

