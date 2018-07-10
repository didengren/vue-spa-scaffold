const fs = require('fs')
const { resolve } = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
var skeOurputDir
switch (process.env.NODE_ENV) {
  case 'ske_dev':
    skeOurputDir = 'distDev'
    break
  case 'ske_test':
    skeOurputDir = 'distTest'
    break
  case 'ske_prod':
    skeOurputDir = 'dist'
    break
  default:
    break
}

// 读取`skeleton.json`，以`index.html`为模板写入内容
const renderer = createBundleRenderer(resolve(__dirname, './' + skeOurputDir + '/skeleton.json'), {
  template: fs.readFileSync(resolve(__dirname, './index.html'), 'utf-8')
})

// 把上一步模板完成的内容写入（替换）`index.html`
renderer.renderToString({}, (err, html) => {
  if (err) console.log('err', err)
  fs.writeFileSync('index.html', html, 'utf-8')
})
