(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url){
            throw new Error('No remote URL supplied.');
        }
        this.severUrl = url;
    }
    RemoteDataStore.prototype.add  = function (key, val) {
        $.post(this.severUrl, val, function (serverResponse) {
            console.log(serverResponse);
        } )
    };
    RemoteDataStore.prototype.getAll = function (cb) {
        $.get(this.severUrl, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };
    RemoteDataStore.prototype.get = function (key, cb) {
        $.get(this.severUrl + '/' + key, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };
    RemoteDataStore.prototype.remove = function (key) {
        $.ajax(this.severUrl + '/' + key, {
            type: 'DELETE'
        });
    };
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);