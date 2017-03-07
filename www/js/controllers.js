angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

})
.controller('TeamsCtrl', function($scope, $stateParams, frcapiService) {
    $scope.loadCompleted = false;
    $scope.pageNumber = 0;
    $scope.allTeamsLoaded = false;
    $scope.teams = [];
    frcapiService.getTeams($scope.pageNumber).then(function(response) {
        $scope.teams = response.data;
        $scope.loadCompleted = true;
    })

    $scope.loadMoreData = function() {
        $scope.pageNumber = $scope.pageNumber + 1;
        console.log("loading page number: " + $scope.pageNumber);
        $scope.loadCompleted = false;
        frcapiService.getTeams($scope.pageNumber).then(function(response) {

            if (response.data && response.data.length) {
                $scope.teams = $scope.teams.concat(response.data);
                console.log("total num teams: " + $scope.teams.length);
            } else {

                $scope.allTeamsLoaded = true;
            }
            $scope.loadCompleted = true;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }

    $scope.moreDataCanBeLoaded = function() {
        return !$scope.allTeamsLoaded;
    }
})
.controller('TeamCtrl', function($scope, $stateParams, frcapiService) {

    $scope.loadCompleted = false;
    $scope.year = 2017;
    $scope.team = {};
    frcapiService.getTeam($stateParams.key).then(function(response) {
        $scope.team = response.data;
        $scope.loadCompleted = true;
    });
    frcapiService.getTeamEvents($stateParams.key, $scope.year).then(function(response) {
        $scope.events = response.data;

    })
})

.controller('EventsCtrl', function($scope, $stateParams, frcapiService) {
    $scope.year = 2017;
    $scope.events = [];
    $scope.loadCompleted = false;
    frcapiService.getEvents($scope.year).then(function(response) {
        $scope.events = response.data;
        $scope.loadCompleted = true;
    })

})
.controller('EventCtrl', function($scope, $stateParams, frcapiService) {

    $scope.loadCompleted = false;
    $scope.event = {};
    frcapiService.getEvent($stateParams.key).then(function(response) {
        $scope.event = response.data;
        if ($scope.event) {
            frcapiService.getEventRankings($scope.event.key).then(function (rsp) {
             $scope.event.rankings = rsp.data;
         });
        }
        $scope.loadCompleted = true;
    })
    frcapiService.getEventTeams($stateParams.key).then(function(response) {
        $scope.teams = response.data;
    })

    frcapiService.getEventMatches($stateParams.key).then(function(response) {
        $scope.matches = response.data;
    })
})
.controller('TeamHistoryEventsCtrl', function($scope, $stateParams, frcapiService) {
    $scope.team = {};
    $scope.events = [];
    $scope.loadCompleted = false;
    frcapiService.getTeam($stateParams.key).then(function(response) {
        $scope.team = response.data;
        $scope.loadCompleted = true;
    })
    frcapiService.getTeamHistoryEvents($stateParams.key).then(function(response) {
        $scope.events = response.data;
    })
    frcapiService.getTeamAwards($stateParams.key).then(function(response) {
        $scope.awards = response.data;
    })

})
.controller('MatchCtrl', function($scope, $stateParams) {
})
.controller('HomeCtrl', function($scope, $stateParams, frcapiService) {
    $scope.team = {};
    $scope.events = [];
    $scope.loadCompleted = false;
    $scope.year = '2017';
    this.year = '2017';
    $scope.yearChanged = function () {
        $scope.getData(this.year);
    };
    var key = 'frc3966';
    frcapiService.getTeam(key).then(function (response) {
        $scope.team = response.data;
        $scope.loadCompleted = true;
    })
    $scope.getData = function (pYear) {
        $scope.loadCompleted = false;
        frcapiService.getTeamEvents(key, pYear).then(function (response) {
            $scope.events = response.data;

            response.data.forEach(function (evt, evtIndex) {
                evt.rankings = [];
                frcapiService.getEventRankings(evt.key).then(function (rsp) {
                    rsp.data.forEach(function (curD, curDIndex) {
                        if ((curD && curD[1] == "3966") || curDIndex == 0) {
                            evt.rankings.push(curD);
                        }
                    });
                });
            });
        })
        $scope.loadCompleted = true;

    }
    $scope.getData($scope.year);

    });
