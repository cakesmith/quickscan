'use strict';

describe('controllers spec test', function() {

  beforeEach(module('quickscan.controllers'));

  var $location, $scope, $rootScope, createController;

  beforeEach(inject(function(_$location_, _$rootScope_, _$controller_) {

    $location = _$location_;
    $rootScope = _$rootScope_;
    var $controller = _$controller_;

    $scope = $rootScope.$new();

    createController = function(name) {
      return $controller(name, {
        '$scope' : $scope
      });
    };


  }));

  it('has a dummy test', function() {

    var controller = createController('DashCtrl');
    expect(controller).toBeDefined();

  });

});