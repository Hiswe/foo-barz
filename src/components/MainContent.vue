<template lang="pug">
main.main-content(role="main" :class="`page-${page}`" )
  h1.main-title(v-if="title") {{title}}
  slot
</template>

<style lang="scss" scoped>
.main-content {
  padding: 1rem 1rem calc(1rem + var(--navigation-height));
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
