// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': 'rgba(31,112,255,1)', // 全局主色
                        'success-color': '#52c41a', // 成功色
                        'warning-color': '#faad14', // 警告色
                        'error-color': '#f5222d', // 错误色
                        'disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
                        'link-color': '#1890ff', // 链接色
                        'font-size-base': '14px', // 主字号
                        'heading-color': 'rgba(0, 0, 0, 0.85)', // 所有标题色
                        'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
                        'text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
                        'border-radius-base': '2px', // 组件/浮层圆角
                        'border-color-base': '#d9d9d9', // 边框色
                        'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    // configureWebpack:{
    //     resolve: {
    //         alias: {
    //           '@@': resolve('static') // 这里采用两个@符号来代替路径的别名，因为一个@符号已经默认被设置src的路径了，为了不影响原有的功能，这里采用两个@字符
    //         }
    //     },
    // },
    runtimeCompiler: true,
    productionSourceMap:false,//打包去掉map文件
};