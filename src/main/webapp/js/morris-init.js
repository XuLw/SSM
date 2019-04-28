var InitiateBarChart = function() {
	return {
		init : function() {
			$.post('/platform/commonIndex/orderMainQty', {}, function(data,
					status) {
				if (status == 'success') {
					Morris.Bar({
						element : 'bar-chart',
						data : data,
						xkey : 'ORDER_ID',
						ykeys : [ 'ORDER_QTY', 'GOOD_QTY' ],
						labels : [ '订单数量', '完成数量' ],
						hideHover : 'auto',
						barColors : [ themeprimary, themesecondary,
								themethirdcolor ]
					});
					Morris.Bar({
						element : 'area-chart',
						data : data,
						xkey : 'ORDER_ID',
						ykeys : ['GOOD_QTY','BAD_QTY'],
						labels : ['良品数量', '不良品数量'],
		                hideHover: 'auto',
		                barColors: [themethirdcolor, themesecondary, themeprimary]
					});
				} else {

				}
			});

		}
	};
}();
