
var myApp = angular.module("myApp", [ 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.resizeColumns'])

myApp.controller("appController", ['$scope', '$http', '$q', '$interval', function($scope, $http, $q, $interval) {

  var myData = [];
//  $scope.columns = [
// { name: 'test', enableCellEdit: true},
// { name: 'description', enableCellEdit: true },
// { name: 'order', enableCellEdit: true },
// { name: 'test_status', enableCellEdit: true }
// ];

$scope.columns=[
{name:'TxnId',enableCellEdit: true},
{name:'Symbol',enableCellEdit: true},
{name:'Action',enableCellEdit: true},
{name:'Quantity',enableCellEdit: true},
{name:'Price',enableCellEdit: true},
{name:'MarketValue',enableCellEdit: true}
]

  $scope.gridOptions = {

    enableCellEditOnFocus: false,
    enableSorting: true,
    enableGridMenu: true,
    columnDefs: $scope.columns,
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    }
  };

  $scope.saveRow = function(rowEntity) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    console.log("record EDIT" + angular.toJson(rowEntity));
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
    $interval(function() {
      if (rowEntity.test_status === 'Active') {
        console.log("accepting edit, b/c status is Active");
        promise.resolve();
      } else {
        console.log("rejecting edit, b/c status is Inactive");
        promise.reject();
      }
    }, 1000, 1);
  };

  // $http.get('data.json')
  //   .success(function(data) {
  //     console.log("data == " + angular.toJson(data));
  //     $scope.gridOptions.data = data;
  //   });
$http.get('researchData.json')
    // .then(function(response) {
    // 	 //$scope.questions = response.data.questions;
    // 	$scope.trades = response.data.trades
    // 	console.log($scope.trades)
    // 	console.log('in console')
    
    //     //$scope.trades = result.data[0].trades; 
    //   console.log("result == " + angular.toJson($scope.trades));
    //   $scope.gridOptions.response = $scope.trades;
    //   console.log($scope.gridOptions.response)
        .success(function(response) {
        	console.log(response)
        $scope.trades = response.trades	
      console.log("data == " + angular.toJson($scope.trades));
      $scope.gridOptions.data = $scope.trades;
    });
    

    // $http.get('researchData.json')
    // .success(function(data) {
    //   console.log("data == " + angular.toJson(data));
    //   $scope.gridOptions.data = data;
    // });
  // $scope.readData = function() {
  //     return $http({
  //         method: 'GET',
  //         url: 'data.json'    
  //     }).then(function(response) {
  //         console.log("data == " + angular.toJson(response.data));
  //         return response.data;
  //     });
  // }
}]); // end appController