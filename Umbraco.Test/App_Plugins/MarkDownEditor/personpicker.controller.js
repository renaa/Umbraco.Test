angular.module("umbraco")
    .controller("My.PersonPickerController", function($scope, personResource){
        personResource.getAll().then(function(response){
            $scope.people = response.data;
        });
    });

// adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('personResource',
    function ($q, $http, umbRequestHelper) {
        // the factory object returned
        return {
            // this calls the ApiController we setup earlier
            getAll: function () {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/My/PersonApi/GetAll"),
                    "Failed to retrieve all Person data");
            }
        };
    }
);