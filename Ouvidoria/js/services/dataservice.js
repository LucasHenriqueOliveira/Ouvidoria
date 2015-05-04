(function() {
	'use strict';
		angular
		    .module('app')
		    .factory('dataservice', dataservice);
		
		dataservice.$inject = ["$http"];
		
		function dataservice($http) {
		   return {
			   getLocal: getLocal,
			   addDemand: addDemand,
			   getAllDemands: getAllDemands,
			   deleteDemand: deleteDemand,
			   getDataGraphic: getDataGraphic
		   };
		   
		   function addDemand(local, mes, ano, quantidade){

			   return $http.post('addData.php', {
							   local: local,
							   mes: mes,
							   ano: ano,
							   quantidade: quantidade
					   })
	            .then(addDemandComplete)
	            .catch(addDemandFailed);
		   }
		   
		   function addDemandComplete(response) {
	            return { message : response.data.message, type : response.data.type }
	        }

	        function addDemandFailed(error) {
	            return { message : error.data, type : "danger" }
	        }
		   
		   function getAllDemands(){

			   return $http.get('getAllData.php')
	            .then(getDataComplete)
	            .catch(getDataFailed);

		   }
		   
		   function getDataComplete(response) {
	            return response;
	        }

	        function getDataFailed(error) {
	            console.log('Error: ' + error);
	        }
		   
		   function getLocal(){

			   return $http.get('getLocalData.php')
	            .then(getDataComplete)
	            .catch(getDataFailed);

		   }
		   
		   function deleteDemand(demandID){

			   return $http.post('deleteDemand.php', {demandID: demandID})
	            .then(deleteDataComplete)
	            .catch(deleteDataFailed);

		   }
		   
		   function deleteDataComplete(response) {
			   return { message : response.data.message, type : response.data.type };
	        }

	        function deleteDataFailed(error) {
	            console.log('Error: ' + error);
	        }
	        
	        function getDataGraphic(){
	        	return $http.get('getGraphicData.php')
	            .then(getDataComplete)
	            .catch(getDataFailed);
	        }
		}
}());