import angular from 'angular';
console.log("index.js del noticiass")
// Create the module where our functionality can attach to
let noticiasModule = angular.module('app.noticias', []);

// Include our UI-Router config settings
import NoticiasConfig from './noticias.config';
noticiasModule.config(NoticiasConfig);

// console.log("index.js del noticias despues del config")
// Controllers
import DetailNoticiaCtrl from './detailnoticia.controller';
noticiasModule.controller('DetailNoticiaCtrl', DetailNoticiaCtrl);

import NoticiasCtrl from './noticias.controller';
noticiasModule.controller('NoticiasCtrl', NoticiasCtrl);

// import NoticiasList from 'components/noticias-helpers/noticias-list.component';
// noticiasModule.component('NoticiasList', NoticiasList);

// import NoticiasActions from './noticias-actions.component';
// noticiasModule.component('noticiasActions', NoticiasActions);

// import NoticiasDetailsCtrl from './eventsDetails.controller';
// eventsModule.controller('NoticiasDetailsCtrl', NoticiasDetailsCtrl);

// import Comment from './comment.component';
// noticiasModule.component('comment', Comment);


export default noticiasModule;
