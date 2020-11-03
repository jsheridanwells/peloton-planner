import livereload from 'livereload';
import * as connectLiveReload from 'connect-livereload';

export function initLiveReload(dir) {
   const server = livereload.createServer() ;
   server.watch(dir);
}

export function connectLiveReload (app) {
   app.use(connectLiveReload);
}
