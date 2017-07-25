angular.module('Curve')
  .factory('TemplateTypes', function TemplateTypesFactory() {
    var TemplateTypes = [{ name: "String", value: "String" }, { name: "Number", value: "Number" }, { name: "Boolean", value: "Boolean" }, { name: "Date", value: "Date" }, { name: "Date: DD/MM/YYYY", value: "Date: DD/MM/YYYY" }, { name: "Date: MM/DD/YYYY", value: "Date: MM/DD/YYYY" }, { name: "Date: DD-MM-YYYY", value: "Date: DD-MM-YYYY" }, { name: "Date: MM-DD-YYYY", value: "Date: MM-DD-YYYY" }, { name: "Ignore", value: "ignore" }];
    return TemplateTypes;
  });
