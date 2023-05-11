  /**
   * Validates if the given control is a whole number.
   * @param controlName - formControlName whose value to be checked
   * @returns - object
   */
  static wholeNumberValidatator = (controlName: string) => {
    return (control: AbstractControl) => {
      const value = control.get(controlName)?.value;
      if (value !== undefined && value !== null) {
        if (Number.isInteger(value)) {
          return null;
        }
        return { decimal: true };
      }
      return null;
    };
  };

  static NotNullValidator = (controlName: string) => {
    return (control: AbstractControl) => {
      const value = control.get(controlName)?.value;
      if (value === undefined || value === null) {
        return { invalid: true };
      }
      if (typeof value === 'object') {
        if (value.length === 0) {
          return { invalid: true };
        }
      }
      return null;
    };
  };
