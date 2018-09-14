<template lang="pug">
foobarz-main-content(page="barz" title="Barz")
  p {{$t('description')}}
  ul.barz
    li.barz__item(
      v-for="bar in barz"
      :key="bar.id"
    )
      span.barz__name {{bar.name}}
      span.barz__action.barz__action--remove(
        v-if="!bar.isDefault"
        @click.stop="remove(bar.id)"
      ): foobarz-icon(name="delete-forever" :scale="1.25")
      router-link.barz__action.barz__action--edit(
        :to="`/barz/${bar.id}`"
      ): foobarz-icon(name="edit" :scale="1.25")
      router-link.barz__action.barz__action--new-night(
        :to="`/night/${bar.id}/new`"
      ): foobarz-icon(name="new-night" :scale="1.15")
  router-link(to="/barz/new") {{ $t(`new-bar`) }}

</template>

<style lang="scss" scoped>
.barz {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    color: currentColor;
    text-decoration: none;
    display: flex;
    border: 1px solid var(--c-primary);
    padding: 1em;
  }
  &__name {
    margin-right: auto;
  }
  &__action {
    margin-left: 1rem;
    &--remove .icon {
      fill: red;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "new-bar": "new bar",
    "description": "a simple app to compute a bar's bill"
  }
}
</i18n>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'page-barz',
  data: () => ({
    name: ``,
  }),
  computed: {
    ...mapState({
      barz: state => state.barz.list,
    }),
  },
  methods: {
    remove(barId) {
      this.REMOVE_BAR(barId)
    },
    ...mapMutations([`REMOVE_BAR`]),
  },
}
</script>
