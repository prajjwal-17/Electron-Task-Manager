import path from 'path'
import {app} from 'electron';
import { isDev } from './util.js';

export function getPreloadPath(){
   return path.join(
    app.getAppPath(),
    isDev()? '.' : '..',
    '/dist-electron/preload.cjs'
   )
}
//this will basically figure out how to use path based on whether it is dev or prod since path change on basis od dev or prod