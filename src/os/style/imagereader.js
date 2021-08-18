goog.module('os.style.ImageReader');
goog.module.declareLegacyNamespace();

const Image = goog.require('ol.style.Image');
const AbstractReader = goog.require('os.style.AbstractReader');


/**
 * Image style reader
 *
 * @extends {AbstractReader<T>}
 * @template T
 */
class ImageReader extends AbstractReader {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  getOrCreateStyle(config) {
    var type = /** @type {string|undefined} */ (config['type']) || 'circle';
    return this.readers[type].getOrCreateStyle(config);
  }

  /**
   * @inheritDoc
   */
  toConfig(style, obj) {
    if (style instanceof Image) {
      var child = {};
      obj['image'] = child;

      for (var key in this.readers) {
        this.readers[key].toConfig(style, child);
      }
    }
  }

  /**
   * @inheritDoc
   */
  setReaders(readers) {
    if (readers) {
      var newReaders = Object.assign({}, readers);
      delete newReaders['image'];
      readers = newReaders;
    }

    super.setReaders(readers);
  }
}

exports = ImageReader;
