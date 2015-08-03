define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var YearsView = require('./views/years_view');
  var ManufacturersView = require('./views/manufacturers_view');
  var ModelsView = require('./views/models_view');
  var ButtonView = require('./views/button_view');
  var WidgetSelectView = require('./views/widget_select_view');
  var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.years = [];
      this.manufacturers = [];
      this.models = [];
      this.series = [];
      this.modifications = [];
      this.selectedYear = null;
      this.selectedManufacturer = null;
      this.selectedModel = null;
      this.selectedModification = null;
    },

    step1: function() {
      var self = this;
      var yearsPromise = this.app.request('widget:getYears');
      var manufacturersPromise = this.app.request('widget:manufacturers');
      var promises = [yearsPromise, manufacturersPromise];
      self.currentStep = new this.app.models.Step({});
      self.models = new self.app.models.ModelCollection([{id: 0, ru_name: 'Please select model'}]);
      self.modifications = new self.app.models.ModificationCollection([{id: 0, ru_name: 'Please select model'}]);

      $.when(yearsPromise).done(function(data) {
        self.years = new self.app.models.YearCollection(data);
      });
      $.when(manufacturersPromise).done(function(data) {
        self.manufacturers = data;
      });
      $.when.apply($, promises).then(function() {

        var yearsView = new YearsView( {
          collection: self.years
        });
        self.app.first.show(yearsView);
        var manufacturersView = new ManufacturersView( {
          collection: self.manufacturers
        });
        var modelsView = new ModelsView({
          collection: self.models
        });
        self.buttonView = new ButtonView({
          model: self.currentStep
        });
        self.app.second.show(manufacturersView);
        self.app.third.show(modelsView);
        self.app.fourth.show(self.buttonView);

        yearsView.on('step1:yearChanged', function(event) {
          self.selectedYear = event.target.value;
          var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});

          $.when(manufacturersPromise).done(function(data) {
            self.manufacturers.reset(data.models);
          });
        });

        manufacturersView.on('step1:manufacturerChanged', function(event) {
          self.selectedManufacturer = {
            id:event.target.value,
            ru_name: $(event.target).find('option:selected').text()
          };
          var modelsPromise = self.app.request('widget:getModels', {manufacturer: self.selectedManufacturer.id,
            year: self.selectedYear});
          $.when(modelsPromise).done(function(data) {
            self.models.reset(data);
            if (self.models.length === 1) {
              self.selectedModel = self.models.models[0].attributes;
            }
          });
        });
        modelsView.on('step1:modelChanged', function(event) {
          self.selectedModel = {
            id:event.target.value,
            ru_name: $(event.target).find('option:selected').text()
          };
          var seriesPromise = self.app.request('widget:getSeries', {
            model: self.selectedModel.id,
            year: self.selectedYear
          });
          $.when(seriesPromise).done(function(data) {
            self.series = new self.app.models.SeriaCollection(data);
            self.selectedSeria = self.series.models[0].attributes;
            var modificationPromise = self.app.request('widget:getModifications', {
              seria: self.selectedSeria.id
            });
            $.when(modificationPromise).done(function(data) {
              self.modifications.reset(data);
              self.selectedModification = self.modifications.models[0].attributes;
            });
          });
        });

        self.buttonView.on('step1:buttonClicked', function() {
          self.step2();
        });

      });
    },

    step2: function() {
      var self = this;
      var seriesView = new WidgetSelectView({
        collection: self.series,
        caption: 'seria',
        step: 'step2'
      });
      var modificationsView = new WidgetSelectView({
        collection: self.modifications,
        caption: 'modification',
        step: 'step2'
      });
      self.currentStep.set({step: 'step2'});
      self.app.first.show(seriesView);
      self.app.second.show(modificationsView);
      self.app.third.close();

      seriesView.on('step2:seriaChanged', function(event) {
        self.selectedSeria = {
          id:event.target.value,
          ru_name: $(event.target).find('option:selected').text()
        };
        var modificationPromise = self.app.request('widget:getModifications', {
            seria: self.selectedSeria.id
          });
          $.when(modificationPromise).done(function(data) {
            self.modifications.reset(data);
            self.selectedModification = self.modifications.models[0].attributes;
          });

      });
      modificationsView.on('step2:modificationChanged', function(event) {
        self.selectedModification = {
          id:event.target.value,
          ru_name: $(event.target).find('option:selected').text()
        };
      });
      self.buttonView.on('step2:buttonClicked', function() {
        console.log(self.selectedSeria);
        console.log(self.selectedModification);

      });

    },

    index : function () {
      this.step1();
    }
  });

});