<template lang="pug">
foobarz-main-content(page="barz-new-edit" title="Bar")
  form(@submit.prevent="createUpdateBar")
    foobarz-input(v-model="bar.name")
    ul
      li(v-for="article in bar.articles" :key="article.id")
        foobarz-icon.articles__icon(:name="article.icon")
        | {{ article.name }} | {{article.price}}฿
    foobarz-button(type="submit")
      | {{ $t(isNew ? `submit-new`: `submit-update`) }}
</template>

<i18n>
{
  "en": {
    "title-new": "new bar",
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
      isNew: false,
      bar: {},
    }
  },
  created() {
    const { id } = this.$route.params
    if (id === `new`) {
      this.isNew = true
      return (this.bar = this.$store.getters.blankBar)
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
    ...mapMutations([`UPDATE_BAR`]),
  },
}
</script>

