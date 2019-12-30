"use strict";function generateID(e){let r="";for(;r.length<e;){let e=Math.floor(62*Math.random());r+=e<26?String.fromCharCode(e+97):e<52?String.fromCharCode(e+65-26):(e-52).toString()}return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateID=generateID;
//# sourceMappingURL=id-utilities.js.map
