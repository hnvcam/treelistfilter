/**
 * Tree List Filter jQuery plugin 1.0
 * 
 * Copyright (c) 2014, AIWSolutions
 * License: GPL2
 * Project Website: http://wiki.aiwsolutions.net/dOQKO
 **/

jQuery.fn.treeListFilter = function(list, timeout) {
	var list = jQuery(list);
	var input = this;
	var keyTimeout;
	var lastFilter = '';
	
	// Default timeout	
	if (timeout === undefined) {
		timeout = 200;
	}
	
	function filterList(ulObject, filterValue) {
		if (!ulObject.is('ul') && !ulObject.is('ol')) {
			return false;
		}
		var children = ulObject.children();
		var result = false;
		for (var i = 0; i < children.length; i++) {
			var liObject = jQuery(children[i]);
			if(liObject.is('li')) {
				var display = false;
				if (liObject.children().length > 0) {
					for (var j = 0; j < liObject.children().length; j++) {
						var subDisplay = filterList(jQuery(liObject.children()[j]), filterValue);
						display = display || subDisplay;
					}
				}
				if (!display) {
					var text = liObject.text();
					display = text.toLowerCase().indexOf(filterValue) >= 0;
				}			
				liObject.css('display', display ? '' : 'none');
				result = result || display;
			} 
		}
		return result;
	}
		
	input.change(function() {
		var filter = input.val().toLowerCase();
		//var startTime = new Date().getTime();
		filterList(list, filter);
		//var endTime = new Date().getTime();
		//console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + 'ms');
		return false;
	}).keydown(function() {
		clearTimeout(keyTimeout);
		keyTimeout = setTimeout(function() {
			if( input.val() === lastFilter ) return;
			lastFilter = input.val();
			input.change();
		}, timeout);
	});
	return this;
}

