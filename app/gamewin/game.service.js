(function() {
  "use strict";
  angular
    .module('game')
    .factory('GameService', function($http, $rootScope) {
      var socket = io();
      var on = function(eventName, callback) {
        socket.on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      };

      var emit = function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(socket, function() {
            if (callback) {
              callback.apply(socket.args);
            }
          });
        });
      };

      return {
        on: on,
        emit: emit
      };
    });
})();
