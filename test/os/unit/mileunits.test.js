goog.require('os.unit.MileUnits');
goog.require('os.unit.Multiplier');

describe('os.unit.MileUnits', function() {
  const Multiplier = goog.module.get('os.unit.Multiplier');
  const MileUnits = goog.module.get('os.unit.MileUnits');

  it('should function correctly', inject(function($rootScope) {
    var mult = new Multiplier('mi', 1, true, 'miles', .1);
    var eUnit = new MileUnits();
    expect(eUnit.getTitle()).toBe('Miles Only');
    expect(eUnit.getUnitType()).toBe(os.unit.UNIT_TYPE_DISTANCE);
    expect(eUnit.getSystem()).toBe(os.unit.unitSystem.MILE);
    expect(eUnit.getDefaultMultiplier()).toEqual(mult);
    expect(eUnit.getConversionFactor()).toBe(1 / 1609.344);
    expect(eUnit.getSuffix()).toBe('');
    expect(eUnit.getMultipliers().length).toEqual(1);
    expect(eUnit.getMultiplier('yards')).toBe(undefined);
  }));
});
