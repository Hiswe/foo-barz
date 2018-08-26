'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

////////
// ICONS
////////

const materialName = /(?:outline|baseline)-([^\d]*)-[\d]+px/
const icons = () => {
  return (
    gulp
      .src(`./src/assets-source/icons/*.svg`)
      .pipe(
        $.cheerio({
          run: $ => $(`#Bounding_Boxes`).remove(),
          parserOptions: {
            xmlMode: true,
          },
        }),
      )
      // .pipe(
      //   $.svgo({
      //     plugins: [{ removeViewBox: false }],
      //   }),
      // )
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
  )
}
icons.description = `build SVG icons`
exports[`build:icons`] = icons
