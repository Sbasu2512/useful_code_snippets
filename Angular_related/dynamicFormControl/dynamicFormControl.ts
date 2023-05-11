//here we are creating a data object for every new form value recieved and creating a formControl.
mainFunction() {
 const formValues = this.createJobForm.value;
   const eventTypeSeleceted = formValues?.eventTypes
     ? formValues.eventTypes[0]
     : null;
   const equipmentSelected = formValues?.equipmentTypes
     ? formValues.equipmentTypes[0]
     : null;
   const locationSelected = formValues?.locations
     ? formValues.locations[0]
     : null;
   const statusSelected = formValues?.statuses ? formValues.statuses[0] : null;
   const fromLocationSelected = formValues?.fromLocation
     ? formValues.fromLocation[0]
     : null;

 const data: EventSequenceModel = {
     sequenceId: this.incrementSequence(),
     event: this.getEventDetails(eventTypeSeleceted),
     equipment: this.getEquipmentDetails(equipmentSelected),
     location: this.getLocationDetails(locationSelected)!,
     status: this.getStatusDetails(statusSelected),
     fromLocation: this.getLocationDetails(fromLocationSelected)
   };

   this.jobData.push(data);
   this.jobDataFormControl.push(this.createNewFormControl());
   this.prePopulateCombos();
 }

 /**
   * This function is used to prepopulate the combo's with values.
   */
  prePopulateCombos() {
    this.jobDataFormControl.forEach((o: FormGroup, i: number) => {
      o.get(this.formControlNamesArr[i].eventTypes)?.patchValue([
        this.jobData[i].event.eventTypeId
      ]);
      if (this.jobData[i].equipment?.equipmentTypeId) {
        o.get(this.formControlNamesArr[i].equipmentTypes)?.patchValue([
          this.jobData[i].equipment?.equipmentTypeId
        ]);
      }
      o.get(this.formControlNamesArr[i].locations)?.patchValue([
        this.jobData[i].location.locationId
      ]);
      if (this.jobData[i].status?.id) {
        o.get(this.formControlNamesArr[i].statuses)?.patchValue([
          this.jobData[i].status?.id
        ]);
      }
      if (this.jobData[i].fromLocation?.locationId) {
        o.get(this.formControlNamesArr[i].fromLocation)?.patchValue([
          this.jobData[i].fromLocation?.locationId
        ]);
      }
      if (!this.isInEditMode) {
        o.disable();
      }
    });
  }

 /**
   * Creates new form control name to sync with the html
   * @returns new formcontrol
   */
  createNewFormControl() {
    this.formControlNamesArr = [];
    let dynamicFormControlNames: any = {};
    if (this.jobData) {
      this.jobData.forEach((data, i) => {
        this.formControlNamesArr.push({
          eventTypes: CustomJobComponent.EVENT_TYPE_CONTROL_NAME + `${i}`,
          equipmentTypes:
            CustomJobComponent.EQUIPMENT_TYPE_CONTROL_NAME + `${i}`,
          statuses: CustomJobComponent.STATUS_CONTROL_NAME + `${i}`,
          locations: CustomJobComponent.LOCATION_CONTROL_NAME + `${i}`,
          fromLocation: CustomJobComponent.FROM_LOCATION_CONTROL_NAME + `${i}`
        });
      });
    }

    this.jobData.forEach((data, i) => {
      dynamicFormControlNames[this.formControlNamesArr[i].eventTypes] =
        new FormControl(null, Validators.required);
      dynamicFormControlNames[this.formControlNamesArr[i].equipmentTypes] =
        new FormControl(null);
      dynamicFormControlNames[this.formControlNamesArr[i].statuses] =
        new FormControl(null);
      dynamicFormControlNames[this.formControlNamesArr[i].locations] =
        new FormControl(null, Validators.required);
      dynamicFormControlNames[this.formControlNamesArr[i].fromLocation] =
        new FormControl(null);
    });
    return this.formBuilder.group(dynamicFormControlNames);
  }
