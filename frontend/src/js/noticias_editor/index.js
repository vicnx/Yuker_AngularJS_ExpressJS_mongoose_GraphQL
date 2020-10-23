import angular from 'angular';
console.log("index.js Noticias Editor");
// Create the module where our functionality can attach to
let noticias_editorModule = angular.module('app.noticias_editor', []);

// Include our UI-Router config settings
import Noticias_EditorConfig from './noticias_editor.config';
noticias_editorModule.config(Noticias_EditorConfig);

// Controllers
import Noticias_EditorCtrl from './noticias_editor.controller';
noticias_editorModule.controller('Noticias_EditorCtrl', Noticias_EditorCtrl);


export default noticias_editorModule;
