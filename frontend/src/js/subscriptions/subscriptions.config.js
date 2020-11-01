function SubscriptionsConfig($stateProvider) {
  'ngInject';
console.log("subscriptions.config")
$stateProvider
.state('app.subscriptions', {
  url: '/subscriptions',
  controller: 'SubscriptionsCtrl',
  controllerAs: '$ctrl',
  templateUrl: 'subscriptions/subscriptions.html',
  title: 'subscriptions'
});
  
};

export default SubscriptionsConfig;
