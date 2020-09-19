import angular from 'angular';
console.log("index.js del yukss")
// Create the module where our functionality can attach to
let yuksModule = angular.module('app.yuks', []);

// Include our UI-Router config settings
import YuksConfig from './yuks.config';
yuksModule.config(YuksConfig);

console.log("index.js del yuks despues del config")
// Controllers
import DetailYukCtrl from './detailyuk.controller';
yuksModule.controller('DetailYukCtrl', DetailYukCtrl);

import ListYuks from './yuks.controller';
yuksModule.controller('ListYuks', ListYuks);

// import YuksActions from './yuks-actions.component';
// yuksModule.component('yuksActions', YuksActions);

// import Comment from './comment.component';
// yuksModule.component('comment', Comment);


export default yuksModule;
