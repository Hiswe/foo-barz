<template lang="pug">
#app
  nav.main-navigation
    router-link.main-navigation__link(to="/") Barz
    router-link.main-navigation__link(to="/night") {{ $t(`night`) }}
    router-link.main-navigation__link(to="/settings")
      foobars-icon(name="settings" :scale="1.5")
  router-view
</template>

<i18n>
{
  "en": {
    "night": "night"
  }
}
</i18n>

<style lang="scss">
:root {
  --c-primary-h: 190;
  --c-primary-s: 7%;
  --c-primary-lightest: hsl(var(--c-primary-h), var(--c-primary-s), 90%);
  --c-primary-lighter: hsl(var(--c-primary-h), var(--c-primary-s), 70%);
  --c-primary: hsl(var(--c-primary-h), var(--c-primary-s), 50%);
  --c-primary-darker: hsl(var(--c-primary-h), var(--c-primary-s), 30%);
  --c-primary-darkest: hsl(var(--c-primary-h), var(--c-primary-s), 17%);
  --c-accent: hsl(32, 100%, 50%);

  --navigation-height: 55px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  -webkit-text-size-adjust: 100%;
  // https://css-tricks.com/snippets/css/system-font-stack/#article-header-id-1
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: percentage(20/16);
}
html,
body {
  background: var(--c-primary-darkest);
  color: white;
  margin: 0;
  padding: 0;
}
button,
input,
textarea,
select {
  font: inherit;
  color: currentColor;
}
body:not(.user-is-tabbing) {
  a:focus,
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }
}
button {
  touch-action: manipulation;
}

.main-navigation {
  position: fixed;
  background: var(--c-primary-darkest);
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 5px solid var(--c-primary-darker);
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
.icon {
  fill: var(--c-primary);
}

//////
// FORM
//////

input {
  display: block;
  background: none;
  border: 2px solid var(--c-primary);
  padding: 0.25rem 0.5rem;

  &:focus {
    border-color: var(--c-primary-lighter);
  }
  &[type='number'] {
    text-align: right;
  }
}
</style>
