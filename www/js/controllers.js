'use strict';

angular.module('quickscan.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope = null;
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
    $scope = null;
});
