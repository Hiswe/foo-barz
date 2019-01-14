<script>
import FoobarzMainNavigation from '@/components/main-navigation'

export default {
  name: `app`,
  components: {
    FoobarzMainNavigation,
  },
}
</script>

<template lang="pug">
#app
  foobarz-main-navigation
  router-view
  notifications(classes="foobarz-notifications" position="bottom center")
</template>

<style lang="scss">
@import '~@hiswe/focus-ring/dist/focus-ring.scss';

:root {
  --c-primary-h: #{$c-primary-h};
  --c-primary-s: #{$c-primary-s};
  --c-primary-l: #{$c-primary-l};
  --c-primary-lightest: hsl(var(--c-primary-h), var(--c-primary-s), 90%);
  --c-primary-lighter: hsl(var(--c-primary-h), var(--c-primary-s), 70%);
  --c-primary: hsl(var(--c-primary-h), var(--c-primary-s), var(--c-primary-l));
  --c-primary-darker: hsl(var(--c-primary-h), var(--c-primary-s), 30%);
  --c-primary-darkest: hsl(var(--c-primary-h), var(--c-primary-s), 17%);
  --c-black: hsl(var(--c-primary-h), var(--c-primary-s), 7%);

  --c-accent-h: #{$c-accent-h};
  --c-accent-s: #{$c-accent-s};
  --c-accent-l: #{$c-accent-l};
  --c-accent-lightest: hsl(var(--c-accent-h), var(--c-accent-s), 80%);
  --c-accent-lighter: hsl(var(--c-accent-h), var(--c-accent-s), 65%);
  --c-accent: hsl(var(--c-accent-h), var(--c-accent-s), var(--c-accent-l));
  --c-accent-darker: hsl(var(--c-accent-h), var(--c-accent-s), 35%);
  --c-accent-darkest: hsl(var(--c-accent-h), var(--c-accent-s), 10%);

  --navigation-height: 50px;

  --picker-size: 2.6rem;

  --font-mono: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
}

:root {
  // Z-Index Scale
  --zi-1: 100;
  --zi-2: 200;
  --zi-3: 300;
  --zi-4: 400;
  --zi-5: 500;
  --zi-6: 600;
  --zi-7: 700;
  --zi-8: 800;
  --zi-9: 900;
  --zi-10: 1000;

  // Z-Index Applications
  --zindex-fab: var(--zi-2);
  --zindex-edit-product: var(--zi-3);
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
  font-size: percentage(18/16);
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
button {
  touch-action: manipulation;
}

.icon {
  fill: var(--c-primary);

  // keep icons sharp
  // https://stackoverflow.com/a/22165796
  * {
    shape-rendering: crispEdges;
  }
}
.icon-secondary-color {
  fill: var(--secondary-color, --c-primary);
}

//////
// NOTIFICATION
//////

// override default notification styling
// https://github.com/euvl/vue-notification/blob/master/demo/src/App.vue#L267-L287
.notification.foobarz-notifications {
  margin: 1rem;
  margin-bottom: 0;
  border-radius: 0.25em;
  font-size: 1.5em;
  text-align: center;
  padding: 10px 20px;
  color: var(--c-text);
  background: var(--c-accent-lightest);
  border: 0;
  color: var(--c-black);
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
    color: black;
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
