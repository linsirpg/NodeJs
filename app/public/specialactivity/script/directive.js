

app.directive('onFinishRenderFilters', [function () {

    var findValue = function (object, props) {

        if (!props || !props.length) return object;
        if (typeof props === 'string') props = props.split(".");

        var prop = props.splice(0, 1);

        if(object && typeof object[prop] !== 'undefined'){
            return findValue(object[prop], props);
        } else{  
            return undefined;  
        }
    }

    function baseAt(object, paths) {
        var index = -1,
            length = paths.length,
            result = Array(length),
            skip = object == null;
        
        while (++index < length) {
            result[index] = skip ? undefined : get(object, paths[index]);
        }
        return result;
    }
      
    var link = function (scope, element, attr) {
        if(scope.$last === true) {
            var finishFunc = findValue(scope.$parent, attr.onFinishRenderFilters);

            return finishFunc && finishFunc();
        }
    };


    return {
        restrict: 'A',
        link: link
    }
}]);


app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});