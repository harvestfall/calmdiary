module.exports = {
  devServer: {
    proxy: {
      '/api': {// 使用"/api"来代替"http://f.apiplus.c"
        // target: 'http://192.168.0.102:8080', // 源地址
        target: 'http://127.0.0.1:9000', // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login: {
      // page 的入口
      entry: 'src/login.js',
      // 模板来源
      template: 'public/login.html',
      // 在 dist/index.html 的输出
      filename: 'login.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    reg: {
      // page 的入口
      entry: 'src/reg.js',
      // 模板来源
      template: 'public/reg.html',
      // 在 dist/index.html 的输出
      filename: 'reg.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'reg']
    },
    diary: {
      // page 的入口
      entry: 'src/diary.js',
      // 模板来源
      template: 'public/diary.html',
      // 在 dist/index.html 的输出
      filename: 'diary.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'diary']
    },
    lookdiary: {
      // page 的入口
      entry: 'src/lookdiary.js',
      // 模板来源
      template: 'public/lookdiary.html',
      // 在 dist/index.html 的输出
      filename: 'lookdiary.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'lookdiary']
    },
    write: {
      // page 的入口
      entry: 'src/write.js',
      // 模板来源
      template: 'public/write.html',
      // 在 dist/index.html 的输出
      filename: 'write.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'write']
    },
    userdata: {
      // page 的入口
      entry: 'src/userdata.js',
      // 模板来源
      template: 'public/userdata.html',
      // 在 dist/index.html 的输出
      filename: 'userdata.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'userdata']
    },
    file: {
      // page 的入口
      entry: 'src/file.js',
      // 模板来源
      template: 'public/file.html',
      // 在 dist/index.html 的输出
      filename: 'file.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'file']
    },
    BIM: {
      // page 的入口
      entry: 'src/BIM.js',
      // 模板来源
      template: 'public/BIM.html',
      // 在 dist/index.html 的输出
      filename: 'BIM.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'BIM']
    },
    diarymax: {
      // page 的入口
      entry: 'src/diarymax.js',
      // 模板来源
      template: 'public/diarymax.html',
      // 在 dist/index.html 的输出
      filename: 'diarymax.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'diarymax']
    },
    lovediary: {
      // page 的入口
      entry: 'src/lovediary.js',
      // 模板来源
      template: 'public/lovediary.html',
      // 在 dist/index.html 的输出
      filename: 'lovediary.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'lovediary']
    },
    userlove: {
      // page 的入口
      entry: 'src/userlove.js',
      // 模板来源
      template: 'public/userlove.html',
      // 在 dist/index.html 的输出
      filename: 'userlove.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'userlove']
    },
    changuserdata: {
      // page 的入口
      entry: 'src/changuserdata.js',
      // 模板来源
      template: 'public/changuserdata.html',
      // 在 dist/index.html 的输出
      filename: 'changuserdata.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'changuserdata']
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}



