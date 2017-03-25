(function () {
    angular.module('ss.calendar', [])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('/Views/calendar', {
                    url: "/Views/calendar",
                    template: '<calendar-page></calendar-page>',
                    data: {
                        pageTitle: 'Calendar'
                    }
                });            
        }])
})();