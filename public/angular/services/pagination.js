angular.module('Curve')
	.factory('Pagination', function PaginationFactory(){
		return {
			createArray: function(current_page, pages) {
				var pagesArray = [];
				if(pages > 5 && current_page < 3) {
					pagesArray = [1, 2, 3, 4, 5];
				} else if(pages > 5 && current_page > 3 && current_page == pages) {
					for (var i = current_page - 4; i <= current_page; i++) { pagesArray.push(i); };
				} else if(pages > 5 && current_page > 3 && current_page == pages - 1) {
					for (var i = current_page - 3; i <= current_page + 1; i++) { pagesArray.push(i); };
				} else if(pages > 5 && current_page > 3) {
					for (var i = current_page - 2; i <= current_page + 2; i++) { pagesArray.push(i); };
				} else {
					for (var i = 1; i <= pages; i++) { pagesArray.push(i); };
				}
				return pagesArray;
			}
		};
	});