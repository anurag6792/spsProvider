app.controller('ViewapprovedCtrl',['$scope','$stateParams','localStorageService','userAuth','$ionicLoading',function($scope,$stateParams,localStorageService,userAuth,$ionicLoading){
    $scope.userId =  localStorageService.get('userID'); // get userid from the local storage
    $scope.jobreqid = $stateParams.JobRequestId; //get jobid from the state params
    $scope.approvedjobserviceDetails = {}; 
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
                $scope.approvedjobserviceDetails = response.description; // storing job details in jobrequestDetails
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