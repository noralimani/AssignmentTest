'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/in-view'
import '@components/image'
import '@utilities/focus-trap'
import moduleInit from '@utilities/module-init'

import VideoLoader from '@components/video/loader'
import Newsletter from '@components/newsletter'

moduleInit.async('[js-hook-modal]', () =>
  import(/* webpackChunkName: "Modal" */ '@components/modal'),
)

// !! Look closely at the examples to know how to use moduleInit + modular approach
// Sync example
// import moduleInit from '@utilities/module-init'
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

// Async example
// import moduleInit from '@utilities/module-init'
// moduleInit.async('[js-hook-module-example]', () => import('@components/example')) // Async

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })
}).catch(() => {})
