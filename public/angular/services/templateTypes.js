angular.module('Curve')
	.factory('TemplateTypes', function TemplateTypesFactory(){
		var TemplateTypes = [{name:"String",value:"String"},{name:"Number",value:"Float"},{name:"Boolean",value:"Boolean"},{name:"Date",value:"Date"},{name:"Blank",value:"Blank"}];
		return TemplateTypes;
	});