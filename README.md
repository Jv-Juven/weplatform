# weplatform

> 基于校园的微平台

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 配置过程：
----
#### 安装 *vue-router*
> 参考文档 [vue-router的配置](https://router.vuejs.org/zh-cn/)

#### 配置 *autoprefixer*
> 在目录文件`/build/webpack.base.config.js`修改：
```
vue: {
  loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions'] // 增加ios系统和安卓系统的版本支持
    })
  ]
}
```
为：
```
vue: {
  loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ios >= 8', 'android >= 4.0'] // 增加ios系统和安卓系统的版本支持
    })
  ]
}
```

#### 手机屏幕尺寸适配方案
> #### 安装`px2rem-loader`
```
npm install px2rem-loader -D
```
修改`/build/utils.js`中的配置为：
```
return {
  css: generateLoaders(['css']),
  postcss: generateLoaders(['css']),
  less: generateLoaders(['css', 'less', 'px2rem']),
  sass: generateLoaders(['css', 'sass?indentedSyntax']),
  scss: generateLoaders(['css', 'sass']),
  stylus: generateLoaders(['css', 'stylus']),
  styl: generateLoaders(['css', 'stylus'])
}
```

> #### 安装`lib-flexible`
```
npm install lib-flexible -D
```
在`/src/main.js`引入`lib-flexible`:
```
import Flexible from "lib-flexible"
```
