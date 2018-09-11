<template lang="pug">
foobarz-main-content(page="home" title="Barz")
  p {{$t('description')}}
  //- form.form(@submit.prevent="addBar")
  //-   label.form__label(for="bar-name") {{ $t(`new-bar`) }}
  //-   input.form__input(v-model="name")
  //-   button.form__button(type="submit") ➕

</template>

<style lang="scss" scoped>
.form {
  &__label {
    display: block;
    padding: 0 0 0.25rem;
  }
  &__input {
    display: block;
    width: 100%;
    border: 2px solid var(--c-primary);
    background: none;
    padding: 0.25rem 0.5rem;
  }
  &__button {
    background: var(--c-accent);
    border: 0;
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
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    name: ``,
  }),
  methods: {
    addBar() {
      // console.log(this.ADD_BAR)
    },
    ...mapMutations({
      ADD_BAR: 'bar.ADD',
    }),
  },
}
</script>
