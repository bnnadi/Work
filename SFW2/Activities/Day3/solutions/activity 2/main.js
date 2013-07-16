/*
Description: Activity 2-2
Author: Lyndon Modomo
Date: 5/13/13
*/

$(function(){

	for (var i = 0; i < 10; i++) {

		$('<li><a href=”#”>' + i + '</a></li>')
			.appendTo('#navleft')
			.find('a')
			.css({
				color: '#e50',
				fontSize: 14
			});
	};

	$('#navleft').find('li')
		.clone()
		.appendTo('#navright')
		.find('a')
		.css({fontSize: 30})
	;	


});