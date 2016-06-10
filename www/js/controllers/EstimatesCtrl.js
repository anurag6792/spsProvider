app.controller('EstimatesCtrl',['$scope','userAuth','localStorageService','$ionicLoading',function($scope,userAuth,localStorageService,$ionicLoading){
    
    $scope.show = function() {
                    $ionicLoading.show({
                      template: '<ion-spinner icon="lines"></ion-spinner>'
                    });
                  };
    
    $scope.hide = function(){
                     $ionicLoading.hide();
                  };
    
    $scope.userID = localStorageService.get('userID');//adding consumer userID in userID in EstimatesCtrl
    console.log('Added consumer userID  to the RequestCtrl in userID ') ;
    
    $scope.jobestimates = [];
    var viewjobestimates = userAuth.viewallsentjobestimates($scope.userID);
    $scope.show();
    viewjobestimates.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.showEstimate = response.success ;
                $scope.jobestimates = response.description;
                console.log('In EstimatesCtrl : view estimates successful');
                
                }
             else if(response.success == "false") {
                $scope.showEstimate = response.success ; 
                $scope.hide(); 
                console.log('In EstimatesCtrl : view estimates unsuccessful'); 
                }
             else {
                $scope.showEstimate = false ; 
                $scope.hide(); 
                console.log('In EstimatesCtrl : view estimates unsuccessful');  
                 
             }
         
        });
    
}]);