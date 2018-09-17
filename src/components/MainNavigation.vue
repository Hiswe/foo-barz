<template lang="pug">
nav.main-navigation
  router-link.main-navigation__link(to="/")
    foobarz-icon.main-navigation__icon(name="store" :scale="1.5")
    span.main-navigation__label {{ $t(`barz`) }}
  router-link.main-navigation__link(to="/nights")
    foobarz-icon.main-navigation__icon(name="night" :scale="1.5")
    span.main-navigation__label {{ $t(`nights`) }}
  //- router-link.main-navigation__link(to="/articles")
  //-   foobarz-icon.main-navigation__icon(name="settings" :scale="1.5")
  //-   span.main-navigation__label pouic
  router-link.main-navigation__link(to="/information")
    foobarz-icon.main-navigation__icon(name="info" :scale="1.5")
    span.main-navigation__label {{ $t(`info`) }}
</template>

<style lang="scss" scoped>
.main-navigation {
  position: fixed;
  background: var(--c-black);
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: var(--navigation-height);

  &__link {
    font-weight: bold;
    flex: 1 0 auto;
    text-align: center;
    text-decoration: none;
    color: var(--c-primary-lightest);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--active {
      background: var(--c-accent);
      color: var(--c-primary-darkest);
    }
  }
  &__icon {
    fill: currentColor;
  }
  &__label {
    font-size: 0.5rem;
    font-weight: 400;
    text-transform: uppercase;
  }
}
</style>

<i18n>
{
  "en": {
    "barz": "barz",
    "info": "info",
    "nights": "nights"
  }
}
</i18n>

<script>
export default {
  name: `main-navigation`,
}
</script>
