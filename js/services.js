var app = angular.module('mainApp');

app.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
