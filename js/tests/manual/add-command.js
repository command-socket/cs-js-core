"use strict";var __awaiter=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function u(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,u)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0});class AddCommand{getName(){return"add"}execute(t,e){return __awaiter(this,void 0,void 0,(function*(){let e=0;for(let n of t)e+=n;return e}))}}exports.AddCommand=AddCommand;
//# sourceMappingURL=add-command.js.map
