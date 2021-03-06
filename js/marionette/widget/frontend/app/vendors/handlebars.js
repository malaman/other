define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    return function () {

        /**
         * Handlebars setup
         */
        Marionette.Renderer.render = function (source, context) {
            var template = Handlebars.compile(source);
            return template(context);
        };
        /**
         * Base helpers
         */
        Handlebars.registerHelper('staticFile', function (file) {
            return window.application.paths.staticFiles + file;
        });
        Handlebars.registerHelper('selectedValue', function(value1, value2, options) {
          if (value1== value2) {
            return options.fn(this);
          }
        });

    };
});






