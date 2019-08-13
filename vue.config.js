module.exports = {
    devServer:{
        proxy:{ 
            '/api' : {
                target : 'http://192.168.3.98:8080',
                changeOrigin : true
            },
        }
    }
}