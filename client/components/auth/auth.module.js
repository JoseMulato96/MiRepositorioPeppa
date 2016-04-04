'use strict';

angular.module('pepawebApp.auth', [
  'pepawebApp.constants',
  'pepawebApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
