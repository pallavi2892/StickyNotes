var app = angular.module('mainApp', [
    'ngRoute','firebase']);

app.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider,$firebase){
    ($routeProvider)
        .when('/',{
            templateUrl:'html/login.html',
            controller:'login'
        })
        .when('/homePage',{
            templateUrl:'html/homePage.html',
            controller:'myCtrl',
        })
        .when('/stickyView',{
            templateUrl:'html/stickyView.html',
            controller:'stickyCtrl',
        })
       .otherwise({
           redirectTo: '/'
        });

}]);


app.controller("login", function ($scope,$location) {
    $scope.submitForm=function () {
        $location.path("/homePage" );
    }
});


app.controller('myCtrl', function($scope, hexafy,$location, $firebase) {
    $scope.hex = hexafy.myFunc(255);
    // $scope.addNote=function () {
    // // console.log("inside myctrl");
    // // window.alert("button clicked");
    // $scope.messageText = noteText.value;
    // var firebaseRef = firebase.database().ref();
    // // firebaseRef.child("Text").set("some value");
    // // firebase.push().set(messageText);
    // }
    var fireRef = new Firebase('https://my-notes-6a6f1.firebaseio.com/');
    $scope.notes = $firebase(fireRef).$asArray();
	$scope.newNote = '';
	$scope.editedNote = null;

	$scope.addNote = function(){
		var newNote = $scope.newNote.trim();
		if (!newNote.length) {
			return;
		}
		// push to firebase
		$scope.notes.$add({
			title: newNote,
		});
		$scope.newNote = '';
	};

	$scope.editNote = function(note){
		$scope.editedNote = note;
		$scope.originalNote = angular.extend({}, $scope.editedNote);
	};

		// update note for changes we made
	$scope.doneEditing = function(note){
		$scope.editedNote = null;
		var title = note.title.trim();
		if (title) {
			$scope.notes.$save(note);
		} else {
			$scope.removeNote(note);
		}
	};

	$scope.removeNote = function(note){
		$scope.notes.$remove(note);
	};


	 $scope.redirect=function () {
        $location.path("/stickyView" );
    }


});


app.controller("stickyCtrl", function ($scope, $firebase) {
    // $scope.inputs = [0];
    // $scope.moreInputs = function(){
    //   // console.log('added an input');
    //   $scope.inputs.push(0);
    // };

    $scope.AddPost = function() {
         
      // Add Post logic will be here
    var firebaseObj = new Firebase("https://my-notes-6a6f1.firebaseio.com/Notes");
    var fb = $firebase(firebaseObj);
    var title = $scope.article.title;
    var post = $scope.article.post;

    fb.$push({
    title: title,
    post: post
}).then(function(ref) {
    console.log(ref);
}, function(error) {
    console.log("Error:", error);
});
    }

    
});








