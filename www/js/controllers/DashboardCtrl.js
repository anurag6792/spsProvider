app.controller('DashboardCtrl',[
    '$scope',
    'userAuth',
    'localStorageService',
    '$filter',
    '$ionicPopup',
    '$state',
    function( $scope, userAuth, localStorageService,$filter,$ionicPopup,$state){
        $scope.user = {};    
        $scope.userId =  localStorageService.get('userID'); 

        var getuserdetails = userAuth.userDetails($scope.userId);    
        getuserdetails.then(function(response){
            if (response.success == "true") {
                $scope.user = response;
                console.log('Added consumer details to the DashboardCtrl in user') ;
            }
            else{
                userAuth.destroyUser();
                $state.go('login');
            }
        });
    }]);