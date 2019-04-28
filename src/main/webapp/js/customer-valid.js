(function($) {
	$.fn.bootstrapValidator.i18n.greaterThanField = $.extend(
			$.fn.bootstrapValidator.i18n.greaterThanField || {}, {
				'default' : 'Please enter a value greater than or equal to %s',
				notInclusive : 'Please enter a value greater than %s'
			});
	$.fn.bootstrapValidator.validators.greaterThanField = {
		html5Attributes : {
			message : 'message',
			fieldId : 'fieldId', // 多个用','分开
			inclusive : 'inclusive'
		},
		enableByHtml5 : function($field) {
			var type = $field.attr('type'), min = $field.attr('min');
			if (min && type !== 'date') {
				return {
					value : min
				};
			}
			return false;
		},
		validate : function(validator, $field, options) {
			var result = false, resultValue;
			var value = $field.val();
			var fieldId = options.fieldId;
			if (value === '' || fieldId === '')
				return true;
			value = this._format(value);
			if ($.isNumeric(value)) {
				var fieldIdList = fieldId.split(",");
				for (var i = 0; i < fieldIdList.length; i++) {
					var tmp = $.trim(fieldIdList[i]);
					var compareTo = $(tmp).val();
					if (compareTo === '')
						continue;
					if ($.isNumeric(compareTo)) {
						var compareToValue = parseFloat(compareTo);
						value = parseFloat(value);
						var result = (options.inclusive === true || options.inclusive === undefined) ? value >= compareToValue
								: value > compareToValue;
						if (!result) {
							resultValue = compareTo;
							break;
						}
					} else {
						result = false;
					}
				}
			} else {
				result = false;
			}
			return {
				valid : result,
				message : resultValue == null ? "please input number"
						: $.fn.bootstrapValidator.helpers
								.format(
										options.message
												|| $.fn.bootstrapValidator.i18n.greaterThanField.notInclusive,
										resultValue)
			};
		},
		_format : function(value) {
			return (value + '').replace(',', '.');
		}
	};
}(window.jQuery));
;
(function($) {
	$.fn.bootstrapValidator.i18n.lessThanField = $.extend(
			$.fn.bootstrapValidator.i18n.lessThanField || {}, {
				'default' : 'Please enter a value less than or equal to %s',
				notInclusive : 'Please enter a value less than %s'
			});
	$.fn.bootstrapValidator.validators.lessThanField = {
		html5Attributes : {
			message : 'message',
			fieldId : 'fieldId', // 多个用','分开
			inclusive : 'inclusive',
			dateFormat : 'dateFormat' // "YYYY/MM/DD"
		},
		enableByHtml5 : function($field) {
			var type = $field.attr('type'), max = $field.attr('max');
			if (max && type !== 'date') {
				return {
					value : max
				};
			}
			return false;
		},
		validate : function(validator, $field, options) {
			var result = false, resultValue;
			var value = $field.val();
			var fieldId = options.fieldId;
			var type = $field.attr('type');
			if (value === '' || fieldId === '')
				return true;
			value = this._format(value);

			if ($.isNumeric(value)) {
				var fieldIdList = fieldId.split(",");
				for (var i = 0; i < fieldIdList.length; i++) {
					var tmp = $.trim(fieldIdList[i]);
					var compareTo = $(tmp).val();
					if (compareTo === '')
						continue;
					if ($.isNumeric(compareTo)) {
						var compareToValue = parseFloat(compareTo);
						value = parseFloat(value);
						var result = (options.inclusive === true || options.inclusive === undefined) ? value <= compareToValue
								: value < compareToValue;
						if (!result) {
							resultValue = compareTo;
							break;
						}
					} else {
						result = false;
					}
				}
			} else {
				result = false;
			}
			return {
				valid : result,
				message : resultValue == null ? "please input number"
						: $.fn.bootstrapValidator.helpers
								.format(
										options.message
												|| $.fn.bootstrapValidator.i18n.lessThanField.notInclusive,
										resultValue)
			};
		},
		_format : function(value) {
			return (value + '').replace(',', '.');
		}
	};
}(window.jQuery));