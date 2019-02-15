<script>
import { mapGetters, mapActions } from 'vuex'

import { BAR_CREATE, BAR_REMOVE, NIGHT_CREATE } from '@/store/actions'

export default {
  name: 'page-barz',
  computed: {
    barz() {
      return this.$store.getters.barz()
    },
    ...mapGetters([`lastNightId`, `lastBarId`]),
  },
  methods: {
    newBar() {
      this.createBar()
      this.$router.push({
        name: `bar`,
        params: { barId: this.lastBarId },
      })
    },
    remove(barId) {
      this.removeBar({ barId })
    },
    newNight(barId) {
      this.createNight({ barId })
      this.$router.push({
        name: `night`,
        params: { barId, nightId: this.lastNightId },
      })
    },
    ...mapActions({
      createBar: BAR_CREATE,
      removeBar: BAR_REMOVE,
      createNight: NIGHT_CREATE,
    }),
  },
}
</script>

<i18n>
{
  "en": {
    "edit": "edit",
    "hangout": "go"
  },
  "fr": {
    "edit": "éditer",
    "hangout": "aller"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="barz" title="Barz" noPadding)
  foobarz-ul
    foobarz-li.barz__item(
      v-for="bar in barz"
      :key="bar.id"
      @remove="remove(bar.id)"
    )
      span.barz__name {{bar.name}}
      router-link.barz__action.barz__action--edit(
        :to="`/barz/${bar.id}`"
      )
        foobarz-icon.barz__action-icon(name="edit-32")
        span.barz__action-label {{ $t(`edit`) }}
      .barz__action.barz__action--new-night(
        @click="newNight(bar.id)"
      )
        foobarz-icon.barz__action-icon(name="hangout-32")
        span.barz__action-label {{ $t(`hangout`) }}
  foobarz-button(@click="newBar" fab)
    foobarz-icon(name="add")
</template>

<style lang="scss" scoped>
.page-barz {
  padding-bottom: calc(var(--navigation-height) * 1.35);
}
.barz {
  &__item /deep/ .list__item-content {
    color: currentColor;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  &__name {
    margin-right: auto;
  }
  &__action {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: currentColor;
    text-decoration: none;
    align-self: stretch;

    &-label {
      margin-top: auto;
      font-size: 0.75rem;
    }
  }
}
</style>
