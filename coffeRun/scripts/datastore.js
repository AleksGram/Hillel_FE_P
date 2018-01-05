(function (window) {
    'use strict';
    var App = window.App || {};
    var data = {};
    function DataStore() {
        // this.data = {};

    }
    DataStore.prototype.add = function (key, val) {
        // this.data[key] = val;
        data[key] = val;
    };
    App.DataStore = DataStore;
    window.App = App;

    DataStore.prototype.get = function (key) {
        // return this.data[key];
        return data[key];
    };

    DataStore.prototype.getAll = function () {
        // return this.data;
        return data;
    };
    DataStore.prototype.remove = function(key){
        // delete this.data[key];
        delete data[key];
    }

})(window);