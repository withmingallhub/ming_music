module.exports = {
    devServer:{
        proxy:{ 
            '/api' : {
                target : 'http://116.62.44.85:3000',
                changeOrigin : true
            },
        }
    }
}