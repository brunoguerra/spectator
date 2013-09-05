"use strict";angular.module("spectatorApp",["ngRoute","ui.ace"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("spectatorApp").controller("MainCtrl",["$scope","Converter",function(a,b){var c="last-spec",d=null,e=_.debounce(function(a){localStorage.setItem(c,a)},1e3),f=function(){return localStorage.getItem(c)};a.engineReady=!1,a.yaml={content:null,error:null},a.testScript={content:null,error:null},b.fetch("SpecToJasmine").then(function(b){d=b,a.engineReady=!0;var c=f();a.yaml.content=c?c:"Service - Contact:\n    - has a name\n    - has an address:\n        - has pin code\n        - has street number"}),a.$watch("yaml.content",function(){e(a.yaml.content),d&&d.convert(a.yaml.content).then(function(b){a.testScript.content=b?b:null,a.yaml.error=null},function(b){a.yaml.content&&(a.yaml.error=b)})})}]),angular.module("spectatorApp").service("Converter",["$injector","$q",function(a){return{fetch:function(b){return a.get(b+"Converter").init()}}}]),angular.module("spectatorApp").service("SpecToJasmineConverter",["$http","$q",function(a,b){var c,d,e=function(a){var b=f(a);return b},f=function(a){var b="";if(a instanceof Array)angular.forEach(a,function(a){b+=e(a)});else switch(typeof a){case"object":angular.forEach(a,function(a,d){b+=c({name:d,more:e(a)})});break;case"string":case"number":b=d({example:a});break;default:new Error("Unknown type")}return js_beautify(b)},g={init:function(){var e=b.defer();return a.get("views/converter_templates/describe.tmplt").then(function(b){c=_.template(b.data),a.get("views/converter_templates/it.tmplt").then(function(a){d=_.template(a.data),e.resolve(g)})}),e.promise},convert:function(a){var c=b.defer();try{var d=jsyaml.load(a);d?c.resolve(f(d)):c.resolve(d)}catch(e){c.reject(e.message)}return c.promise}};return g}]);