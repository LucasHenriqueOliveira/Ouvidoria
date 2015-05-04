(function() {
	'use strict';
	
	angular
		.module('app')
		.controller('EditCtrl', EditCtrl);
	
	EditCtrl.$inject = ['$routeParams', 'dataservice'];
	
	function EditCtrl($routeParams, dataservice){
		var vm = this;
		
		dataservice.getQtdByID($routeParams.qtdID)
            .then(getQtdSuccess)
            .catch(getQtdError);
		
		function getQtdSuccess(qtd) {
            //vm.currentBook = qtd;
        }

        function getQtdError(reason) {
            console.log('Error: ' + reason);
        }
	}

}());