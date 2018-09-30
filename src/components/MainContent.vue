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
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    additionalClass() {
      const pageClass = `page-${this.page}`
      return {
        [pageClass]: true,
        'main--no-padding': this.noPadding,
      }
    },
  },
}
</script>

<template lang="pug">
main.main(role="main" :class="additionalClass" )
  foobarz-header(v-if="title" :title="title")
  .main__content: slot
</template>

<style lang="scss" scoped>
.main {
  $root: &;
  background: var(--c-primary-darkest);
  min-height: 100vh;

  &__title {
    text-align: center;
    height: 50px;
    font-weight: 300;
    font-size: 1.15em;
    font-variant: small-caps;
    text-transform: uppercase;
    margin: 0;
    padding: 0.5em 1rem;
    background: var(--c-black);
  }

  &__content {
    padding: 1rem 1rem calc(1rem + var(--navigation-height));

    #{$root}--no-padding & {
      padding-top: 0;
      padding-right: 0;
      padding-bottom: var(--navigation-height);
      padding-left: 0;
    }
  }
}
</style>
