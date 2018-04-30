var app = angular.module("starting5",['ngDragDrop']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
})

/* ### ADMIN QUIZZ ### */

app.controller('adminQuizz', [ '$scope', function($scope){
    $scope.title = "Admin quizz";
    $scope.quizz = {};
    $scope.quizz.type = "QCM";
    $scope.quizz.question = "";
}]);


/* ### QUIZZ ### */

app.factory("ServiceQuizz", function ($http) {
        var getRandomQuizz = function () {
            return $http.post("/app_dev.php/quizz/getRandomQuizz", {responseType: "json"});
        };

        var validateQuizz = function ($id,$answer) {
            return $http.post("/app_dev.php/quizz/validateQuizz", {"id":$id,"answer":$answer});
        };

    return {
        getRandomQuizz: getRandomQuizz,
        validateQuizz: validateQuizz
    };

});

app.controller('Quizz', [ '$scope', '$http', 'ServiceQuizz' , function($scope, $http, ServiceQuizz){
    $scope.started = false;
    $scope.loadingQuizz = false;
    $scope.selectedQCM = 0;
    $scope.validatingQuizz = false;
    $scope.validQuizz = false;
    $scope.quizzEnd = false;

    $scope.startQuizz = function(){
        $scope.started = true;
        $scope.loadingQuizz = true;
        ServiceQuizz.getRandomQuizz().then(function (res) {
            $scope.quizz = res.data;
            $scope.loadingQuizz = false;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.validate = function(){
        var res = null;
        $scope.validatingQuizz = true;
        if($scope.quizz.type == 'QCM'){
            res = $scope.selectedQCM;
        }else if($scope.quizz.type == 'Question'){
            res = $scope.quizz.QuestionAnswer;
        }
        ServiceQuizz.validateQuizz($scope.quizz.id, res).then(function (res) {
            $scope.validQuizz = (res.data == 'true' ? res.data = true : res.data = false);
            $scope.validatingQuizz = false;
            $scope.quizzEnd = true;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.bindSelectedQCM = function(newVal){
        $scope.selectedQCM = newVal;
    }

}]);

/* ### CREATE FIVE TEAM ### */

app.factory("ServiceFive", function ($http) {
    var getPlayer = function () {
        return $http.get("/app_dev.php/team/getPlayers", {responseType: "json"});
    };

    var sendTeam = function(players){
        return $http.post("/app_dev.php/team/createTeam", players);
    };

    return {
        getPlayer: getPlayer,
        sendTeam: sendTeam
    };

});

app.controller('Five', [ '$scope', 'ServiceFive', '$timeout', function($scope, ServiceFive, $timeout){

    $scope.center = {};
    $scope.smallForward = {};
    $scope.powerForward = {};
    $scope.shootingGuard = {};
    $scope.pointGuard = {};

    $scope.players = {};
    $scope.loadingPlayers = true;

    $scope.selectedPlayer = {};
    $scope.selectedPoste = '';

    getPlayers();

    $scope.getPlayers = getPlayers();

    function getPlayers(){

        ServiceFive.getPlayer().then(function(res){
            $scope.players = res.data;
            $scope.loadingPlayers = false;
        }, function(err){
            console.log(err);
        })

    }

    $scope.clearcenter = function(){
        $scope.players.push($scope.center);
        $scope.center = {};
    }

    $scope.clearsmallForward = function(){
        $scope.players.push($scope.smallForward);
        $scope.smallForward = {};
    }

    $scope.clearpowerForward = function(){
        $scope.players.push($scope.powerForward);
        $scope.powerForward = {};
    }

    $scope.clearshootingGuard = function(){
        $scope.players.push($scope.shootingGuard);
        $scope.shootingGuard = {};
    }

    $scope.clearpointGuard = function(){
        $scope.players.push($scope.pointGuard);
        $scope.pointGuard = {};
    }

    $scope.dropCallback = function (evt, ui) {
        // the model
        var obj = ui.draggable.scope().dndDragItem;

        for(var j=0;j<$scope.players.length;j++){
            if($scope.players[j].playerId == obj.playerId){
                $scope.players.splice(j,1);
                return false;
            }
        }
    };

    $scope.dragCallback = function(evt, ui, player){
        $scope.selectedPlayer = player;
        $scope.selectedPoste = player.position;
        $scope.$apply();
    }

    $scope.dragStopCallback = function(){
        $scope.selectedPlayer = {};
        $scope.selectedPoste = "";
        $scope.$apply();
    }

    $scope.sendTeam = function(){

        var players = {
            "center": $scope.center,
            "smallForward": $scope.smallForward,
            "powerForward": $scope.powerForward,
            "shootingGuard": $scope.shootingGuard,
            "pointGuard": $scope.pointGuard
        };

        ServiceFive.sendTeam(players).then(function(res){
            console.log(res);

        }, function(err){
            console.log(err);
        })
    }

}]);

/*
 Template Name: Upcube - Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Main js
 */

!function(e){"use strict";var t=function(){this.$body=e("body"),this.$wrapper=e("#wrapper"),this.$btnFullScreen=e("#btn-fullscreen"),this.$leftMenuButton=e(".button-menu-mobile"),this.$menuItem=e(".has_sub > a")};t.prototype.initSlimscroll=function(){e(".slimscrollleft").slimscroll({height:"auto",position:"right",size:"10px",color:"#9ea5ab"})},t.prototype.initLeftMenuCollapse=function(){var e=this;this.$leftMenuButton.on("click",function(t){t.preventDefault(),e.$body.toggleClass("fixed-left-void"),e.$wrapper.toggleClass("enlarged")})},t.prototype.initComponents=function(){e('[data-toggle="tooltip"]').tooltip(),e('[data-toggle="popover"]').popover()},t.prototype.initFullScreen=function(){var e=this;e.$btnFullScreen.on("click",function(e){e.preventDefault(),document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen():document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullscreen&&document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)})},t.prototype.initMenu=function(){function t(){e(".has_sub").each(function(){var t=e(this);t.hasClass("nav-active")&&t.find("> ul").slideUp(300,function(){t.removeClass("nav-active")})})}function n(){var t=e(document).height();t>e(".body-content").height()&&e(".body-content").height(t)}var o=this;o.$menuItem.on("click",function(){var i=e(this).parent(),l=i.find("> ul");return o.$body.hasClass("sidebar-collapsed")||(l.is(":visible")?l.slideUp(300,function(){i.removeClass("nav-active"),e(".body-content").css({height:""}),n()}):(t(),i.addClass("nav-active"),l.slideDown(300,function(){n()}))),!1})},t.prototype.activateMenuItem=function(){e("#sidebar-menu a").each(function(){this.href==window.location.href&&(e(this).addClass("active"),e(this).parent().addClass("active"),e(this).parent().parent().prev().addClass("active"),e(this).parent().parent().parent().addClass("active"),e(this).parent().parent().prev().click())})},t.prototype.Preloader=function(){e(window).load(function(){e("#status").fadeOut(),e("#preloader").delay(350).fadeOut("slow"),e("body").delay(350).css({overflow:"visible"})})},t.prototype.init=function(){this.initSlimscroll(),this.initLeftMenuCollapse(),this.initComponents(),this.initFullScreen(),this.initMenu(),this.activateMenuItem(),this.Preloader()},e.MainApp=new t,e.MainApp.Constructor=t}(window.jQuery),function(e){"use strict";e.MainApp.init()}(window.jQuery);