<template lang="pug">
#app
  foobarz-main-navigation
  router-view
</template>

<style lang="scss">
:root {
  --c-primary-h: 190;
  --c-primary-s: 7%;
  --c-primary-lightest: hsl(var(--c-primary-h), var(--c-primary-s), 90%);
  --c-primary-lighter: hsl(var(--c-primary-h), var(--c-primary-s), 70%);
  --c-primary: hsl(var(--c-primary-h), var(--c-primary-s), 50%);
  --c-primary-darker: hsl(var(--c-primary-h), var(--c-primary-s), 30%);
  --c-primary-darkest: hsl(var(--c-primary-h), var(--c-primary-s), 17%);
  --c-black: hsl(var(--c-primary-h), var(--c-primary-s), 7%);
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
  background: var(--c-black);
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

//////
// PWA REFRESH UI
//////

.pwa-refresh-ui {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding: 0 calc(50% - 400px / 2);
  font-size: 18px;

  &__text,
  &__dismiss,
  &__refresh {
    margin: 0;
    padding: 0.75rem 0;
  }
  &__text {
    flex: 1 1 auto;
    padding-left: 0.5rem;
  }
  &__dismiss,
  &__refresh {
    font-size: 16px;
    background: none;
    border: 0;
    text-transform: uppercase;
    margin-left: 0.5rem;
    color: var(--c-accent);
    transition: color 0.25s, transform 0.25s;

    &:active {
      color: var(--c-accent-darker);
      transform: translateY(2px);
    }
  }
  &__refresh {
    padding-right: 0.5rem;
  }
}
</style>

<script>
import MainNavigation from '@/components/MainNavigation'

export default {
  name: `app`,
  components: {
    'foobarz-main-navigation': MainNavigation,
  },
}
</script>
