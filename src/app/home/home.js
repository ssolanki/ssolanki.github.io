/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router'
])

/**

 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * This is our Home controller.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $http ) {
  $scope.urlList = [];
  $scope.url = {
    "text": ''
  };
  $scope.showError = false;
  $scope.linkLoading = false;
  console.log('$scope.inputUrl');
  $scope.onSearchSelection =  function(){
    $scope.showError = true;
    if($scope.urlForm.$valid){
      $scope.showError = false;
      $scope.linkLoading = true;
      var key ="852471ac4e360ae9b8a62cde2fc678fe0b9fc4ee";
      var url = "https://api-ssl.bitly.com/v3/user/link_save?access_token=" + key + "&longUrl=" + $scope.url.text;
      $http.get(url)
       .then(
           function(response){
              var data = response.data.data;
              $scope.urlList.unshift(data["link_save"]);
              $scope.linkLoading = false;
              // console.log($scope.urlList);
              $scope.url.text = "";
           },
           function(response){
             console.log("error occured",response);
             $scope.linkLoading = false;
             // failure callback
           }
        );
    }
  };
  $scope.$watch("url.text", function(newValue, oldValue) {
    if($scope.urlForm.$valid){
      $scope.showError = false;
    }
  });
})

;
