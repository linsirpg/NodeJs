/*
* @Author: acer
* @Date:   2017-07-07 14:08:27
* @Last Modified by:   acer
* @Last Modified time: 2017-08-02 17:52:25
*/

'use strict';

app.controller('AdverController', function ($scope, $rootScope, $element, $stateParams, $timeout, $apiService) {
    $scope.MoveToFloor = function(){
       
        $timeout(function(){
            $(window).scrollTop($('.floor-container').offset().top)
        },60);        
    }
})
/** 购物车 控制器 */
app.controller('HomeController', function ($scope, $rootScope, $element, $stateParams, $timeout, $apiService) {
    

    var id = Number($stateParams.id);

    if (!id || isNaN(id)) {
        return ;
    }
    $rootScope.notide11 = function(ev){
        ev.stopPropagation();
        $rootScope.notide1 = true;
    }
    $rootScope.notide22 = function(e){
        e.stopPropagation();
        $rootScope.notide2 = true;
    }
    $rootScope.notide1 = false;
    $rootScope.notide2 = false;
    $rootScope.LcFlage = false;
    if(id == 302){
        $rootScope.LcFlage = true;
    }
    function throttle(method, t){
        var tId;
        t = t || 60;
        return function () {
            var self = this;
            clearTimeout(tId);
            tId = setTimeout(function(){
                method.apply(self, arguments);
            }, t);
        }
    };


    $rootScope.Special = {
        Title: 'DV.生活商城，新年快乐，正品保证，全省包邮',
        Style: '',
        Kind: '',
        Thumbnail: [],
        ThumbnailBanner: [],
        Recomment: null,
        Advert: null,
        Navigation: []
    };
    
    $scope.Special = $rootScope.Special;
    $scope.$statistics = $rootScope.$Statistics;
    $scope.$RecommenStatisticst = $rootScope.$Statistics.of('Recomment');
    $scope.$AdvertStatisticst = $rootScope.$Statistics.of('Advert');
    $scope.floor = {
        placeholderEl: null,
        el: null,
        index: 0,
        data: [],
        dataWidth: [],
        fixedStatus: false,
        moreStatus: false,
        moreMode: false,
        dataLength: 0,
        scrollTop: 0,
        onclick: function (index, Item) {
            // Item.$NavStatisticst.click(Item.Title);
            $scope.floor.moreStatus = false;
            var $el = $element.find('.floor-list-' + index);
            if ($el.length) {
                $('html, body').stop().animate({
                    scrollTop: $el.offset().top - $scope.floor.placeholderEl.height()
                }, 0);
            }
        },
        updateMore: function () {
            $scope.floor.moreStatus = !$scope.floor.moreStatus;
            if ($scope.floor.moreStatus) {
                if ($scope.floor.scrollTop < $scope.floor.placeholderEl.offset().top) {
                    $(window).scrollTop($scope.floor.placeholderEl.offset().top);
                }
                $scope.floor.fixedStatus = true;
            }
        },
        init: function () {

            $scope.floor.placeholderEl = $element.find('.floor-container-placeholder');
            $scope.floor.el = $element.find('.floor-container.swiper-container');


            $scope.floor.dataLength = $scope.floor.data.length;
            $scope.floor.moreMode = $scope.floor.dataLength > 4;

            if (!$scope.floor.moreMode) {
                var titleArrLength = 0;
                for (var i = 0; i < $scope.floor.data.length; i++) {
                    titleArrLength += $scope.floor.data[i].Title ? $scope.floor.data[i].Title.length : 0;
                }
                for (var i = 0; i < $scope.floor.data.length; i++) {
                    var bi = 100 / titleArrLength * ($scope.floor.data[i].Title ? $scope.floor.data[i].Title.length : 0);
                    $scope.floor.dataWidth.push(bi.toFixed(6) + '%');
                }
            }
            if ($scope.floor.moreMode) {
                $timeout(function () {
                    var swiper = new Swiper($scope.floor.el, {
                        freeMode: true,
                        slidesPerView: 'auto',
                        freeModeSticky: true,

                    });
                });
            }
            $(document).click(function(e){

                $rootScope.notide1 = false;
                $rootScope.notide2 = false;
                $scope.$apply();
            })
            $(window).scroll(throttle(function () {
                $rootScope.notide1 = false;
                $rootScope.notide2 = false;
                $scope.floor.scrollTop = Math.floor($(this).scrollTop());
                if ($scope.floor.scrollTop >= Math.floor($scope.floor.placeholderEl.offset().top)) {
                    $scope.floor.fixedStatus = true;
                } else {
                    $scope.floor.fixedStatus = false;
                    $scope.floor.moreStatus = false;
                }
                for (var i = 0; i < $scope.floor.dataLength; i++) {
                    var $el = $element.find('.floor-list-' + i);
                    if (Math.floor($el.offset().top - $scope.floor.placeholderEl.height()) <= $scope.floor.scrollTop) {
                        $scope.floor.index = i;
                    }
                }
                $scope.$apply();
            }, 60));
        }
    };



    if (id) {

        $apiService.GetSpecialActivity(id).then(function ($res) {

            console.log($res);

            $.each($res.Navigation, function (Index, Item) {
                Item.$NavStatisticst = $rootScope.$Statistics.of('NavigationNav');
                Item.$ProductStatisticst = $rootScope.$Statistics.of('Navigation').of(Item.Title);
            })

            $.extend($scope.Special, $res);
            
            if ($scope.Special.Title) {
                window.document.title = $scope.Special.Title;
            }

            $scope.floor.data = $scope.Special.Navigation;

        });
    
    }


    var ff = false;
    $scope.gotopShow = false;
    $(window).scroll(throttle(function () {
        // window.innerHeigh
        var winHeight = document.documentElement.clientHeight;
        var productList = document.getElementsByClassName('floor1-list');
        var index = 0;
        for (var i = 0; i < productList.length; i++) {
            if (Math.floor(productList[i].getBoundingClientRect().top) - winHeight  < 0 ) {
                $rootScope.index = i
                 $scope.floor1.index = i;
            }
        }
        if ($rootScope.swiper) {
            var swiperWidth = $rootScope.swiper.container[0].clientWidth
            var maxTranslate = $rootScope.swiper.maxTranslate();
            var maxWidth = -maxTranslate + swiperWidth / 2;
            var slide = $rootScope.swiper.slides[$rootScope.index];
            var slideLeft = slide.offsetLeft
            var slideWidth = slide.clientWidth
            var slideCenter = slideLeft + slideWidth / 2
            $rootScope.swiper.setWrapperTransition(300)
            if (slideCenter < swiperWidth / 2) {
                $rootScope.swiper.setWrapperTranslate(0)

            } else if (slideCenter > maxWidth) {

                $rootScope.swiper.setWrapperTranslate(maxTranslate)

            } else {

                var nowTlanslate = slideCenter - swiperWidth / 2

                $rootScope.swiper.setWrapperTranslate(-nowTlanslate)
            }
        }
        var pageScrollTop = $(this).scrollTop();
        if ($scope.gotopShow === false && pageScrollTop > 300) {
            $scope.gotopShow = true;
            $scope.$apply();
        } else if ($scope.gotopShow === true && pageScrollTop <= 300) {
            $scope.gotopShow = false;
            $scope.$apply();
        }

    }, 60)).scroll();

    $scope.ontop = function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600);
    var items = document.getElementsByClassName('floor-item')
    items[0].style.fontWeight = 'bold'
    for(var i = 1 ; i <items.length;i++ ){
        items[i].style.fontWeight = 'normal'
        items[i].style.color = ''
    }
    };

});