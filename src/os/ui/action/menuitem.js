goog.module('os.ui.action.MenuItem');

const MenuOptions = goog.require('os.ui.action.MenuOptions');
const IMenuItem = goog.requireType('os.ui.action.IMenuItem');


/**
 * Represents a menu item
 *
 * @implements {IMenuItem}
 * @deprecated Please use {@link os.ui.menu.Menu} and {@link os.ui.menu.MenuItem} instead
 */
class MenuItem {
  /**
   * Constructor.
   * @param {!string} name
   * @param {?string} description
   * @param {?MenuOptions=} opt_menuOptions Options for displaying this item in a menu
   */
  constructor(name, description, opt_menuOptions) {
    /**
     * @type {!string}
     * @private
     */
    this.name_ = name;

    /**
     * @type {?string}
     * @private
     */
    this.description_ = description;


    /**
     * @type {!MenuOptions}
     * @private
     */
    this.menuOptions_ = opt_menuOptions || new MenuOptions(null, null, Number.MAX_VALUE);
  }

  /**
   * @inheritDoc
   * @export
   */
  getName() {
    return this.name_;
  }

  /**
   * @inheritDoc
   * @export
   */
  getDescription() {
    return this.description_;
  }

  /**
   * @inheritDoc
   */
  getMenuOptions() {
    return this.menuOptions_;
  }
}

exports = MenuItem;
