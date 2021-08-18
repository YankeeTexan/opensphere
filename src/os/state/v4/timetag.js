goog.module('os.state.v4.TimeTag');
goog.module.declareLegacyNamespace();


/**
 * XML tags for time state
 * @enum {string}
 */
exports = {
  ADVANCE: 'advance',
  ANIMATION: 'animation',
  CURRENT: 'current',
  DURATION: 'duration',
  LOAD_INTERVALS: 'loadIntervals',
  INTERVAL: 'interval',
  LOOP: 'loop', // NOT USING ?
  LOOP_BEHAVIOR: 'loopBehavior', // NOT USING ?
  MS_PER_FRAME: 'millisPerFrame',
  OUT: 'out',
  PLAY_STATE: 'playState',
  PLAY_INTERVALS: 'playIntervals',
  HOLDS: 'heldIntervals',
  HOLD_ITEM: 'held',
  SEQ_INTERVAL: 'interval',
  TIME: 'time',
  SLICES: 'slices',
  SLICE: 'slice',
  SLICE_INTERVAL: 'sliceInterval',
  INTERVAL_START: 'intervalStart',
  INTERVAL_END: 'intervalEnd',
  LOCK: 'lock',
  LOCK_RANGE: 'lockRange',
  FADE: 'fade',
  AUTO_CONFIGURE: 'autoConfigure',
  COLLAPSED: 'timelineCollapsed',
  VISIBLE_RANGE: 'visibleRange'
};
