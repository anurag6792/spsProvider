app.controller('ViewapprovedCtrl',          
               ['$scope',
                '$stateParams',
                'localStorageService',
                'userAuth',
                '$ionicLoading',
                '$ionicPopup',
                '$ionicModal',
                '$interval',
                function($scope,$stateParams,localStorageService,userAuth,$ionicLoading,$ionicPopup,$ionicModal,$interval){
    
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
        e.setHours(24,0,0,0);
        $scope.newDateObj = e.getTime();
        $scope.ssonTimeout = function(){  
           console.log($scope.newDateObj);
           $scope.newDateObj = $scope.newDateObj + 1000;
           
        }
        
        $scope.sstimeout = $interval($scope.ssonTimeout,1000);
        
        
    };                
    $scope.stop = function(){
        console.log('stopped');
        $scope.showstart= true;                
        $scope.showstop= false;
        $interval.cancel($scope.sstimeout);
        
    };                
    
                    
    

    
}]);