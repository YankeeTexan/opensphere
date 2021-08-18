/* FIXME add rotation */
goog.module('os.olm.render.Box');
goog.module.declareLegacyNamespace();

const {beginTempInterpolation, endTempInterpolation, interpolateGeom} = goog.require('os.interpolate');
const Method = goog.require('os.interpolate.Method');
const BaseShape = goog.require('os.olm.render.BaseShape');

const Polygon = goog.requireType('ol.geom.Polygon');
const Style = goog.requireType('ol.style.Style');


/**
 * OL changed their box renderer to use the DOM, but that doesn't jive well with how we're using it. This class is a
 * modified copy of the pre-DOM ol.render.Box circa OL commit 31a68e21a51ee378c3698354523d185eef52f543.
 */
class Box extends BaseShape {
  /**
   * Constructor.
   * @param {Style} style Style.
   */
  constructor(style) {
    super(style);

    /**
     * @private
     * @type {Polygon}
     */
    this.geometry_ = null;

    /**
     * @private
     * @type {Polygon}
     */
    this.originalGeometry_ = null;
  }

  /**
   * @inheritDoc
   */
  getGeometry() {
    return this.geometry_;
  }

  /**
   * @return {Polygon} Geometry
   */
  getOriginalGeometry() {
    return this.originalGeometry_;
  }

  /**
   * @param {!Polygon} geometry The geometry
   */
  updateGeometry(geometry) {
    this.originalGeometry_ = geometry;
    this.originalGeometry_.osTransform();
    this.geometry_ = this.originalGeometry_.clone();

    // "boxes" are really rhumb boxes, so ensure that we interpolate with the proper method.
    // The interpolation ensures that the box segments are still rendered as rhumb lines even in
    // projections in which rhumb lines are complex curves.
    //
    // Vertical and horizontal rhumbs in EPSG:4326 and EPSG:3857 are both straight lines, so the
    // interpolation will be a no-op in those projections.

    beginTempInterpolation(undefined, Method.RHUMB);
    interpolateGeom(this.geometry_);
    endTempInterpolation();
    this.render();
  }
}

exports = Box;
