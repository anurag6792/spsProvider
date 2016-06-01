app.controller('ServiceCtrl',['$scope','userAuth','localStorageService','$filter','$ionicLoading',function($scope,userAuth,localStorageService,$filter,$ionicLoading){
    
    
     $scope.show = function() {
                    $ionicLoading.show({
                      template: '<ion-spinner icon="lines"></ion-spinner>'
                    });
                  };
    
    $scope.hide = function(){
                     $ionicLoading.hide();
                  };
    
    $scope.userID = localStorageService.get('userID');//adding consumer userID in userID in RequestCtrl
    console.log('Added consumer userID  to the RequestCtrl in userID ') ;
   
    $scope.jobrequests = [];
    var viewjobrequests = userAuth.viewjobrequests($scope.userID);
     $scope.show();
    viewjobrequests.then(function (response) {
            if (response.success == "true" && response.description.length > 0) {
                $scope.hide();
                console.log(response);
                $scope.showRequest = response.success ;
                $scope.jobrequests = response.description;
                console.log('In ServiceCtrl : view requests successful');
                
                }
             else if(response.success == "false") {
                $scope.showRequest = false ; 
                $scope.hide(); 
                console.log('In ServiceCtrl : view requests unsuccessful'); 
                }
             else {
                $scope.showRequest = false ; 
                $scope.hide(); 
                console.log('In ServiceCtrl : view requests unsuccessful');  
                 
             }
         
        });
    
}]);