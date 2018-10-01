<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'page-barz',
  computed: {
    barz() {
      return this.$store.getters.barz()
    },
    ...mapGetters([`lastNightId`, `lastBarId`]),
  },
  methods: {
    // remove(barId) {
    //   this.REMOVE_BAR({ barId })
    // },
    newBar() {
      this.CREATE_BAR()
      this.$router.push({
        name: `bar`,
        params: { barId: this.lastBarId },
      })
    },
    newNight(barId) {
      this.ADD_NIGHT({ barId })
      this.$router.push({
        name: `night`,
        params: { barId, nightId: this.lastNightId },
      })
    },
    // ...mapMutations([`REMOVE_BAR`, `CREATE_BAR`]),
    ...mapMutations([`CREATE_BAR`]),
    ...mapActions([`ADD_NIGHT`]),
  },
}
</script>

<i18n>
{
  "en": {
    "description": "a simple app to compute a bar's bill",
    "edit": "edit",
    "hangout": "go"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="barz" title="Barz" noPadding)
  p.barz-help {{$t('description')}}
  foobarz-ul
    foobarz-li.barz__item(
      v-for="bar in barz"
      :key="bar.id"
    )
      span.barz__name {{bar.name}}
      //- span.barz__action.barz__action--remove(
      //-   v-if="!bar.isDefault"
      //-   @click.stop="remove(bar.id)"
      //- ): foobarz-icon(name="delete-forever" :scale="1.25")
      router-link.barz__action.barz__action--edit(
        :to="`/barz/${bar.id}`"
      )
        foobarz-icon.barz__action-icon(name="edit" :scale="1.25")
        span.barz__action-label {{ $t(`edit`) }}
      .barz__action.barz__action--new-night(
        @click="newNight(bar.id)"
      )
        foobarz-icon.barz__action-icon(name="new-night" :scale="1.15")
        span.barz__action-label {{ $t(`hangout`) }}
  foobarz-button(@click="newBar" fab)
    foobarz-icon(name="add" :scale="1.5")
</template>

<style lang="scss" scoped>
.barz-help {
  text-align: center;
  border-bottom: 2px solid black;
  padding: 1rem;
  margin: 0;
}
.barz {
  &__item {
    color: currentColor;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
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

    &--remove .icon {
      fill: red;
    }

    &-icon {
    }

    &-label {
      font-size: 0.75rem;
    }
  }
}
</style>
