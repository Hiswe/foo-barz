<script>
const SVG_LIB = { 
  "star": {
    id: `star`,
    class: [
      `icon`,
      `icon--star`,
    ],
    preserveAspectRatio: ``,
    width: {size: 24, unit: `px`},
    height: {size: 24, unit: `px`},
    'viewBox': `0 0 24 24`,
    content: ` <g id="Outline_1_"> <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/> </g> `,
  },
}
const SVG_ATTRS = {
  "xmlns": false
}

export default {
  name: `svg-icon`,
  props: {
    name: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    attrs() {
      if (!SVG_LIB[this.name]) return {} 
      const width = this.icon.width.size * this.scale + this.icon.width.unit
      const height = this.icon.height.size * this.scale + this.icon.height.unit 
      return Object.assign({
        viewBox: this.icon.viewBox,
        preserveAspectRatio: this.icon.preserveAspectRatio ? this.icon.preserveAspectRatio : false,
        width,
        height,
      }, SVG_ATTRS)
    },
    icon() {
      if (!SVG_LIB[this.name]) return {}
      return SVG_LIB[this.name]
    }
  },
  render(createElement) {
    if (!SVG_LIB[this.name]) return null
    return createElement(
      `svg`,
      {
        class: this.icon.class,
        attrs: this.attrs,
        domProps: {
          innerHTML: this.icon.content
        },
      }
    )
  },
}
</script>