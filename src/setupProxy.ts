const proxy = require('http-proxy-middleware');

module.exports = function(app: { use: (arg0: any) => void }) {

  app.use(proxy('/api3', 
    {
        "target": "https://api.uomg.com/api/qq.info",
        "changeOrigin": true,
        "pathRewrite":{"^/api3":""},
        "secure": true
    }))
}