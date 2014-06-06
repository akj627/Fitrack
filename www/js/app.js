/*global angular */

/**
 * The main Fitrack app module
 *
 * @type {angular.Module}
 */
angular.module('fittrack', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider.when('/', {
			controller: 'myAccountCtrl',
			templateUrl: 'index.html'
		}).when('/:status', {
			controller: 'myAccountCtrl',
			templateUrl: 'index.html'
		}).otherwise({
			redirectTo: '/'
		});
	});