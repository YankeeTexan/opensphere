goog.module('os.ui.filter.ui.ViewFiltersUI');
goog.module.declareLegacyNamespace();

goog.require('os.ui.filter.AdvancedFilterBuilderUI');

const {getFirstElementChild, getNextElementSibling} = goog.require('goog.dom');
const {ROOT} = goog.require('os');
const Module = goog.require('os.ui.Module');
const {OPERATIONS} = goog.require('os.ui.filter');
const ExpressionNode = goog.require('os.ui.filter.ui.ExpressionNode');
const GroupNode = goog.require('os.ui.filter.ui.GroupNode');
const {close} = goog.require('os.ui.window');

const FilterEntry = goog.requireType('os.filter.FilterEntry');


/**
 * The filter window directive
 *
 * @return {angular.Directive}
 */
const directive = () => ({
  restrict: 'AE',
  replace: true,
  scope: true,
  templateUrl: ROOT + 'views/filter/viewfilters.html',
  controller: Controller,
  controllerAs: 'filters'
});

/**
 * The element tag for the directive.
 * @type {string}
 */
const directiveTag = 'viewfilter';

/**
 * Add the directive to the module
 */
Module.directive(directiveTag, [directive]);

/**
 * Controller for the filters window.
 * @unrestricted
 */
class Controller {
  /**
   * Constructor.
   * @param {!angular.Scope} $scope The Angular scope.
   * @param {!angular.JQLite} $element The root DOM element.
   * @ngInject
   */
  constructor($scope, $element) {
    /**
     * @type {?angular.Scope}
     * @protected
     */
    this.scope = $scope;

    /**
     * @type {?angular.JQLite}
     * @protected
     */
    this.element = $element;

    /**
     * @type {FilterEntry}
     * @protected
     */
    this.entry = /** @type {FilterEntry} */ ($scope['entry']);

    /**
     * @type {?GroupNode}
     */
    this['root'] = null;

    /**
     * @type {?string}
     */
    this['title'] = this.entry.getTitle();

    /**
     * @type {?string}
     */
    this['description'] = this.entry.getDescription();

    this.create_();

    $scope.$on('$destroy', this.onDestroy_.bind(this));
  }

  /**
   * Cleanup
   *
   * @private
   */
  onDestroy_() {
    closeRemoveMultipleWindow();
    this.scope = null;
    this.element = null;
  }

  /**
   * Creates the expressions from the filter
   *
   * @param {goog.events.Event=} opt_event
   * @private
   */
  create_(opt_event) {
    this['root'] = new GroupNode(true);
    var node = this.entry.getFilterNode();

    if (node) {
      this['root'].setGrouping(node.localName);
      this.readFilters_(node, this['root']);
    }
  }

  /**
   * Traverses the filter XML and adds nodes to the slicktree.
   *
   * @param {Node} ele
   * @param {os.structs.ITreeNode} treeNode
   * @private
   */
  readFilters_(ele, treeNode) {
    var child = getFirstElementChild(ele);
    var next = null;

    while (child) {
      var childTreeNode = this.addTreeNode_(child, treeNode);
      next = getNextElementSibling(child);
      if (childTreeNode instanceof GroupNode) {
        this.readFilters_(child, childTreeNode);
      }
      child = next;
    }
  }

  /**
   * Creates a tree node for the child and adds it as a child to the treeNode passed in.
   *
   * @param {Node} child
   * @param {os.structs.ITreeNode} treeNode
   * @return {os.structs.ITreeNode}
   * @private
   */
  addTreeNode_(child, treeNode) {
    var isExpr = false;
    for (var i = 0; i < OPERATIONS.length; i++) {
      if (OPERATIONS[i].matches(angular.element(child))) {
        isExpr = true;
        break;
      }
    }

    if (!isExpr) {
      // add a grouping node
      var groupNode = new GroupNode(true);
      groupNode.setGrouping(child.localName);
      treeNode.addChild(groupNode);
      return groupNode;
    } else {
      // add an expression node
      var exprNode = ExpressionNode.createExpressionNode(child, this.scope['columns'], true);
      treeNode.addChild(exprNode);
      treeNode.collapsed = false;
      return exprNode;
    }
  }

  /**
   * Cancels the filter
   *
   * @export
   */
  cancel() {
    close(this.element);
  }
}

/**
 * Closes the expression view window.
 */
const closeRemoveMultipleWindow = () => {
  var childWindow = angular.element('#removeMultiple');
  if (childWindow) {
    close(childWindow);
  }
};

exports = {
  Controller,
  directive,
  directiveTag
};
