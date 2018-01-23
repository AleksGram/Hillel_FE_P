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
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);