var app = angular.module("facebookApp", ["ngCordova",'ngCordovaOauth']);

app.controller("mainCtrl", ["$scope", "$cordovaOauth", "$http", function($scope, $cordovaOauth, $http) {
        window.cordovaOauth = $cordovaOauth;
        window.http = $http;

        window.fbAsyncInit = function(){
        FB.init({
        appId : '395196194192103',
        xfbml : true,
        version : 'v2.8'
        });
     };

     (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if(d.getElementById(id)) {return;}
        js = d.createElement(s); js.id =id;
        js.src ="http://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js,fjs);
     }(document, 'script', 'facebook-jssdk'));

        $scope.login =function()
        {
            facebookLogin(window.cordovaOauth, window.http);
        }

        function facebookLogin($cordovaOauth, $http)
        {
            $cordovaOauth.facebook("395196194192103", ["email", "public_profile"], {
            redirect_uri: "http://localhost/callback"}).then(function(result){
                displayData($http, result.access_token);
            },  function(error){
                    alert("Error: " + error);
            });
        }
}]);

