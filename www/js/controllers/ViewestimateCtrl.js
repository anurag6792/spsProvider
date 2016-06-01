app.controller('ViewestimateCtrl',['$scope','$stateParams','localStorageService','userAuth','$ionicLoading','$ionicModal','$ionicPopup','$state',function($scope,$stateParams,localStorageService,userAuth,$ionicLoading,$ionicModal,$ionicPopup,$state){
    
    
    $scope.userId =  localStorageService.get('userID'); // get userid from the local storage
    $scope.jobreqid = $stateParams.JobRequestId; //get jobid from the state params
    $scope.jobestimateDetails = {}; 
    $scope.addressDetails = {};
    $scope.show = function() {
                    $ionicLoading.show({
                      template: '<ion-spinner icon="lines"></ion-spinner>'
                    });
                  };
    
    $scope.hide = function(){
                     $ionicLoading.hide();
                  };
    
    var viewjobestimate = userAuth.viewsinglesentjobestimates($scope.jobreqid);
    
    $scope.show();
    viewjobestimate.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.jobestimateDetails = response.description; // storing job details in jobrequestDetails
                console.log('In ViewserviceCtrl : view requests successful');
                
                }
             else if(response.success == "false") {
                $scope.hide(); 
                console.log('In ViewserviceCtrl : view requests unsuccessful'); 
                }
             else {
                $scope.hide(); 
                console.log('In ViewserviceCtrl : view requests unsuccessful');  
                 
             }
         
        });
}]);