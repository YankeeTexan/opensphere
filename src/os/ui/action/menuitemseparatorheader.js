goog.module('os.ui.action.MenuItemSeparatorHeader');

const MenuItem = goog.require('os.ui.action.MenuItem');
const IMenuItem = goog.requireType('os.ui.action.IMenuItem');


/**
 * Represents a menu divider with a name
 *
 * @implements {IMenuItem}
 * @deprecated Please use os.ui.menu.MenuItemType.SEPARATOR instead.
 */
class MenuItemSeparatorHeader extends MenuItem {
  /**
   * Constructor.
   * @param {string} name The name of the header
   * @suppress {deprecated}
   */
  constructor(name) {
    super(name, null);

    /**
     * Defines this class as a separator name
     * @type {boolean}
     * @export
     */
    this.isSeparatorHeader = true;
  }
}

exports = MenuItemSeparatorHeader;
