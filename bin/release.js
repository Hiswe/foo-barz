'use strict'

const shell = require('shelljs')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const pkg = require(`../package.json`)
const BRANCH = `firebase`

if (!shell.which(`git`)) {
  shell.echo(`Sorry, this script requires git`)
  shell.exit(1)
}
if (!shell.which(`yarn`)) {
  shell.echo(`Sorry, this script requires yarn`)
  shell.exit(1)
}

initRelease().catch(error => {
  shell.echo(`errored during release`)
  shell.echo(error)
  shell.exit(1)
})

async function initRelease() {
  ////////
  // BUMP CONFIGURATION
  ////////

  const params = await inquirer.prompt([
    {
      type: `list`,
      name: `skipBuild`,
      message: `skip build`,
      default: 1,
      choices: [{ name: `yes`, value: true }, { name: `no`, value: false }],
    },
    {
      type: `list`,
      name: `skipPushReleaseBranch`,
      message: `skip pushing git “release” branch?`,
      default: 1,
      choices: [{ name: `yes`, value: true }, { name: `no`, value: false }],
    },
    {
      type: `list`,
      name: `bump`,
      message: `bump for release? (this will also commit a git tag)`,
      default: 0,
      choices: [{ name: `yes`, value: true }, { name: `no`, value: false }],
      when: data => !data.skipPushReleaseBranch,
    },
    {
      type: `list`,
      name: `bumpType`,
      message: `bump type? (actual is ${pkg.version})`,
      when: data => data.bump,
      default: 0,
      choices: [
        { name: `patch`, value: `patch` },
        { name: `minor`, value: `minor` },
        { name: `major`, value: `major` },
        { name: `custom`, value: `custom` },
      ],
    },
    {
      name: `version`,
      message: `please specify the custom version? (actual is ${pkg.version})`,
      when: data => data.bumpType === `custom`,
      validate: value => /\d+\.\d+\.\d+/.test(value),
    },
    {
      type: `confirm`,
      name: `confirmVersion`,
      when: data => data.bump,
      message: data => {
        return `do you confirm version “${data.version || data.bumpType}”?`
      },
    },
  ])

  if (params.bump && !params.confirmVersion) {
    shell.echo(`canceling bumping & release`)
    shell.exit(0)
  }

  let VERSION = false
  if (params.bump) {
    shell.echo(`bumping…`)
    shell.exec(`yarn bump --to=${params.version || params.bumpType}`)
    shell.echo(`✅ bumping done!`)
    const packageJSON = fs.readFileSync(path.join(__dirname, `../package.json`))
    VERSION = JSON.parse(packageJSON).version
  }

  ////////
  // BUILD
  ////////

  if (!params.skipBuild) {
    shell.echo(`building…`)
    shell.exec(`yarn build`, { silent: true })
    shell.echo(`✅ building done!`)
  } else {
    shell.echo(`⚠️  skip build`)
  }

  ////////
  // RELEASE BRANCH
  ////////

  //----- BRANCH CONTROL

  const currentBranch = shell.exec(`git branch`, { silent: true }).grep(/^\*/)
  const branchName = currentBranch.stdout.replace(/[\*\n\s]/g, ``)

  if (branchName !== `master`) {
    shell.echo(`️️⛔ Sorry, you need to be on the master branch`)
    shell.exit(1)
  }

  //----- INITIALIZING FOLDERS & HELPERS

  const originalDir = shell.pwd()
  const copyDir = shell.exec(`mktemp -d /tmp/spark.XXX`, { silent: true })
  // stdout come with a line break. Remove it for better path joining
  const originalDirPath = originalDir.stdout.replace(`\n`, ``)
  const copyDirPath = copyDir.stdout.replace(`\n`, ``)

  const teardown = () => {
    shell.cd(originalDir)
    shell.rm(`-Rf`, copyDir)
  }

  shell.echo(`temp dir will be created at: ${copyDirPath}`)

  //-----  COPYING FILES TO TMP

  shell.echo(`initalizing ${BRANCH}…`)
  shell.echo(`…copying git files…`)
  shell.cp(`-r`, `./.git/.`, path.join(copyDirPath, `/.git`))

  shell.echo(`…switching to temp folder…`)
  shell.cd(copyDir)

  shell.echo(`…checking out “${BRANCH}” branch`)
  // keep all versions
  const gitCheckout = shell.exec(`git checkout ${BRANCH}`, {
    silent: true,
  })

  if (gitCheckout.code !== 0) {
    shell.echo(`🚫 Unable to checkout`)
    shell.echo(gitCheckout.stderr)
    teardown()
    shell.exit(1)
  }

  const gitPull = shell.exec(`git pull origin ${BRANCH}`, {
    silent: true,
  })

  if (gitPull.code !== 0) {
    shell.echo(`🚫 Unable to pull`)
    shell.echo(gitPull.stderr)
    teardown()
    shell.exit(1)
  }
  // make sure to have only the last updated files
  shell.rm(`-Rf`, `**/*`)
  shell.echo(`✅ initalizing ${BRANCH} done`)
  shell.echo(
    `…copying new files to release branch…, ${path.join(
      originalDirPath,
      `/dist/*`,
    )}`,
  )
  const copyBuildToRelease = shell.cp(
    `-Rf`,
    path.join(originalDirPath, `/dist/*`),
    copyDir,
  )
  if (copyBuildToRelease.code !== 0) {
    shell.echo(`🚫 Unable to checkout`)
    shell.echo(copyBuildToRelease.stderr)
    teardown()
    shell.exit(1)
  }

  //----- ADDING & PUSHING THE FILES

  if (!params.skipPushReleaseBranch) {
    shell.exec(`git add .`, { silent: true })
    const branchReleaseMessage = params.bump
      ? ` – version ${VERSION}`
      : ` – unversioned`
    shell.exec(`git commit -m "RELEASE${branchReleaseMessage}"`, {
      silent: true,
    })

    shell.echo(`…pushing to “${BRANCH}” branch…`)
    const ghPagePush = shell.exec(`git push origin ${BRANCH}`, { silent: true })
    if (ghPagePush.code !== 0) {
      shell.echo(`❌ Error: Git push failed`)
      shell.echo(ghPagePush.stderr)
      teardown()
      shell.exit(1)
    } else {
      shell.echo(`➡️  push done`)
    }
  } else {
    shell.echo(`⚠️  skip pushing release branch`)
  }

  //----- TAGGING THE VERSION

  if (params.bump) {
    shell.echo(`tagging version…`)
    shell.exec(`git tag v${VERSION}`, { silent: true })
    const tagPush = shell.exec(`git push --tags`, { silent: true })
    if (tagPush.code !== 0) {
      shell.echo(`❌ Error: Git tag push failed`)
      shell.echo(tagPush.stderr)
      teardown()
      shell.exit(1)
    } else {
      shell.echo(`🏷  tagging done`)
    }
  } else {
    shell.echo(`⚠️  skip bumping`)
  }

  ////////
  // FIREBASE RELEASE
  ////////

  shell.echo(`deploying to firebase…`)
  console.log(originalDirPath)
  shell.cd(originalDir)
  const copyToDistFolder = shell.cp(
    `-Rf`,
    path.join(copyDirPath, `/*`),
    path.join(originalDirPath, `/dist`),
  )
  if (copyToDistFolder.code !== 0) {
    shell.echo(`❌ Error: Copy to dist failed`)
    shell.echo(copyToDistFolder.stderr)
    teardown()
    shell.exit(1)
  }

  const removeGitFolderFromDist = shell.rm(
    `-Rf`,
    path.join(originalDirPath, `/dist/.git`),
  )
  if (removeGitFolderFromDist.code !== 0) {
    shell.echo(`❌ Error: removing .git failed`)
    shell.echo(removeGitFolderFromDist.stderr)
    teardown()
    shell.exit(1)
  }

  const firebaseDeploy = shell.exec(`yarn firebase deploy`, { silent: true })
  if (firebaseDeploy.code !== 0) {
    shell.echo(`❌ Unable to deploy to firebase!!`)
    shell.echo(firebaseDeploy.stderr)
    shell.exit(1)
  }
  shell.echo(`️️❇️  deployed!`)
  shell.echo(pkg.homepage)

  //----- TEARDOWN

  teardown()
  shell.exit(0)
}
