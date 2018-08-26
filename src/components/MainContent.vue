<template lang="pug">
  main(role="main").main-content(:class="`page-${page}`")
    h1.main-title(v-if="title") {{title}}
    slot
</template>

<style lang="scss" scoped>
.main-content {
  // need this for stacking page transitions
  position: fixed;
  top: 0;
  right: 0;
  bottom: var(--navigation-height);
  left: 0;
  overflow-x: hidden;
  // momemtum scrolling
  // https://css-tricks.com/snippets/css/momentum-scrolling-on-ios-overflow-elements/
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  padding: var(--gutter);
  flex: 1 0 auto;
  width: 100%;
  flex-direction: column;
}
.main-title {
  text-align: center;
  font-weight: 300;
  font-size: 2.5em;
  font-variant: small-caps;
  margin: 0;
  padding: 0 0 1.5rem;
}
</style>

<script>
export default {
  name: `foobarz-main-content`,
  props: {
    page: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
}
</script>
