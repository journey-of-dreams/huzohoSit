let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");
proxyObj['/ws'] = {
    //设置websocket
    ws: true,
    //自定义后台服务端ip地址
    //target: "",
    //正式环境ip 可做调试时显示数据
    target:"ws://http://61.183.177.10:82",
};
proxyObj['/'] = {
    ws: false,
    //自定义后台服务端ip地址
    //target: "",
    //正式环境ip 可做调试时显示数据
    target: "http://61.183.177.10:82",
    //设置跨域
    changeOrigin: true,
    //设置更改前缀
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 20001,
        proxy: proxyObj
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 1024,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    }

}
