import angular from 'angular';
console.log("app.js")
// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './layout';
import './components';
import './home';
import './profile';
import './article';
import './yuks';
import './noticias';
import './services';
import './auth';
import './settings';
import './yuk_editor';
import './editor';



// Create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.profile',
  'app.article',
  'app.yuks',
  'app.noticias',
  // 'app.listaryuks',
  'app.services',
  'app.auth',
  'app.settings',
  'app.yuk_editor',
  'app.editor',

];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
