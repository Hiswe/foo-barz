<script>
import * as defaultData from '@/store/default-data'
import globalEvents from '@/global-events.js'

export default {
  name: `foobarz-icon-picker`,
  data() {
    return {
      iconList: defaultData.icons,
    }
  },
  props: {
    value: {
      default: defaultData.icons[0].name,
      type: String,
    },
  },
  methods: {
    setIcon(icon) {
      this.$emit(`input`, icon)
    },
  },
}
</script>

<i18n>
{
  "en": {
    "icon": "icon"
  },
  "fr": {
    "icon": "icône"
  }
}
</i18n>

<template lang="pug">
.foobarz-icon-picker
  ul.foobarz-icon-picker__list
    li.foobarz-icon-picker__icon(
      v-for="icon in iconList"
      :key="icon.id"
      @click="setIcon(icon.name)"
      :class="icon.name === value ? `foobarz-icon-picker__icon--selected` : ``"
    )
      foobarz-icon(:name="icon.name")
</template>

<style lang="scss" scoped>
@import './form-mixins';

.foobarz-icon-picker__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.foobarz-icon-picker__icon {
  height: var(--picker-size);
  width: var(--picker-size);
  margin-top: 0.5rem;

  &:first-child {
    margin-top: 0;
  }

  .icon {
    height: 100%;
    width: 100%;
  }
}
.foobarz-icon-picker__icon--selected {
  .icon {
    fill: white;
  }
}
</style>
