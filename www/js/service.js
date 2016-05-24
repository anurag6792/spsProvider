app.service("userAuth",['$q','$http','localStorageService','$filter',function($q,$http,localStorageService,$filter){
    
    // Login API 
    function login(username, password) {
        console.log("In service login function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/User/LoginUser',
                method : 'POST',
                data   : {'UserName' : username , 'Password':password},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("Login API successfully called");
                    localStorageService.set('userID',response.description.UserId);//setting the response from login into "userID"
                    deferredObject.resolve(response);
                    localStorageService.set('logged',JSON.parse(response.success));//setting the "logged" true 
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
    //Function to get the user details
    function userDetails(userid) {
        console.log("In service user details function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/User/CustomerDetails',
                method : 'POST',
                params   : {'id' : userid  },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("User details API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                    console.log("User details API was unsuccessful");
                    deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
     // Function to check whether user is logged in or not
    function isLoggedIn(){
        return localStorageService.get('logged');
    }
    
    // Logout function to destroy user credentials 
    function destroyUser(){
        localStorageService.set('userID',null);
        localStorageService.set('logged',false);
    }
    return {
      
        login : login,
        userDetails : userDetails,
        isLoggedIn : isLoggedIn,
        destroyUser : destroyUser
    };
    


}]);