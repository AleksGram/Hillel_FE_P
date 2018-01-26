(function (window) {
    'use strict';
    var App = window.App || {};
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }
    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ',/* email.value*/ order.emailAddress);
       return this.db.add(order.emailAddress, order);
    };
    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
       return this.db.remove(customerId);
    };
    Truck.prototype.printOrders = function () {
        var customerIdarray = Object.keys(this.db.getAll());
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdarray.forEach(function (id) {
            console.log(this.db.get(id));
        }, this)
    };
	var getObject = function (arr, index) {
		var single = arr[index];
		return single;
	};

	App.Truck = Truck;
    window.App = App;
})(window);
