angular.module('Curve')
	.filter('salesColumnName', function(){
		
		return function(value) {
			var templateFields = [{ name: "Ignore", value: "ignore" }, { name: "Distribution Channel", value: "originalDistributionChannel" }, { name: "Configuration", value: "originalConfiguration" }, { name: "Price Category", value: "originalPriceCategory" }, { name: "Release Title", value: "originalReleaseTitle" }, { name: "Release Artist", value: "originalReleaseArtist" }, { name: "Track Title", value: "originalTrackTitle" }, { name: "Track Artist", value: "originalTrackArtist" }, { name: "Cat No", value: "catNo" }, { name: "Barcode", value: "barcode" }, { name: "ISRC", value: "isrc" }, { name: "Work Identifier", value: "originalIdentifier" }, { name: "Territory", value: "originalTerritory" }, { name: "Sale Date", value: "saleDate" }, { name: "Transaction Date", value: "transactionDate" }, { name: "Source", value: "source" }, { name: "Sub Source", value: "subSource" }, { name: "Units", value: "units" }, { name: "Sale Price", value: "salePrice" }, { name: "Original Currency", value: "originalCurrency" }, { name: "Exchange Rate", value: "exchangeRate" }, { name: "Gross Amount", value: "grossAmount" }, { name: "Net Amount", value: "netAmount" }, { name: "Per Unit Rate", value: "perUnitRate" }];
			for(var i = 0; i < templateFields.length; i++) {
				if(templateFields[i]['value'] === value) {
					return templateFields[i]['name'];
				}
			}
		}
		
	}); 