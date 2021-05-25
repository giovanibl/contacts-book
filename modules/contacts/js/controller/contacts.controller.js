angular.module("contactsBook").controller("contactsBookCtrl", function ($scope, ngDialog) {
    $scope.contactsList = [];

    $scope.OpenCreateEditContactDialog = function(contact) {
        $scope.contact = angular.copy(contact);
        $scope.dialogTitle = !contact ? 'Criar novo contato' : 'Editar contato';

        ngDialog.open({
            template: 'modules/contacts/template/contacts.dialog.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            showClose: false,
            closeByDocument: false
        });
    };

    $scope.OpenDeleteContactDialog = function(contact) {
        $scope.dialogTitle = 'Excluir contato';
        $scope.contact = contact;
        ngDialog.open({
            template: 'modules/contacts/template/delete-contacts.dialog.html',
            className: 'ngdialog-theme-default delete-contact',
            scope: $scope,
            showClose: false,
            closeByDocument: false
        });
    };

    $scope.generateColor = function () {
        return Math.floor(Math.random()*16777215).toString(16);
    };

    $scope.generateNewId = function () {
        var contactList = $scope.contactsList,
            lastId = 1;

        if (contactList.length === 0) { 
            return lastId; 
        } else {
            lastId = contactList[contactList.length - 1].id;
            return lastId + 1;
        }
    };

    $scope.findIndexById = function (contactId) {
        return $scope.contactsList.findIndex(x => x.id === contactId);
    };

    $scope.saveContact = function (contact) {
        var index = this.findIndexById(contact.id);

        if (index === -1) {
            contact.id = this.generateNewId();
            contact.color = this.generateColor();
            $scope.contactsList.push(angular.copy(contact));
            delete $scope.contact;
            this.setHighlight(contact.id);
        } else {
            $scope.contactsList[index] = contact;
        }

        this.closeThisDialog();
    };

    $scope.deleteContact = function (contact) {
        var index = this.findIndexById(contact.id);

        $scope.contactsList.splice(index, 1);
        this.closeThisDialog();
    };

    $scope.setHighlight = function (contactId) {
        setTimeout(function() {
            var currentContact = angular.element(document.querySelector('#contact-'+contactId));
            currentContact[0].classList.add('highlight');
            setTimeout(function () {
                currentContact[0].classList.remove('highlight');
            }, 10000);
        },300);
    };

    $scope.isFormValid = function (contact) {
        return !contact || (!contact.name && !contact.phone && !contact.email);        
    }
});