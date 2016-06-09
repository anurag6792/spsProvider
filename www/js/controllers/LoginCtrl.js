app.controller("LoginCtrl",[
    "$scope",
    "userAuth",
    '$state',
    '$ionicPopup',
    '$ionicLoading',
    'localStorageService',
    function($scope,userAuth,$state,$ionicPopup,$ionicLoading,localStorageService){
        
        $scope.show = function() {
                    $ionicLoading.show({
                      template: '<ion-spinner icon="lines"></ion-spinner>'
                    });
                  };
  
        $scope.hide = function(){
                     $ionicLoading.hide();
                  };
        
        
        if(localStorageService.get('logged') && (localStorageService.get('userID') != null)){
        $state.go('app.dashboard');
        }
        else {
        $scope.login = function(user){
        var result = userAuth.login(user.username,user.password);//passing username and password to the login fnc in service
        $scope.show();    
        result.then(function (response) {

                if (response.success == "true" && response.description.RoleId == '4') {
                    $scope.hide();
                    console.log('In LoginCtrl : successful login');
                    $scope.usesId = localStorageService.get('userID'); 
                    $scope.token = localStorageService.get('DeviceToken'); 
                    var sendtoken = userAuth.sendToken($scope.usesId,$scope.token);
                    sendtoken.then(function (response) {
                        console.log(response);
                        if (response.success == "true"){
                            console.log('Device Token sent successfully');
                        } 
                        else if (response.success == "false"){
                            console.log('Device Token was not sent successfully');
                        }
                        else{
                            console.log('Some error was there in sending device token');
                        }
                    });
                    
                    $state.go('app.dashboard'); // redirecting to the dashboard page
                    //userAuth.userInfo(response);
                }
                 else if(response.success == "false") {
                    console.log('In LoginCtrl : unsuccessful login');
                    $scope.hide(); 
                    $scope.showAlert();//showing the alert on unccessful login 
                 }
                else {
                    console.log('In LoginCtrl : unsuccessful login');
                    $scope.hide(); 
                    $scope.showAlert();//showing the alert on unccessful login 
                }
                });
        $scope.showAlert = function() {
                       var alertPopup = $ionicPopup.alert({
                         title: 'Login Failed',
                         template: 'Invalid Username or Password',
                         okText:'OK',
                         okType:'button button-block login-button',
                         onTap: function(e){
                             userAuth.destroyUser();
                             $state.go('login');
                         }   
                       });

                       alertPopup.then(function(res) {
                         console.log('Login failed');
                       });
                     };   

        };
    
        }
}]);