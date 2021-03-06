app.service("userAuth",['$q','$http','localStorageService','$filter','$httpParamSerializer',function($q,$http,localStorageService,$filter,$httpParamSerializer){
    
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
    
     // Function to send Device Token
    function sendToken(userId , token) {
        console.log("In service sendToken function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/user/SaveDeviceDetails',
                method : 'POST',
                data   : {'UserId' : userId , 'DeviceId':token},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("DeviceId API successfully called");
                    deferredObject.resolve(response);
                    })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
    //Function to view all the job requests
    function viewjobrequests(userID) {
        console.log("In service viewjobrequests function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/job/ShowOfferedJobNotificationsToSP',
                method : 'POST',
                params   : {"spid": userID},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("View All Job requests API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    //Function to view single job requests using jobreqid
    function viewsinglejobrequest(jobreqid) {
        console.log("In service viewsinglejobrequest function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/job/ShowOfferedJobDetailsToSP',
                method : 'POST',
                params   : {jobreqid : jobreqid},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("View single Job requests API successfully called");
                    console.log(response);
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    //Function to send estimates
    function sendestimates(JobId,CustomerId,ServiceProviderId,amount,jobrequestid,comment) {
        console.log("In service send estimates function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/job/SendJobQuotationFromSP',
                method : 'POST',
                data   : {      "JobId": JobId,
                                "CustomerId": CustomerId,
                                "ServiceProviderID" : ServiceProviderId,
                                "ServiceProviderAmount" : amount,
                                "JobRequestId" : jobrequestid,
                                "SPComment" : comment
                           },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("sending job estimate API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
     //Function to view all job estimates sent from the provider
    function viewallsentjobestimates(userId) {
        console.log("In service view all sent jobe stimates function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/job/showSentJobQuotationsFromSP',
                method : 'POST',
                params   : {spid : userId},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("view all sent  job estimates API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
     //Function to view single job estimates sent from the provider
    function viewsinglesentjobestimates(userId) {
        console.log("In service view single sent job estimates function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/job/showSentJobQuotationDetailsToSP',
                method : 'POST',
                params   : {jobresid : userId},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("view sent  job estimate details API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                             deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
     //Function to view all the job requests
    function viewapprovedjobrequests(userID) {
        console.log("In service view approved job requests function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/Job/showAllApprovedJobsForSP',
                method : 'POST',
                params   : {"spid": userID},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("View All Approved Job requests API successfully called");
                    deferredObject.resolve(response);
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
        console.log("In service feedbacks function");
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
       // localStorageService.set('DeviceToken',null);
    }
    
    //Function to start job by provider
    function startjob(jobid,customerid,spid,lat,long) {
        console.log("In service user details function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/Job/saveTrackingDetails',
                method : 'POST',
                params   : {
                                "JobId": jobid,
                                "CustomerId": customerid,
                                "ServiceProviderId": spid,
                                "Latitude":lat,
                                "Longitude": long
                            },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("Start job API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                    console.log("Start job API was unsuccessful");
                    deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
    //Function to stop job by provider
    function stopjob(trackid,spid) {
        console.log("In service user details function");
        var deferredObject = $q.defer();
        $http({
                url    : 'http://ecomdemo.cloudapp.net:8888/api/Job/updateTrackingDetails',
                method : 'POST',
                params   : {
                                "TrackId": trackid,
                                "ServiceProviderId": spid
                            },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                }})
               .success(function(response){
                    console.log("Stop Job API successfully called");
                    deferredObject.resolve(response);
                })
               .error(function(error){
                    console.log("Stop Job API was unsuccessful");
                    deferredObject.reject(response);
                });
        
        return deferredObject.promise;       
        
    };
    
    
     return {
      
        login : login,//login function where the login API is called
        sendToken: sendToken,// function to send device token
        viewjobrequests : viewjobrequests,//Function to view all the job requests
        viewsinglejobrequest : viewsinglejobrequest,//Function to view single the job requests
        userDetails : userDetails,//function to get user details
        isLoggedIn : isLoggedIn,//function to check whether the user is logged in or not
        destroyUser : destroyUser,// function to destroy userdetails stored in loacal storage
        edituserDetails : edituserDetails, //function to edit user details
        sendestimates : sendestimates, //Function to send estimates to the operator
        viewallsentjobestimates : viewallsentjobestimates, //Function to view all sent job estimates from provider
        viewsinglesentjobestimates : viewsinglesentjobestimates, //Function to view single sent job estimates from provider
        viewapprovedjobrequests : viewapprovedjobrequests, //Function to view all the approved job requests
        startjob : startjob,//Function to start job by provider
        stopjob : stopjob //Function to stop job by provider 
    };
    


}]);