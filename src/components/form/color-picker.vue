<script>
import { colorList } from '@/store/default-data'
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
      colorList: colorList.slice(),
      open: false,
    }
  },
  props: {
    value: {
      default: `#000`,
      type: String,
    },
  },
  methods: {
    toggle() {
      globalEvents.$emit(``)
      this.open = !this.open
    },
    close() {
      this.open = false
    },
    setColor(color) {
      this.$emit('input', color)
      this.close()
    },
  },
}
</script>

<template lang="pug">
.foobarz-color-picker
  .foobarz-color-picker__bucket(
    @click="toggle"
    :value="value"
    :style="{background: value}"
  )
  ul.foobarz-color-picker__list(v-if="open")
    li.foobarz-color-picker__color(
      v-for="color in colorList"
      :key="color"
      @click="setColor(color)"
    )
      .foobarz-color-picker__bucket(:style="{background: color}")
</template>

<style lang="scss" scoped>
.foobarz-color-picker {
  position: relative;

  &__bucket {
    height: 2rem;
    width: 2rem;
    border-radius: 2rem;
    background: black;
    border: 1px solid white;
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
  }
}
</style>
