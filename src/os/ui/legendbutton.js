goog.module('os.ui.LegendButtonUI');
goog.module.declareLegacyNamespace();

const {ID} = goog.require('os.legend');
const {Map: MapKeys} = goog.require('os.metrics.keys');
const Module = goog.require('os.ui.Module');
const MenuButtonCtrl = goog.require('os.ui.menu.MenuButtonCtrl');


/**
 * The add data button bar directive
 *
 * @return {angular.Directive}
 */
<<<<<<< HEAD
const directive = () => ({
  restrict: 'E',
  replace: true,
  scope: true,
  controller: Controller,
  controllerAs: 'ctrl',
  template: '<button class="btn btn-secondary" title="View Legend"' +
    ' ng-click="ctrl.toggle()"' +
    ' ng-class="{active: ctrl.isWindowActive()}">' +
    '<i class="fa fa-map-signs"></i>' +
    '</button>'
});
=======
os.ui.legendButtonDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    controller: os.ui.LegendButtonCtrl,
    controllerAs: 'ctrl',
    template: '<button class="btn btn-secondary" title="View the map legend"' +
      ' ng-click="ctrl.toggle()"' +
      ' ng-class="{active: ctrl.isWindowActive()}">' +
      '<i class="fa fa-map-signs"></i> Legend' +
      '</button>'
  };
};
>>>>>>> 83ac11865 (feat: added labels and descriptions to nav bar buttons)

/**
 * The element tag for the directive.
 * @type {string}
 */
const directiveTag = 'legend-button';

/**
 * add the directive to the module
 */
Module.directive('legendButton', [directive]);

/**
 * @unrestricted
 */
class Controller extends MenuButtonCtrl {
  /**
   * Constructor.
   * @param {!angular.Scope} $scope
   * @param {!angular.JQLite} $element The element
   * @ngInject
   */
  constructor($scope, $element) {
    super($scope, $element);
    this.flag = ID;
    this.metricKey = MapKeys.SHOW_LEGEND;
  }
}

exports = {
  Controller,
  directive,
  directiveTag
};
