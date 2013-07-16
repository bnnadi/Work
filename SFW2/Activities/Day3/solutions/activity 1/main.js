/*
Description: DESCRIPTION INFO GOES HERE
Author: Lyndon Modomo
Date: DATE GOES HERE
*/

$(function(){

	var leftNav = $('#contentleft'),
		rightNav = $('#contentright'),
		leftNavUL = leftNav.find('ul'),
		rightNavUL = rightNav.find('ul')
	;	 

	leftNavUL.css('backgroundColor', '#ff9933');
	//leftNavUL.css({backgroundColor: "orange"});

	console.log('Top Offset:', leftNavUL.offset().top);
	console.log('Top Position:', leftNavUL.position().top);

	leftNavUL.find('li:eq(1)').css({marginLeft: 30});

	leftNavUL.find('li:eq(3)').css({color: 'red'});

	console.log(leftNavUL.find('li').filter(':eq(3)').width());

	var h3Right = rightNav.find('h3').css({float: 'right'});

	h3Right.addClass('listhead');

	console.log("listhead: ", h3Right.hasClass('listhead'));

	console.log(rightNavUL);

	rightNavUL
		.find('li')
		.children(':eq(2)')
		.attr('href', 'http://www.us.playstation.com')
	;

	rightNavUL
		.find('a')
		.not(':eq(0)')
		.attr('href', 'http://nogoogle.com')
	;


});