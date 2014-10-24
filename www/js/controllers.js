angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, store, $location, auth) {
  //// Form data for the login modal
  //$scope.loginData = {};
  //
  //// Create the login modal that we will use later
  //$ionicModal.fromTemplateUrl('templates/login.html', {
  //  scope: $scope
  //}).then(function(modal) {
  //  $scope.modal = modal;
  //});



  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

    $scope.logout = function(){
        console.log("logging out");
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/app/categories');


    }

  // Open the login modal
  $scope.login = function() {

      auth.signout();
      store.remove('profile');
      store.remove('token');

      auth.signin({
          authParams: {
              scope: 'openid offline_access',
              device: 'Mobile device'
          }
      }, function(profile, token, accessToken, state, refreshToken) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          store.set('refreshToken', refreshToken);

          $location.path('/app/categories');
      }, function() {
          // Error callback
      });
  };

        $scope.signup = function () {

            auth.signout();
            store.remove('profile');
            store.remove('token');

            auth.signup({
                authParams: {
                    scope: 'openid offline_access',
                    device: 'Mobile device'
                }
            }, function(profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refreshToken);

                $location.path('/app/categories');

            }, function() {
                // Error callback
            });
        }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

      auth.signin({
          authParams: {
              scope: 'openid offline_access',
              device: 'Mobile device'
          }
      }, function(profile, token, accessToken, state, refreshToken) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          store.set('refreshToken', refreshToken);
          $location.path('/');
      }, function() {
          // Error callback
      });

    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //$scope.signupData = {};
  //
  //$ionicModal.fromTemplateUrl('templates/signup.html', {
  //  scope: $scope
  //}).then(function(modal){
  //  $scope.signupmodal = modal;
  //});
  //
  //    // Triggered in the login modal to close it
  //$scope.closeSignup = function() {
  //  $scope.signupmodal.hide();
  //};
  //
  //// Open the login modal
  //$scope.signup = function() {
  //  $scope.signupmodal.show();
  //};
  //
  //// Perform the login action when the user submits the login form
  //$scope.doSignup = function() {
  //  console.log('Doing Signup', $scope.signupData);
  //
  //  // Simulate a login delay. Remove this and replace with your login
  //  // code if using a login system
  //  $timeout(function() {
  //    $scope.closeSignup();
  //  }, 1000);
  //};
})

.controller('CategoriesCtrl', function($scope, $http, $ionicLoading) {

  $scope.categories = [];

  var query = 'https://api.paris.fr/api/data/1.0/Equipements/get_categories/?token=59b44ccd1735f4d11b1de27eff03107e174a2564f32979f663ed5d6e80287e5e';

      $ionicLoading.show({
        template: 'Loading...'
      });

  $http.get(query)
      .success(function(res){
          angular.copy(res.data, $scope.categories);
          $ionicLoading.hide();
      })
      .error(function(){
        console.log('error');
        $ionicLoading.hide();
      });
})

.controller('FacilitiesCtrl', function($scope, $http, $stateParams, $ionicLoading){

      var categoryId = $stateParams.categoryId;

      $scope.facilities = [];
  var query = 'https://api.paris.fr/api/data/1.0/Equipements/get_equipements/?token=59b44ccd1735f4d11b1de27eff03107e174a2564f32979f663ed5d6e80287e5e&cid=' + categoryId + '&offset=0&limit=10';

      $ionicLoading.show({
        template: 'Loading...'
      });

      $http.get(query)
          .success(function (res) {
            angular.copy(res.data, $scope.facilities);
            $ionicLoading.hide();
          })
          .error(function(){
            console.log('error');
            $ionicLoading.hide();
          });

})

.controller('FacilityCtrl', function($scope, $http, $stateParams, $ionicLoading) {

      var id = $stateParams.id;

      $scope.facility = [];

      var query = 'https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?token=59b44ccd1735f4d11b1de27eff03107e174a2564f32979f663ed5d6e80287e5e&id=' + id;

      $ionicLoading.show({
        template: 'Loading...'
      });

      $http.get(query)
          .success(function(res) {

            $scope.facility = res.data[0];
            $ionicLoading.hide();
          })
          .error(function(){
            console.log('error');
            $ionicLoading.hide();
          });

    })
  .controller('SignUpCtrl', function($scope, $http){

    $scope.doSignup = function(){
      console.log('inside sideup controller');
    }

  })

.controller('NearYouCtrl', function($scope, $http, geolocation, $ionicLoading) {

        $scope.categories = [];

        var query = 'https://api.paris.fr/api/data/1.0/Equipements/get_categories/?token=59b44ccd1735f4d11b1de27eff03107e174a2564f32979f663ed5d6e80287e5e';

        $ionicLoading.show({
            template: 'Loading...'
        });

        $http.get(query)
            .success(function(res){
                angular.copy(res.data, $scope.categories);
                $ionicLoading.hide();
            })
            .error(function(){
                console.log('error');
                $ionicLoading.hide();
        });

        $scope.facilities = [];

        $scope.GetFacilities = function(category){

            geolocation.getLocation().then(function(data) {

                if(data){

                    var url = 'https://api.paris.fr/api/data/1.0/Equipements/get_geo_equipements/?token=59b44ccd1735f4d11b1de27eff03107e174a2564f32979f663ed5d6e80287e5e';
                    var query = '&cid=' + category + '&offset=0&limit=10&lat=' + data.coords.latitude + '&lon=' + data.coords.longitude;

                    $http.get(url + query)
                        .success(function (res) {
                            console.log($scope.facilities);
                            angular.copy(res.data, $scope.facilities)
                        })
                        .error(function(){
                            console.log('error');
                        });
                }
            }, function(){
                console.log('error getting location');
            });
        }






    })

.controller('HomeCtrl', function(store, $scope, $location){

        var profile = store.get('profile');
        $scope.isAuthenticated = null;
        if(profile)
        {
            console.log('your email is:' + profile.email);

            $scope.isAuthenticated = true;

            //$location.path('/');
        }
        else
        {
            console.log('no email');
            $scope.isAuthenticated = false;
            //$location.path('/');
        }
        //$state.go($state.$current, null, {reload: true});

    })

//.controller('LoginCtrl', function($scope, store, $location, auth) {
//        $scope.login = function() {
//
//
//
//            auth.signin({
//                authParams: {
//                    scope: 'openid offline_access',
//                    device: 'Mobile device'
//                }
//            }, function(profile, token, accessToken, state, refreshToken) {
//                // Success callback
//                store.set('profile', profile);
//                store.set('token', token);
//                store.set('refreshToken', refreshToken);
//                $location.path('/');
//
//                console.log('success login');
//                console.log(profile.nickname);
//
//            }, function() {
//                // Error callback
//            });
//        }
//    })

;