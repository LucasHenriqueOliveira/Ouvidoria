(function() {
	'use strict';
	
	angular
	.module('app')
	.controller('DashCtrl', DashCtrl);

	DashCtrl.$inject = ['dataservice', '$route'];
	
	function DashCtrl(dataservice, $route){
		var vm = this;
		vm.demands = [];
		vm.closeAlert = closeAlert;
		vm.msg = '';
		vm.type = '';
		
		listData();
		
		function listData(){
			return dataservice.getAllDemands()
				.then(function(data) {
					vm.demands = data.data;
	            });
		};
		
		vm.deleteDemand = function (demandID) {

			dataservice.deleteDemand(demandID)
                .then(deleteDemandSuccess)
                .catch(deleteDemandError);

        };

        function deleteDemandSuccess(response) {
        	alert(response.message);
            $route.reload();
        }

        function deleteDemandError(errorMessage) {
            console.log('Error:' + errorMessage);
        }
        
        function closeAlert(index) {
		    vm.alerts.splice(index, 1);
		};
		
	}
}());