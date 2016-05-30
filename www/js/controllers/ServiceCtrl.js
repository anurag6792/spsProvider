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
    $scope.show();
    $scope.jobrequests = [];
    var viewjobrequests = userAuth.viewjobrequests($scope.userID);
    viewjobrequests.then(function (response) {
            if (response.success == "true") {
                $scope.hide();
                console.log(response);
                $scope.showRequest = response.success ;
                $scope.jobrequests = response.description;
                console.log('In ServiceCtrl : view requests successful');
                
                }
             else if(response.success == "false") {
                $scope.showRequest = response.success ; 
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