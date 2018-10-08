<script>
import * as defaultData from '@/store/default-data'
import globalEvents from '@/global-events.js'

export default {
  name: `foobarz-icon-picker`,
  mounted() {
    globalEvents.$on(`picker-open`, this.close)
  },
  beforeDestroy() {
    globalEvents.$off(`picker-open`, this.close)
  },
  data() {
    return {
      iconList: defaultData.icons,
      open: false,
    }
  },
  props: {
    value: {
      default: defaultData.icons[0].name,
      type: String,
    },
  },
  methods: {
    toggle() {
      if (!this.open) globalEvents.$emit(`picker-open`)
      this.open = !this.open
    },
    close() {
      this.open = false
    },
    setIcon(icon) {
      this.$emit('input', icon)
      this.close()
    },
  },
}
</script>

<template lang="pug">
.foobarz-icon-picker
  .foobarz-icon-picker__icon(
    @click="toggle"
    :value="value"
  ): foobarz-icon(:name="value")
  ul.foobarz-icon-picker__list(v-if="open")
    li.foobarz-icon-picker__icon(
      v-for="icon in iconList"
      :key="icon.id"
      @click="setIcon(icon.name)"
    )
      foobarz-icon(:name="icon.name")
</template>

<style lang="scss" scoped>
.foobarz-icon-picker {
  position: relative;

  &__icon {
    height: 2rem;
    width: 2rem;
    border-radius: 2rem;
    background: black;
    border: 1px solid white;

    .icon {
      height: 100%;
      width: 100%;
    }
  }
  &__list {
    background: var(--c-primary-lighter);
    list-style: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
}
</style>
