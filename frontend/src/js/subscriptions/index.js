import angular from 'angular';
console.log("index.js del Subscriptions")
// Create the module where our functionality can attach to
let subscriptionsModule = angular.module('app.subscriptions', []);

// Include our UI-Router config settings
import SubscriptionsConfig from './subscriptions.config';
subscriptionsModule.config(SubscriptionsConfig);

// console.log("index.js del noticias despues del config")
// Controllers
// import DetailNoticiaCtrl from './detailnoticia.controller';
// noticiasModule.controller('DetailNoticiaCtrl', DetailNoticiaCtrl);

import SubscriptionsCtrl from './subscriptions.controller';
subscriptionsModule.controller('SubscriptionsCtrl', SubscriptionsCtrl);

// import NoticiasList from 'components/noticias-helpers/noticias-list.component';
// noticiasModule.component('NoticiasList', NoticiasList);

// import NoticiasActions from './noticias-actions.component';
// noticiasModule.component('noticiasActions', NoticiasActions);

// import NoticiasDetailsCtrl from './eventsDetails.controller';
// eventsModule.controller('NoticiasDetailsCtrl', NoticiasDetailsCtrl);

// import Comment from './comment.component';
// noticiasModule.component('comment', Comment);


export default subscriptionsModule;
