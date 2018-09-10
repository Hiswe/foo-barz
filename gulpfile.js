'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

////////
// ICONS
////////

const materialName = /(?:outline|baseline)-([^\d]*)-[\d]+px/
const icons = () => {
  return gulp
    .src(`./src/assets-source/icons/*.svg`)
    .pipe(
      $.svgmin(file => {
        const { relative } = file
        const prefix = path.basename(relative, path.extname(relative))
        return {
          js2svg: {
            pretty: true,
          },
          plugins: [
            { removeViewBox: false },
            { removeDoctype: true },
            { removeXMLProcInst: true },
            { removeTitle: true },
            { removeDesc: { removeAny: true } },
            { convertTransform: {} },
            // this prevent duplicated IDs when bundled in the same file
            { cleanupIDs: { prefix: `${prefix}-` } },
          ],
        }
      }),
    )
    .pipe(
      $.cheerio({
        run: $ => {
          $(`#Bounding_Boxes`).remove()
          $(`path[fill=none]`).remove()
          $(`rect[fill=none]`).remove()
          $(`rect[style="fill:none;"]`).remove()

          const $clipPath = $(`clipPath`)
          let $defs = $(`defs`)
          const hasClipPath = $clipPath.length > 0
          const hasDefs = $defs.length > 0
          if (!hasClipPath) return
          if (!hasDefs) {
            $defs = $(`<defs></defs>`)
            $defs.prependTo(`svg`)
          }
          function copyToDefs(i, el) {
            const $el = $(el)
            const $clone = $el.clone()
            $clone.appendTo($defs)
            $el.remove()
          }
          if (hasClipPath) $clipPath.each(copyToDefs)
        },
        parserOptions: {
          xmlMode: true,
        },
      }),
    )

    .pipe(
      $.rename(path => {
        const { basename } = path
        const isMaterialIcon = materialName.test(basename)
        if (!isMaterialIcon) return
        path.basename = materialName.exec(basename)[1].replace(/_/g, `-`)
      }),
    )
    .pipe(
      $.svgSymbols({
        svgAttrs: {
          class: `icon`,
          xmlns: false,
        },
        class: `.icon--%f`,
        templates: [`default-demo`, `default-vue`],
      }),
    )
    .pipe($.if(/[.]vue$/, $.rename(`SvgIcons.vue`)))
    .pipe($.if(/[.]vue$/, gulp.dest(`src/components/ui`)))
    .pipe($.if(/[.]html$/, gulp.dest(`.`)))
}
icons.description = `build SVG icons`
exports[`build:icons`] = icons
