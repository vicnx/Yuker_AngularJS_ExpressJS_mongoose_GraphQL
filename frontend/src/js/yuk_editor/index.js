import angular from 'angular';
console.log("index.js Yuk_Editor");
// Create the module where our functionality can attach to
let yuk_editorModule = angular.module('app.yuk_editor', []);

// Include our UI-Router config settings
import Yuk_EditorConfig from './yuk_editor.config';
yuk_editorModule.config(Yuk_EditorConfig);

// Controllers
import Yuk_EditorCtrl from './yuk_editor.controller';
yuk_editorModule.controller('Yuk_EditorCtrl', Yuk_EditorCtrl);


export default yuk_editorModule;
