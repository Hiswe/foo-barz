<script>
const SVG_LIB = { 
  "add": {
    id: `add`,
    class: [
      `icon`,
      `icon--add`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M22 10h4v28h-4z"/> <path d="M38 26v-4H10v4h28z"/> `,
  },
  "bar-32": {
    id: `bar-32`,
    class: [
      `icon`,
      `icon--bar-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: `<defs><clipPath id="bar-32-a"> <path d="M0 0h32v32H0z"/> </clipPath></defs> <g clip-path="url(#bar-32-a)"> <path d="M10 16H7v3h3v1H7v3h3v1H5v-1h1v-7H5v-1h5v1zm0 4h1v3h-1v-3zm0-4h1v3h-1v-3zM26 16h-3v3h3v1h-3v4h-2v-1h1v-7h-1v-1h5v1zm0 4h1v4h-1v-4zm0-4h1v3h-1v-3zM13 19v-3h1v3h4v-3h1v8h-1v-4h-4v4h-1v-4-1zm1-4h4v1h-4v-1zM29 11h1v17h-1zM11 11h10v1H11zM6 10h2V8H6v2zm2-8H6v3H4V2h2V0h2v2zm-5 8h1V8h2V5h2V2h2v3H8v3h2v2h1v1H3v-1zM24 10h2V8h-2v2zm2-8h-2v3h-2V2h2V0h2v2zm-5 8h1V8h2V5h2V2h2v3h-2v3h2v2h1v1h-8v-1z"/> <path d="M1 12h1v-1h1v17h8v1h10v-1h8v1h-1v1h-7-1v1H10v-1H2v-1H1V12zm19 18zm1-1z"/> <path d="M12 23h2v1h-2zM18 23h2v1h-2zM26 23h2v1h-2z"/> </g> `,
  },
  "beer-glass": {
    id: `beer-glass`,
    class: [
      `icon`,
      `icon--beer-glass`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M14 44h18v2H14zM12 18h6v26h-6zM20 22h6v16h-6zM28 18h6v26h-6zM18 18h10v4H18zM18 38h10v6H18zM34 20h6v4h-6z"/> <path d="M38 22h4v14h-4zM36 36h4v4h-4z"/> <path d="M34 38h4v4h-4z"/> <path d="M12 12h2v2h-2zM26 16h2v2h-2zM24 12h2v4h-2zM14 10h10v2H14zM10 14h2v4h-2zM24 8h2v2h-2zM34 8h2v2h-2zM26 6h8v2h-8zM36 10h2v6h-2zM34 16h2v2h-2zM16 2h2v2h-2zM10 6h2v2h-2zM36 2h2v2h-2zM20 6h2v2h-2z" class="icon-secondary-color"/> `,
  },
  "beer": {
    id: `beer`,
    class: [
      `icon`,
      `icon--beer`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M16 16h16v6H16z"/> <path d="M18 2h12v4H18z" class="icon-secondary-color"/> <path d="M20 8h8v2h-8zM20 14h8v4h-8zM12 18h4v6h-4zM32 18h4v6h-4z"/> <path d="M20 0h8v4h-8z" class="icon-secondary-color"/> <path d="M12 44h24v4H12z"/> <path d="M18 24h12v18H18z" class="icon-secondary-color"/> <path d="M16 26h16v14H16z" class="icon-secondary-color"/> <path d="M10 30h28v6H10zM20 10h8v4h-8z" class="icon-secondary-color"/> <path d="M10 38h4v8h-4zM34 38h4v8h-4zM34 22h4v6h-4zM10 22h4v6h-4z"/> <path d="M12 42h4v4h-4zM32 42h4v4h-4zM14 18h20v4H14z"/> `,
  },
  "bucket": {
    id: `bucket`,
    class: [
      `icon`,
      `icon--bucket`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M12 32h24v14H12z"/> <path d="M8 20h32v22H8zM4 18h4v14H4z"/> <path d="M4 10h2v18H4zM42 10h2v18h-2z"/> <path d="M40 18h4v14h-4z"/> <path d="M10 10h4v8h-4zM16 10h2v4h-2z" class="icon-secondary-color"/> <path d="M8 12h10v4H8zM34 10h4v8h-4zM20 2h6v16h-6z" class="icon-secondary-color"/> <path d="M20 8h10v8H20z" class="icon-secondary-color"/> <path d="M14 14h20v4H14z" class="icon-secondary-color"/> <path d="M18 14h2v4h-2z" class="icon-secondary-color"/> <path d="M28 4h6v2h-6zM34 6h6v2h-6zM14 4h4v2h-4zM8 6h6v2H8zM6 8h2v2H6zM40 8h2v2h-2zM4 20h40v12H4z"/> <path d="M30 12h10v4H30z" class="icon-secondary-color"/> `,
  },
  "close": {
    id: `close`,
    class: [
      `icon`,
      `icon--close`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M22 22h4v4h-4zM26 18h4v4h-4zM10 34h4v4h-4zM14 14v-4h-4v4h4zM30 30v-4h-4v4h4zM30 14h4v4h-4zM14 30h4v4h-4zM18 18v-4h-4v4h4zM34 34v-4h-4v4h4zM34 10h4v4h-4zM18 26h4v4h-4zM22 22v-4h-4v4h4zM38 38v-4h-4v4h4z"/> `,
  },
  "delete-forever-32": {
    id: `delete-forever-32`,
    class: [
      `icon`,
      `icon--delete-forever-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: `<defs><clipPath id="delete-forever-32-a"> <path d="M0 0h32v32H0z"/> </clipPath></defs> <g clip-path="url(#delete-forever-32-a)"> <path d="M28 10v18h-2V10H6v18H4V8h24v2zM2 4h6V2h4V0h8v2h4v2h4.667v2H2V4zM22.667 30v2H9.333v-2h13.334zM26 28v2H6v-2h20z"/> <path d="M15 18h2v2h-2zM17 16h2v2h-2zM17 20h2v2h-2zM19 14h2v2h-2zM19 22h2v2h-2zM13 16h2v2h-2zM13 20h2v2h-2zM11 14h2v2h-2zM11 22h2v2h-2zM9 12h2v2H9zM9 24h2v2H9zM21 12h2v2h-2zM21 24h2v2h-2z"/> </g> `,
  },
  "edit-32": {
    id: `edit-32`,
    class: [
      `icon`,
      `icon--edit-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M5 20h2v2H5zM11 26h2v2h-2zM7 18h2v2H7zM13 24h2v2h-2zM9 16h2v2H9zM15 22h2v2h-2zM11 14h2v2h-2zM17 20h2v2h-2zM13 12h2v2h-2zM19 18h2v2h-2zM3 22h2v2h2v2h2v2h2v2H3v-8zM23 2h2v2h2v2h2v2h2v2h-2v2h-2v-2h-2V8h-2V6h-2V4h2V2zM15 10h2V8h2v2h2v2h2v2h2v2h-2v2h-2v-2h-2v-2h-2v-2h-2v-2zM19 6h2v2h-2z"/> <path d="M21 8h2v2h-2zM23 10h2v2h-2zM25 12h2v2h-2z"/> `,
  },
  "food": {
    id: `food`,
    class: [
      `icon`,
      `icon--food`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M4 42h28v2H4zM4 30h28v4H4z"/> <path d="M6 26h24v6H6z"/> <path d="M8 24h20v4H8zM34 18h8v27.998h-8z"/> <path d="M32 14h12v14H32z"/> <path d="M30 14h4v10h-4z"/> <path d="M28 14h4v8h-4z"/> <path d="M24 14h6v6h-6z"/> <path d="M22 14h4v4h-4z"/> <path d="M32 2h4v10h-4z" class="icon-secondary-color"/> <path d="M10 22h16v4H10zM6 42h24v3.998H6z"/> <path d="M4 36h28v4H4z" class="icon-secondary-color"/> `,
  },
  "hangout-32": {
    id: `hangout-32`,
    class: [
      `icon`,
      `icon--hangout-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M10 10h14v2H10zM28 14h2v8h-2zM6 2h2v10H6z"/> <path d="M2 6h10v2H2zM22 14h8v2h-8zM22 22h6v2h-6z"/> <path d="M20 10h4v18h-4zM16 12h2v18h-2z"/> <path d="M10 26h14v2H10zM11 12h12v4H11z"/> <path d="M10 10h4v18h-4z"/> <path d="M12 26h10v4H12z"/> `,
  },
  "history-32": {
    id: `history-32`,
    class: [
      `icon`,
      `icon--history-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M28 2h2v22h-2zM2 2h2v24H2z"/> <path d="M2 2h28v2H2zM6 6h2v2H6zM6 10h2v2H6zM6 14h2v2H6zM6 18h2v2H6zM10 6h14v2H10zM10 10h14v2H10zM10 14h14v2H10zM10 18h14v2H10zM6 28h2v2H6z"/> <path d="M6 28h2v2H6z"/> <path d="M6 28h2v2H6zM14 28h2v2h-2z"/> <path d="M14 28h2v2h-2z"/> <path d="M14 28h2v2h-2zM22 28h2v2h-2z"/> <path d="M22 28h2v2h-2z"/> <path d="M22 28h2v2h-2zM4 26h2v2H4z"/> <path d="M4 26h2v2H4z"/> <path d="M4 26h2v2H4zM12 26h2v2h-2z"/> <path d="M12 26h2v2h-2z"/> <path d="M12 26h2v2h-2zM20 26h2v2h-2z"/> <path d="M20 26h2v2h-2z"/> <path d="M20 26h2v2h-2zM8 26h2v2H8zM16 26h2v2h-2zM24 26h2v2h-2zM10 24h2v2h-2z"/> <path d="M10 24h2v2h-2zM18 24h2v2h-2z"/> <path d="M18 24h2v2h-2zM26 24h2v2h-2z"/> `,
  },
  "info-32": {
    id: `info-32`,
    class: [
      `icon`,
      `icon--info-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M14 14h4v10h-4zM14 8h4v4h-4z"/> <path d="M14 20h4v4h-4zM12 2h8v2h-8zM12 28h8v2h-8zM4 8h2v4H4zM4 20h2v4H4zM26 8h2v4h-2zM26 20h2v4h-2zM6 6h2v2H6zM6 24h2v2H6zM24 6h2v2h-2zM24 24h2v2h-2zM28 12h2v8h-2zM2 12h2v8H2zM8 4h4v2H8zM8 26h4v2H8zM20 4h4v2h-4zM20 26h4v2h-4z"/> `,
  },
  "person-add-32": {
    id: `person-add-32`,
    class: [
      `icon`,
      `icon--person-add-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M12 8h2V6h2V4h6v2h2v2h2v6h-2v2h-2v2h-6v-2h-2v-2h-2V8zM8 26h2v-2h2v-2h4v-2h5.333v2h4v2H28v2h2v2H8v-2zM2 16h4v-4h2v4h4v2H8v4H6v-4H2v-2z"/> `,
  },
  "person": {
    id: `person`,
    class: [
      `icon`,
      `icon--person`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M16 14h16v4H16z"/> <path d="M26 24V8h-4v16h4z"/> <path d="M30 22V10H18v12h12zM40 40v-4H8v4h32z"/> <path d="M38 38v-6H10v6h28z"/> <path d="M34 34v-4H14v4h20z"/> <path d="M28 32v-4h-8v4h8z"/> `,
  },
  "promotion": {
    id: `promotion`,
    class: [
      `icon`,
      `icon--promotion`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M2 14h44v8H2z"/> <path d="M4 12h40v12H4zM6 26h14v18H6zM28 26h14v18H28z"/> <path d="M8 26h12v20H8zM28 26h10v20H28z"/> <path d="M22 26h4v20h-4zM20 4h8v8h-8zM32 2h8v2h-8zM40 4h2v4h-2zM36 8h4v2h-4zM32 10h4v2h-4z" class="icon-secondary-color"/> <path d="M18 8h12v2H18zM16 4h2v4h-2zM30 4h2v4h-2zM8 2h8v2H8zM6 4h2v4H6zM8 8h4v2H8zM12 10h4v2h-4zM22 2h4v4h-4z" class="icon-secondary-color"/> `,
  },
  "save-32": {
    id: `save-32`,
    class: [
      `icon`,
      `icon--save-32`,
    ],
    preserveAspectRatio: ``,
    width: {size: 32, unit: `px`},
    height: {size: 32, unit: `px`},
    'viewBox': `0 0 32 32`,
    content: ` <path d="M4 3h17v2H4zM4 28h23v2H4zM2 5h2v23H2zM27 11h2v17h-2zM6 8h12v5H6zM15 16h2v8h-2z"/> <path d="M20 21v-2h-8v2h8z"/> <path d="M13 17h6v6h-6zM21 5h2v2h-2zM23 7h2v2h-2zM25 9h2v2h-2z"/> `,
  },
  "water": {
    id: `water`,
    class: [
      `icon`,
      `icon--water`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: `<defs><clipPath id="water-a"> <path d="M0 0h48v48H0z"/> </clipPath></defs> <g clip-path="url(#water-a)"> <path d="M18 2h12v4H18z" class="icon-secondary-color"/> <path d="M20 6h2v8h-2zM16 14h4v2h-4zM14 16h2v2h-2zM12 18h2v2h-2zM28 14h4v2h-4zM32 16h2v2h-2zM34 18h2v2h-2zM26 6h2v8h-2z"/> <path d="M20 0h8v2h-8z" class="icon-secondary-color"/> <path d="M12 46h24v2H12z"/> <path d="M18 26h12v14H18z" class="icon-secondary-color"/> <path d="M32 38V28H16v10h16z" class="icon-secondary-color"/> <path d="M10 20h2v26h-2zM36 20h2v26h-2z"/> </g> `,
  },
  "whisky": {
    id: `whisky`,
    class: [
      `icon`,
      `icon--whisky`,
    ],
    preserveAspectRatio: ``,
    width: {size: 48, unit: `px`},
    height: {size: 48, unit: `px`},
    'viewBox': `0 0 48 48`,
    content: ` <path d="M6 28h36v8H6z" class="icon-secondary-color"/> <path d="M6 20h36v4H6z"/> <path d="M8 18h32v6H8z"/> <path d="M14 16h20v4H14zM18 4h12v6H18z"/> <path d="M20 12h8v10h-8zM20 2h8v4h-8zM10 40h28v6H10zM6 38h4v4H6zM38 38h4v4h-4z"/> <path d="M8 40h32v4H8zM12 22h24v4H12z"/> <path d="M12 32h24v6H12zM6 26h4v2H6zM38 26h4v2h-4z" class="icon-secondary-color"/> `,
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