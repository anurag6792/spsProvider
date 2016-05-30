app.controller('ViewserviceCtrl',['$scope','$stateParams','localStorageService','userAuth','$ionicLoading','$ionicModal','$ionicPopup','$state',function($scope,$stateParams,localStorageService,userAuth,$ionicLoading,$ionicModal,$ionicPopup,$state){
    
    // Send estimate Modal    
    $ionicModal.fromTemplateUrl('templates/sendestimateModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

      $scope.opengetlocationModal = function()
      { 
         $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };
    $scope.userId =  localStorageService.get('userID'); // get userid from the local storage
    $scope.jobid = $stateParams.jobID; //get jobid from the state params
    $scope.jobrequestDetails = {}; 
    $scope.addressDetails = {};
    $scope.show = function() {
                    $ionicLoading.show({
                      template: '<ion-spinner icon="lines"></ion-spinner>'
                    });
                  };
    
    $scope.hide = function(){
                     $ionicLoading.hide();
                  };
    var viewjobrequest = userAuth.viewsinglejobrequest($scope.userId,$scope.jobid);
    
    $scope.show();
    viewjobrequest.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.jobrequestDetails = response.description; // storing job details in jobrequestDetails
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
    
    $scope.sendEstimate = function(estimate){
        
        var estimate = userAuth.sendestimates($scope.jobrequestDetails.JobId,$scope.jobrequestDetails.CustomerId,$scope.jobrequestDetails.ServiceProviderId,estimate.amount);
        $scope.show();
         estimate.then(function (response) {
             
             if (response.success == "true") {
                 $scope.hide();
                 $scope.successAlert();
                 console.log('Estimate was sent successfully');
             }
             else if(response.success == "false") {
                 $scope.hide();
                 $scope.failedAlert();
                 console.log('Estimate was not sent successfully');
             }
              else {
                  $scope.hide();
                  $scope.failedAlert();
                  console.log('Estimate was not sent successfully');
              }
         });
    };
    
    $scope.successAlert = function() {
                       var alertPopup = $ionicPopup.alert({
                         title: 'Estimate',
                         template: 'Your estimate has been successfully sent',
                         okText:'OK',
                         okType:'button button-block login-button',
                         onTap: function(e){
                            
                             return true;
                         }   
                       });

                       alertPopup.then(function(res) {
                         if(res){
                             $scope.closeModal();
                             $state.go('app.dashboard');
                         }   
//                         console.log('Login failed');
                       });
                     };
    $scope.failedAlert = function() {
                       var alertPopup = $ionicPopup.alert({
                         title: 'Estimate',
                         template: 'Your estimate was not sent due to some error.Please try again after sometimes',
                         okText:'OK',
                         okType:'button button-block login-button',
                         onTap: function(e){
                            
                             return true;
                         }   
                       });

                       alertPopup.then(function(res) {
                         if(res){
                              $scope.closeModal();
                             $state.go('app.dashboard');
                         }   
//                         console.log('Login failed');
                       });
                     };   
    
}]);