/*
MIT License

Copyright (c) 2025 DWTechs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/DWTechs/Winstan-plugin-express-perf.js
*/

import { log } from '@dwtechs/winstan';

function start(req, _res, next) {
    log.info(`Request started on ${req.method}${req.url}`);
    req.perf = Date.now();
    next();
}
function end(req, _res, next) {
    const delta = req.perf ? Date.now() - req.perf : 0;
    log.info(`Request ended on ${req.method}${req.url} in ${delta}ms`);
    next();
}
var winstanPluginExpressPerf = {
    start,
    end,
};

export { winstanPluginExpressPerf as default };
