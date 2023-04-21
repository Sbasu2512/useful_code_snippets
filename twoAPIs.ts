  /**
   * This function saves the job data to Db and returns the job id needed to save job definitions
   * @param payload data to be saved, CustomJobModel
   * @returns jobId
   */
  createJob(payload: CustomJobModel): Observable<ApiResponse[]> {
    const jobData = this.jobHelper.createJobApiPayload(payload);
    return this.http
      .post<ApiResponse>(`${this.environment.apiUrl}/trip/api/v1/Jobs`, jobData)
      .pipe(
        switchMap((res: ApiResponse) => {
          let jobId: string;
          if (res.status === ResponseStatus.Success && res.result) {
            jobId = res.result;
          }
          const requests = payload.eventSequence.map((event) => {
            return this.saveJobDef(event, jobId);
          });
          return forkJoin(requests);
        })
      );
  }

  /**
   *
   * @param payload payload being sent to BE
   * @param jobId jobId
   * @returns job definition dto
   */
  createJobDefinitionFromEventSequence(
    payload: EventSequenceModel,
    jobId: string
  ): JobDefinitionDto {
    let destinationLocation = payload?.fromLocation?.locationId
      ? { id: payload.fromLocation.locationId }
      : null;
    let status = payload.status?.id ? payload.status?.id : null;
    let equipmentType = payload.equipment?.equipmentTypeId
      ? payload.equipment?.equipmentTypeId
      : null;
    const jobDef: JobDefinitionDto = {
      JobId: jobId,
      EventType: { id: payload.eventType.eventTypeId },
      Location: { id: payload.location.locationId },
      DestinationLocation: destinationLocation,
      TrailerLoadStateId: status,
      TrailerTypeId: equipmentType
    };
    // return this.saveJobDef(jobDef);
    return jobDef;
  }

  /**
   *
   * @param jobDefPayload event sequence data
   * @param jobId the job Id on which the events sequence will be added
   * @returns API response
   */
  saveJobDef(
    jobDefPayload: EventSequenceModel,
    jobId: string
  ): Observable<ApiResponse> {
    const finalPayload = this.createJobDefinitionFromEventSequence(
      jobDefPayload,
      jobId
    );
    return this.http.post<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/JobDefinitions`,
      finalPayload
    );
  }