var app = angular.module('SPSProvider', ['ionic','ngMessages','LocalStorageModule']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('login',{
        url:'/login',
        templateUrl:'templates/login.html'
    })
    .state('app',{
        cache: false,
        url: '/app',
        abstract : true,
        templateUrl:'templates/menu.html',
    })
    .state('app.dashboard',{
        url: '/dashboard',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/dashboard.html"
        }
      }
    });
    $urlRouterProvider.otherwise('/login');
}]);
//Restricting the user to login page if the user is not logged in
app.run(['$rootScope', 'userAuth', '$state',function ($rootScope, userAuth, $state) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name !== 'login' && !userAuth.isLoggedIn()) {
          event.preventDefault();
          $state.go('login');
        }
      });
    }]);
