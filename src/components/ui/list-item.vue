<script>
import { mergeData } from 'vue-functional-data-merge'

// scoped styles aren't passed automatically
// https://github.com/vuejs/vue-loader/issues/1136
// https://github.com/alexsasharegan/vue-functional-data-merge#scoped-styles
/**
 * @param {Vue} parent
 * @returns {VNodeData}
 */
export function getScopedStyleData(parent) {
  let data = { attrs: {} }

  if (parent.$options._scopeId) {
    data.attrs[`${parent.$options._scopeId}`] = ''
  }

  return data
}
export default {
  functional: true,
  render(createElement, context) {
    let { parent, data, children } = context
    let componentData = { class: `list__item` }

    return createElement(
      'li',
      mergeData(data, getScopedStyleData(parent), componentData),
      children,
    )
  },
}
</script>

<style lang="scss" scoped>
.list__item {
  padding: 0.5rem;
  border-bottom: 2px solid var(--c-black);
}
</style>

