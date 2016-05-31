var app = angular.module('SPSProvider', ['ionic','ionic.service.core','ngMessages','LocalStorageModule','angularMoment']);

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
    window.addEventListener('native.keyboardshow', function(){
    document.body.classList.add('keyboard-open');
    });    
  });
});
app.run(function($ionicPlatform,localStorageService) {
  $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
                        var payload = notification.payload;
                        console.log(notification, payload);
                      },    
      "onRegister": function(data) {
                    console.log(data.token);
                    alert(data.token);
                    localStorageService.set('DeviceToken',data.token);
                    }    
    });
 
    push.register(function(token) {
      console.log("My Device token:",token.token);
      alert("My Device token:"+token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });
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
    })
    .state('app.services',{
        url: '/services',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/services.html"
        }
      }
    })
    .state('app.viewservice',{
        url: '/viewservice/:JobRequestId',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/viewservice.html"
        }
      }
    })
    .state('app.estimates',{
        url: '/estimates',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/estimates.html"
        }
      }
    })
    .state('app.profile',{
        url: '/profile',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/userprofile.html"
        }
      }
    })
    .state('app.editprofile',{
        url: '/editprofile',
        cache:false,
        views: {
        'sidemenuContent' :{
          templateUrl: "templates/editprofile.html"
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
// Directive to confirm password for the new user
app.directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    scope: {

      reference: '=validPasswordC'

    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue, $scope) {

        var noMatch = viewValue != scope.reference
        ctrl.$setValidity('noMatch', !noMatch);
        return (noMatch)?noMatch:!noMatch;
      });

      scope.$watch("reference", function(value) {;
        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

      });
    }
  }
});
