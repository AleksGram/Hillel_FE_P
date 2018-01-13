(function (window) {
	var App = window.App || {};
	var $ = window.jQuery;
	function CheckList(selector) {
		if(!selector){
			throw new Error('No selector provided')
		}
		this.$element = $(selector);
		if(this.$element.length === 0){
			throw new Error('Could not find element with selector: ' + selector);
		}
	}
	function Row(coffeeOrder) {
		var $div = $('<div></div>',{
			'data-coffee-order': 'checkbox',
			'class': 'checkbox'
		});
		var $label = $('<label></label>');
		var $checkbox = $('<input></input>', {
			type: 'checkbox',
			value: coffeeOrder.emailAddress
		});
		// var description = coffeeOrder.size + ' ';
		var description = 'Strength : ' + coffeeOrder.strength + ' %, ';
		if (coffeeOrder.flavor) {
			var styleOrder = $label[0].style;
			styleOrder.color = 'white';
			switch (coffeeOrder.flavor){
				case 'caramel':
					styleOrder.background = 'brown';
					break;
				case 'almond' :
					styleOrder.background = 'green';
					break;
				case 'mocha' :
					styleOrder.background = 'grey';
			}
			// styleOrder.background = 'purple';
			// styleOrder.color = 'white';
			description += coffeeOrder.flavor + ' ';
		}
		description += coffeeOrder.coffee + ', ';
		description += ' (' + coffeeOrder.emailAddress + ')';
		// description += ' [' + coffeeOrder.strength + 'x]';

		$label.append($checkbox);
		$label.append(description);
		$div.append($label);
		this.$element = $div;
	}
	CheckList.prototype.addRow = function (coffeeOrder) {
		this.removeRow(coffeeOrder.emailAddress);
		var rowElement = new Row(coffeeOrder);
		this.$element.append(rowElement.$element);
	};
	CheckList.prototype.removeRow = function (email) {
		this.$element
			.find('[value="' + email + '"]')
			.closest('[data-coffee-order="checkbox"]')
			.remove();
	};
	CheckList.prototype.addClickHandler = function (fn) {
		this.$element.on('click', 'input', function (event) {
			var email = event.target.value;
			this.removeRow(email);
			fn(email);
		}.bind(this));
	};
	var getObject = function (arr, index) {
		var single = arr[index];
		return single;
	};

	App.CheckList = CheckList;
	window.App = App;

})(window);