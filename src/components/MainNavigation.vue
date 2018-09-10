<template lang="pug">
nav.main-navigation
  router-link.main-navigation__link(to="/") Barz
  router-link.main-navigation__link(to="/night") {{ $t(`night`) }}
  router-link.main-navigation__link(to="/settings")
    foobars-icon(name="settings" :scale="1.5")
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
    align-items: center;
    justify-content: center;

    &--active {
      background: var(--c-accent);
      color: var(--c-primary-darkest);
    }

    .icon {
      fill: currentColor;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "night": "night"
  }
}
</i18n>

<script>
export default {
  name: `main-navigation`,
}
</script>
