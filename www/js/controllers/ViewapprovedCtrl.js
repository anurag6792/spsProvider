app.controller('ViewapprovedCtrl',          
               ['$scope',
                '$stateParams',
                'localStorageService',
                'userAuth',
                '$ionicLoading',
                '$ionicPopup',
                '$ionicModal',
                '$interval',
                '$cordovaGeolocation',
                '$ionicPlatform',
                '$ionicPopup',
                '$state',
                function($scope,$stateParams,localStorageService,userAuth,$ionicLoading,$ionicPopup,$ionicModal,$interval,$cordovaGeolocation,
                          $ionicPlatform,$ionicPopup,$state){
    
    // Start Job Modal    
    $ionicModal.fromTemplateUrl('templates/startjobModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

      $scope.openstartjobModal = function()
      { 
         $scope.modal.show();
      };

      $scope.closestartjobModal = function() {
        $scope.modal.hide();
      };
    
    
    
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
    
    //Function to get location of the provider
    $scope.getlocation = function(){
        $ionicPlatform.ready(function() {
                var posOptions = {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                };    
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    $scope.lat  = position.coords.latitude;
                    $scope.long = position.coords.longitude;
                    console.log($scope.lat); 
                    console.log($scope.long);
                    $scope.confirmjob();
                    
                }, function(err) {
                    $scope.GPSerror();
                    console.log(err);
                });
                
                
            });
    };                
    
    //Function to show error when the GPS is not responding    
    $scope.GPSerror = function() {
                   var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: 'Please enable your GPS and try again after sometime.',
                     okText:'OK',
                     okType:'button button-block login-button',
                     onTap: function(){
                       return true;
                     }   
                   });
//
//                   alertPopup.then(function(res) {
//                     if(res){
//                         $state.go('app.dashboard'); 
//                     }  
//                     console.log('enable GPS error message was prompted')
//                   });
                 };                    
                    
    //Function to confirm to start job.
    $scope.confirmjob = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Start Job',
        template: 'Are you sure you want to start this job?',
        okType:'login-button'
      });
    
      confirmPopup.then(function(res) {
        if(res) {
          $scope.startjob();    
          console.log('Provider confirmed to start job.');
        } else {
          console.log('Provider cancelled to start the job.');
        }
      });
    };
    
    //Function to start the job.
    $scope.startjob = function(){
        $scope.openstartjobModal(); 
    };
    
    
    $scope.showstart= true;                
    $scope.showstop= false;                
    //Function to start time                
    $scope.start = function(){
        console.log('started');
        $scope.showstart= false;                
        $scope.showstop= true;
        
        var e = new Date();
        e.setHours(0,0,0,0);
        $scope.newDateObj = e.getTime();
        console.log($scope.newDateObj);
        $scope.ssonTimeout = function(){  
           console.log($scope.newDateObj);
           $scope.newDateObj = $scope.newDateObj + 1000;
           
        }
        
        $scope.sstimeout = $interval($scope.ssonTimeout,1000);
        
        var jobstart = userAuth.startjob($scope.approvedjobserviceDetails.JobId,$scope.approvedjobserviceDetails.CustomerId,$scope.approvedjobserviceDetails.ServiceProviderID,$scope.lat,$scope.long);
        $scope.show();
        jobstart.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.trackid = response.description.TrackId; // storing job details in jobrequestDetails
                console.log('In ViewserviceCtrl : startjob successful');
                
                }
             else if(response.success == "false") {
                $scope.hide(); 
                console.log('In ViewserviceCtrl : startjob unsuccessful'); 
                }
             else {
                $scope.hide(); 
                console.log('In ViewserviceCtrl : startjob unsuccessful');  
                 
             }
         
        });
        
    };                
    $scope.stop = function(){
        console.log('stopped');
        $scope.showstart= true;                
        $scope.showstop= false;
        $interval.cancel($scope.sstimeout);
        var jobstop = userAuth.stopjob($scope.trackid,$scope.userId);
        $scope.show();
        jobstop.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.jobcomplete();
                console.log('In ViewserviceCtrl : stopjob successful');
                
                }
             else if(response.success == "false") {
                $scope.hide();
                $scope.jobincomplete(); 
                console.log('In ViewserviceCtrl : stopjob unsuccessful'); 
                }
             else {
                $scope.hide(); 
                $scope.jobincomplete(); 
                console.log('In ViewserviceCtrl : stopjob unsuccessful');  
                 
             }
         
        });
        
    };                
    
    //Function showing alert that job has been completed
    $scope.jobcomplete = function() {
                   var alertPopup = $ionicPopup.alert({
                     title: 'Service',
                     template: 'Thanks for completing your work.',
                     okText:'OK',
                     okType:'button button-block login-button',
                     onTap: function(){
                       return true;
                     }   
                   });

                   alertPopup.then(function(res) {
                     if(res){
                         $scope.closestartjobModal();
                         $state.go('app.dashboard'); 
                     }  
                     console.log('job complete error')
                   });
                 };                            
    //Function showing alert that job has not been completed
    $scope.jobincomplete = function() {
                   var alertPopup = $ionicPopup.alert({
                     title: 'Service',
                     template: 'Your job could not be processed right now.Please try again after sometime.',
                     okText:'OK',
                     okType:'button button-block login-button',
                     onTap: function(){
                       return true;
                     }   
                   });

                   alertPopup.then(function(res) {
                     if(res){
                         $scope.closestartjobModal();
                         $state.go('app.dashboard'); 
                     }  
                     console.log('job complete error')
                   });
                 };                            
    

    
}]);