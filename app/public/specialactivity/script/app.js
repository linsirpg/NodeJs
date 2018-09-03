/*
* @Author: acer
* @Date:   2017-07-07 14:19:29
* @Last Modified by:   acer
* @Last Modified time: 2017-07-07 16:51:54
*/

'use strict';

var app = angular.module('myApp', ['ng', 'ui.router'])
	.config(['$compileProvider', function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|javascript|mailto|tel|file|sms):/);
		// Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)
	}])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url: '/home/:id{\d}',
				templateUrl: 'view/Home.html?v=1',
				controller: 'HomeController'
			})
	})