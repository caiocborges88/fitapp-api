const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const base=path.resolve(__dirname,'../public');
const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.html':'text/html','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(base,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return;}
    fs.readFile(file,(error,data)=>{
        if(error){res.writeHead(404);res.end('Not found');return;}
        res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
    });
});
if(require.main===module)server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('FitApp local: http://127.0.0.1:4173'));
module.exports=server;
