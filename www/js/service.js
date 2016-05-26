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
    
    //Function to get the Provider details
    function userDetails(userid) {
        console.log("In service user details function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/User/GetSPDetails',
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
    
     //Function to edit provider details
    function edituserDetails(userdetails,userprofile) {
        console.log("In service login function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/User/UpdateUser',
                method : 'POST',
                data   : {    
                                "Contact": userdetails.mobile,
                                "DateOfBirth":userdetails.dob,
                                "EmailId": userdetails.email,
                                "FirstName": userdetails.firstname,
                                "MiddleName": userdetails.middlename,
                                "LastName": userdetails.lastname,
                                "Gender": userdetails.gender,
                                "UserId": userprofile.description.UserId,
                                "UserName":userdetails.mobile,
                                "Password":userdetails.newpassword,
                                "RoleId": 3,
                                "IsVerified":'true',
                                "RecordStatus":0,
                                "ModifiedBy": 3,
                                "IsFirstTimeLogin": "No"
                         },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("Edit User details API successfully called");
                    console.log(response);
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
    //Function to view all the feedbacks of the customers
    function feedbacks(userID){
        console.log("In service addaddress function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/feedback/ShowAllCustomerFeedbacksToSP',
                method : 'POST',
                params   : {"id": userID},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("show provider feedbacks API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                    console.log("show provider feedbacks API was not successfully called");
                    deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    }
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
        destroyUser : destroyUser,
        edituserDetails : edituserDetails
    };
    


}]);