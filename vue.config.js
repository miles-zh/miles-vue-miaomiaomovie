module.exports = {
    devServer:{  // 设置反向代理
        proxy:{
            '/api2': {
                target: 'http://localhost:3000', // 
                ws:true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': '/api2'  //通过pathRewrite重写地址，将前缀/api转为/
                }


            },
            '/api':{
                target: 'http://39.97.33.178',
                changeOrigin:true
            }
            
        }
    }
}