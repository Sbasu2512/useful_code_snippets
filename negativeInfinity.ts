  /**
   * This method handle the custom validation for the minTemp, unit and MaxTemp field. Also checks if -0 is not beign entered by the user
   * minTemp can not be greater than maxTemp
   * @param control Form Control
   */
  static preHeatCoolValidation = (
    minControlName: string,
    maxControlName: string
  ) => {
    return (control: AbstractControl) => {
      const minValue = control.get(minControlName)?.value;
      const maxValue = control.get(maxControlName)?.value;
      const isMinValueSupplied =
        minValue !== undefined &&
        minValue !== null &&
        typeof minValue === 'number'
          ? true
          : false;
      const isMaxValueSupplied =
        maxValue !== undefined &&
        maxValue !== null &&
        typeof maxValue === 'number'
          ? true
          : false;
      const isMinNegetiveInfinity =
        minValue === 0 && 1 / minValue === -Infinity;
      const isMaxNegetiveInfinity =
        maxValue === 0 && 1 / maxValue === -Infinity;
      if (isMinNegetiveInfinity && isMaxNegetiveInfinity) {
        return { negativeTemp: true };
      }
      if (isMinNegetiveInfinity) {
        return { negativeTempMin: true };
      }
      if (isMaxNegetiveInfinity) {
        return { negativeTempMax: true };
      }
      if (isMinValueSupplied && isMaxValueSupplied) {
        if (minValue > maxValue || minValue === maxValue) {
          return { minValue: true };
        }
        return null;
      }
      return null;
    };
  }
