//multiple subscriptions ==> not recommended.
this.subs.sink = this.tripEventsService
        .addUpsertEvent(this.trip.tripId, eventUpsertData)
        .subscribe(
          (res: ApiResponse) => {
            if (res && res.result) {
              eventUpsertData.tripEventId = res.result;
              forkJoin({
                docId: this.tripEventsService.createFile(
                  this.filesToUpload,
                  res.result,
                  UpsertEventComponent.DOCUMENT_DEFINITION_ID
                ),
                tripEvent: this.tripEventsService.getTripEventDtoById(
                  res.result
                )
              }).subscribe(
                (res: any) => {
                  if (res) {
                    const docId = res.docId.result;
                    const tripEvent = res.tripEvent.result;
                    const tripEventId =
                      res.tripEvent.result?.tripEventDetail?.tripEventId;
      
                    const tripEventDetail = {
                      documentId: docId,
                      quantity: tripEvent?.tripEventDetail.quantity,
                      timeSpan: tripEvent?.tripEventDetail.timeSpan,
                      minTemp: tripEvent?.tripEventDetail.minTemp,
                      maxTemp: tripEvent?.tripEventDetail.maxTemp,
                      value: tripEvent?.tripEventDetail.value,
                      tripEventId: tripEventId,
                      id: tripEvent.tripEventDetail.id
                    };
                    const tripEventUpdated = {
                      externalId: tripEvent.tripExternalId,
                      localEtaDate: tripEvent.localEtaDate,
                      eventType: { id: tripEvent.eventType.id },
                      tripId: tripEvent.tripId,
                      contractId: tripEvent.contractId,
                      sequenceId: tripEvent.sequenceId,
                      location: { id: eventUpsertData.location },
                      eventLogStatus: { id: tripEvent.eventLogStatus?.id },
                      localStartTime: tripEvent.localStartTime,
                      localFinishTime: tripEvent.localFinishTime,
                      id: tripEvent.id,
                      createdBy: tripEvent.createdBy,
                      createdOn: tripEvent.createdOn,
                      isRowDeleted: tripEvent.isRowDeleted,
                      tripEventDetail: tripEventDetail
                    } as unknown as TripEventDto;
                    this.tripEventsService
                      .updateEvent(tripEventUpdated)
                      .subscribe(
                        (res) => {
                          if (res) {
                            this.isInEditMode = true;
                            this.tripItemActionBusService.emit(
                              new BusEvent(
                                TripItemActions.ShowCloseTrip,
                                this.trip
                              )
                            );
                            this.reset();
                          }
                        },
                        (errorResult: FriendlyError) => {
                          this.isSaving = false;
                          this.setFormError(errorResult);
                        }
                      );
                  }
                },
                (errorResult: FriendlyError) => {
                  this.isSaving = false;
                  this.setFormError(errorResult);
                }
              );
            }
          },
          (errorResult: FriendlyError) => {
            this.isSaving = false;
            this.setFormError(errorResult);
          }
        );
