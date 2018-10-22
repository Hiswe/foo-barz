<template lang="pug" functional>
ul.list(:class="data.staticClass || ``" v-bind="data.attrs")
  slot
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
