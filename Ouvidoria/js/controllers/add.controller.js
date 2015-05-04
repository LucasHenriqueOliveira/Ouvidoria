(function() {
	'use strict';
	
	angular
		.module('app')
		.controller('AddCtrl', AddCtrl);
	
		AddCtrl.$inject = ['dataservice'];
		
		function AddCtrl(dataservice){
			var vm = this;
			vm.local = 0;
			vm.locais = [];
			vm.mes = 0;
			vm.meses = [];
			vm.ano = 0;
			vm.anos = [];
			vm.submit = submit;
			vm.closeAlert = closeAlert;
			vm.alerts = [];
			
			getDados();
			
			function getDados(){
				getLocal();
				getMeses();
				getAnos();
			}
			
			function getLocal(){
				return dataservice.getLocal()
					.then(function(data) {
						vm.locais = data.data;
		            });
			}
			
			function getMeses(){
				return vm.meses = [{"id": 1, "mes": "Janeiro"}, 
				                   {"id": 2, "mes": "Fevereiro"}, 
				                   {"id": 3, "mes": "Março"}, 
				                   {"id": 4, "mes": "Abril"},
				                   {"id": 5, "mes": "Maio"}, 
				                   {"id": 6, "mes": "Junho"}, 
				                   {"id": 7, "mes": "Julho"}, 
				                   {"id": 8, "mes": "Agosto"}, 
				                   {"id": 9, "mes": "Setembro"},	
				                   {"id": 10, "mes": "Outubro"}, 
				                   {"id": 11, "mes": "Novembro"}, 
				                   {"id": 12, "mes": "Dezembro"}];
			}
			
			function getAnos(){
				var date = new Date();
				var year = date.getFullYear();
				
				for(var i = year; i >= 2015; i--){
					vm.anos.push({"ano": i});
				}
				return vm.anos;
			}
			
			function submit(){
				if (vm.form.$valid) {
					addData(vm.local.id, vm.mes.id, vm.ano.ano, vm.quantidade);
				}
				
			};
			
			function addData(local, mes, ano, quantidade){
				return dataservice.addDemand(local, mes, ano, quantidade)
					.then(function(data) {
						vm.alerts.push({type: data.type, msg: data.message});
						vm.local = 0;
						vm.mes = 0;
						vm.ano = 0;
						vm.quantidade = '';
		            });
			};
			
			function closeAlert(index) {
			    vm.alerts.splice(index, 1);
			};
		}
		
}());