(function () {
    'use strict';
    function calendarController($scope,$uibModal) {
        var ctrl = this;
        ctrl.day = moment();
        ctrl.newDate = new Date(ctrl.day);
        ctrl.selected = "=";
        ctrl._removeTime = function (date) {            
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }
        ctrl._buildMonth = function (start, month) {
            ctrl.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                ctrl.weeks.push({ days: ctrl._buildWeek(date.clone(), ctrl.month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
                }        
        }            
        ctrl._buildWeek = function (date, month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === ctrl.month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }        
        ctrl.changeDate = function(){ 
             if( ctrl.newDate == undefined){
                alert("Enter the correct date.");
            }else{
                ctrl.day._d = ctrl.newDate;
                 ctrl.selectDate(ctrl.day);
            }            
        };
        ctrl.today = function(){
            ctrl.month = moment(); 
             ctrl.selectDate(moment());
        }
        ctrl.selectDate = function(day){
                ctrl.selected = ctrl._removeTime (day);
                ctrl.month = day;       
                var start = ctrl.selected.clone();      
                start.date(1);
                ctrl._removeTime(start.day(0));        
                ctrl._buildMonth(start, ctrl.month);
        }
        ctrl.month = moment();       
        var start = ctrl._removeTime (moment());         
        start.date(1);
        ctrl._removeTime(start.day(0));        
        ctrl._buildMonth(start, ctrl.month); 
        ///modal window selected date
         ctrl.openModal = function (date) {
                var ModalInstance = $uibModal.open({
                animation: true,                
                templateUrl: '/scripts/calendar/modal.html',                
                backdrop: true,
                size: 'sm',
                 controller: ["$scope","$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.month = date.date.format("MMMM");
                    $scope.date = date.date.format("DD");
                    $scope.cancel = function () {                        
                        $uibModalInstance.dismiss('cancel');
                    };
                     
                 }]
            });
        }
    }

    calendarController.$inject = ['$scope','$uibModal'];

    angular.module('app')
        .component('calendarPage', {
            templateUrl: '/scripts/calendar/calendar.html',
            controller: calendarController
        });
})()
