angular.module("contactsBook").directive("uiLetterMarker", function () {
    return {
        templateUrl: "modules/contacts/template/ui-letter-marker.template.html",
        replace: true,
        restrict: "AE",
        scope: {
            letter: "=",
            selectedcolor: "="
        }
    };
});