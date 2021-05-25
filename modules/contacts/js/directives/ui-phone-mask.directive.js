angular.module("contactsBook").directive("uiPhoneMask", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatPhoneNumber = function (phoneNumber) {
                phoneNumber = phoneNumber.replace(/[^0-9]+/g, "");
                
                if (phoneNumber.length > 2) {
                    phoneNumber = phoneNumber.substring(0,0) + "(" + phoneNumber.substring(0);
                    phoneNumber = phoneNumber.substring(0,3) + ") " + phoneNumber.substring(3);
                }

                if (phoneNumber.length > 10){
                    phoneNumber = phoneNumber.substring(0,10) + "-" + phoneNumber.substring(10,14);
                }

                return phoneNumber;
            };

            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatPhoneNumber(ctrl.$viewValue));
                ctrl.$render();
            });
        }
    };
});