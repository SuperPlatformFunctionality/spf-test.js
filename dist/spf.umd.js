(function(e,t){typeof exports=="object"&&typeof module<"u"?module.exports=t(require("web3"),require("@polkadot/api")):typeof define=="function"&&define.amd?define(["web3","@polkadot/api"],t):(e=typeof globalThis<"u"?globalThis:e||self,e.spf=t(e.web3,e["@polkadot/api"]))})(this,function(e,t){"use strict";return{Web3:(i=>i&&typeof i=="object"&&"default"in i?i:{default:i})(e).default,Polkadot:t.ApiPromise}});