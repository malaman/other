define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  //var WidgetView = require('./views/step1');
  var YearsView = require('./views/years_view');
  var ManufacturersView = require('./views/manufacturers_view');
  //var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.selectedYear = null;
      this.selectedManufacturer = null;
      this.years = [];
      this.manufacturers = [{id: 0, ru_name: 'Please select manufacturer'}];
      this.models = [{id: 0, ru_name: 'Please select model'}];
    },
      index : function () {
        var self = this;
        this.years = this.app.request('widget:getYears');
        var yearsView = new YearsView({collection: self.years});
        this.app.first.show(yearsView);

        var manufacturersPromise = this.app.request('widget:manufacturers');
        $.when(manufacturersPromise).done(function(data) {
          self.manufacturers = data;
          var manufacturersView = new ManufacturersView({collection:self.manufacturers});
          self.app.second.show(manufacturersView);
        });


        //var self = this;
        //var yearsPromise = this.app.request('widget:years');
        //var manufacturersPromise = this.app.request('widget:manufacturers');
        //var promises = [yearsPromise, manufacturersPromise];
        //this.initialize(this.options);
        //
        //$.when(yearsPromise).done(function(data) {
        //  self.years = data;
        //});
        //
        //$.when(manufacturersPromise).done(function(data) {
        //  self.manufacturers = data;
        //});
        //$.when.apply($, promises).then(function() {
        //  var Step1View = new WidgetView( {
        //    years: self.years,
        //    manufacturers: self.manufacturers,
        //    models: self.models,
        //    selectedYear: self.selectedYear,
        //    selectedManufacturer: self.selectedManufacturer,
        //    selectedModel: self.selectedModel
        //  });
        //
        //  Step1View.on('step1:yearChanged', function(event) {
        //    self.selectedYear = event.target.value;
        //    var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});
        //
        //    $.when(manufacturersPromise).done(function(data) {
        //      self.manufacturers = data;
        //    });
        //
        //  });
        //
        //  Step1View.on('step1:manufacturerChanged', function(event) {
        //    self.selectedManufacturer = {
        //      id:event.target.value,
        //      ru_name: $(event.target).find('option:selected').text()
        //    };
        //    var modelsPromise = self.app.request('widget:getModels', {manufacturer: self.selectedManufacturer.id,
        //      year: self.selectedYear});
        //    $.when(modelsPromise).done(function(data) {
        //      self.models = data;
        //    });
        //  });
        //
        //  Step1View.on('step1:modelChanged', function(event) {
        //    self.selectedModel = {
        //      id: event.target.value,
        //      ru_name:$(event.target).find('option:selected').text()
        //    };
        //  });
        //
        //  self.app.first.show(Step1View);
        //});
      }
  });

});