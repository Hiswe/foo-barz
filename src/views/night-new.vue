<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: `page-new-night`,
  computed: {
    barz() {
      return this.$store.getters.barz()
    },
    ...mapGetters([`lastNightId`, `lastBarId`]),
  },
  methods: {
    newNight(barId) {
      this.ADD_NIGHT({ barId })
      this.$router.push({
        name: `night`,
        params: { barId, nightId: this.lastNightId },
      })
    },
    ...mapActions([`ADD_NIGHT`]),
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Choose your bar"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)" noPadding)
  foobarz-ul
    foobarz-li(
      v-for="bar in barz"
      :key="bar.id"
      @click="newNight(bar.id)"
    ): p.bar-name {{bar.name}}
</template>

<style lang="scss" scoped>
.bar-name {
  margin: 0.5rem 0;
  text-align: center;
}
</style>

