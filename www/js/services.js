
angular.module('starter.services', [])
.factory('frcapiService', function ($http) {

    //var apiBaseUrl = 'https://frc-staging-api.firstinspires.org/api/v2.0';
    var apiBaseUrl = 'https://www.thebluealliance.com/api/v2';


    //        var authTokenHeaderValue = 'Basic cmFuZGJyb3duOjYwRUQ5NkE4LUI0OEEtNEEzNy1BMENCLThGQTk0MDE2M0JGNQ==';

    var config = {
        headers: {
            // FIRST API
            //'Authorization': authTokenHeaderValue,

            // Blue Alliance:
            'Accept': 'application/json;odata=verbose',
            'x-tba-app-id': 'frc3966:team-analysis:0.2',
        }
    };

    function getTeamsFunc(pageNum) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/teams/' + pageNum,
            headers: config.headers
        });
    }

    function getTeamFunc(teamKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/team/' + teamKey,
            headers: config.headers
        });
    }


    function getEventsFunc(year) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/events/' + year,
            headers: config.headers
        });
    }
    function getEventFunc(eventKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/event/' + eventKey,
            headers: config.headers
        });
    }

    function getEventTeamsFunc(eventKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/event/' + eventKey + '/teams',
            headers: config.headers
        });
    }
    function getEventMatchesFunc(eventKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/event/' + eventKey + '/matches',
            headers: config.headers
        });
    }
    function getEventRankingsFunc(eventKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/event/' + eventKey + '/rankings',
            headers: config.headers
        });
    }

    function getTeamEventsFunc(teamKey, year) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/team/' + teamKey + '/' + year + '/events',
            headers: config.headers
        });
    }

    function getTeamHistoryEventsFunc(teamKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/team/' + teamKey + '/history/events',
            headers: config.headers
        });
    }

    function getTeamAwardsFunc(teamKey) {
        return $http({
            method: 'GET',
            url: apiBaseUrl + '/team/' + teamKey + '/history/awards',
            headers: config.headers
        });
    }

    return {
        getTeams: getTeamsFunc,
        getTeam: getTeamFunc,
        getEvents: getEventsFunc,
        getEvent: getEventFunc,
        getEventTeams: getEventTeamsFunc,
        getEventMatches: getEventMatchesFunc,
        getTeamEvents: getTeamEventsFunc,
        getTeamHistoryEvents: getTeamHistoryEventsFunc,
        getTeamAwards: getTeamAwardsFunc,
        getEventRankings: getEventRankingsFunc,

    }
}
)

