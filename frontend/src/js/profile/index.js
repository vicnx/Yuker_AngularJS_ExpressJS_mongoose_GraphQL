import angular from 'angular';

// Create the module where our functionality can attach to
let profileModule = angular.module('app.profile', []);

// Include our UI-Router config settings
import ProfileConfig from './profile.config';
profileModule.config(ProfileConfig);

// Controllers
import ProfileCtrl from './profile.controller';
profileModule.controller('ProfileCtrl', ProfileCtrl);

import ProfileYuksCtrl from './profile-yuks.controller';
profileModule.controller('ProfileYuksCtrl', ProfileYuksCtrl);


export default profileModule;
