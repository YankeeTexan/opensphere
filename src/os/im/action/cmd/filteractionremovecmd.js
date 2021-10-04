goog.declareModuleId('os.im.action.cmd.FilterActionRemove');

import State from '../../../command/state.js';
import AbstractFilterAction from './abstractfilteractioncmd.js';

const {default: FilterActionEntry} = goog.requireType('os.im.action.FilterActionEntry');


/**
 * Command for removing filter actions.
 */
export default class FilterActionRemove extends AbstractFilterAction {
  /**
   * Constructor.
   * @param {!FilterActionEntry} entry The filter action.
   * @param {number=} opt_index The index in the entry list.
   * @param {string=} opt_parentId The parent node ID.
   */
  constructor(entry, opt_index, opt_parentId) {
    super(entry, opt_index, opt_parentId);

    if (entry) {
      this.title = 'Remove ' + this.entryTitle + ' "' + entry.getTitle() + '"';
    }
  }

  /**
   * @inheritDoc
   */
  execute() {
    if (this.canExecute()) {
      this.state = State.EXECUTING;

      this.remove();
      this.state = State.SUCCESS;
      return true;
    }

    return false;
  }

  /**
   * @inheritDoc
   */
  revert() {
    this.state = State.REVERTING;

    this.add();
    this.state = State.READY;
    return true;
  }
}
