'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const args = require('yargs').argv

////////
// BUMP
////////

const bump = () => {
  if (!args.to) {
    console.log(chalk.red(`bump task needs the --to argument`))
    return done()
  }
  const isVersion = /\d+\.\d+\.\d+/.test(args.to)
  return gulp
    .src(`package.json`)
    .pipe($.bump(isVersion ? { version: args.to } : { type: args.to }))
    .pipe(gulp.dest(`.`))
}
bump.description = `bump`
exports[`bump`] = bump

////////
// ICONS
////////

const materialName = /(?:outline|baseline)-([^\d]*)-[\d]+px/
const curvedIcons = () => {
  return gulp
    .src(`./assets-source/icons/*.svg`)
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
          $(`[fill="#e0f"]`)
            .removeAttr(`fill`)
            .addClass(`icon-secondary-color`)

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
    .pipe($.if(/[.]vue$/, $.rename(`svg-icons.vue`)))
    .pipe($.if(/[.]vue$/, gulp.dest(`src/components/ui`)))
    .pipe($.if(/[.]html$/, gulp.dest(`assets-source`)))
}
curvedIcons.description = `build curved SVG icons`

const pixelArtIcons = () => {
  return gulp
    .src(`./assets-source/icons-pixel-art/*.svg`)
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
          $(`[fill="#e0f"]`)
            .removeAttr(`fill`)
            .addClass(`icon-secondary-color`)
          $(`[fill="#ec00ff"]`)
            .removeAttr(`fill`)
            .addClass(`icon-secondary-color`)

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
      $.svgSymbols({
        svgAttrs: {
          class: `icon`,
          xmlns: false,
        },
        class: `.icon--%f`,
        templates: [`default-demo`, `default-vue`],
      }),
    )
    .pipe($.if(/[.]vue$/, $.rename(`svg-icons.vue`)))
    .pipe($.if(/[.]vue$/, gulp.dest(`src/components/ui`)))
    .pipe($.if(/[.]html$/, gulp.dest(`assets-source`)))
}

exports[`build:icons`] = pixelArtIcons
