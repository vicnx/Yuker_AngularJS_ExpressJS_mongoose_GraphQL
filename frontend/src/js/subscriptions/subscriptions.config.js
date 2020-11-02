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
}).state('app.buysubscriptions', {
  url: '/subscriptions/buy',
  controller: 'BuysubscriptionsCtrl',
  controllerAs: '$ctrl',
  templateUrl: 'subscriptions/buysubscriptions.html',
  title: 'Buy subscriptions'
});
  
};

export default SubscriptionsConfig;
