import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface locationByIDResponse {
  data: {
    id: number,
    inCount: number,
    outCount: number,
    totalCount: number,
    name: string,
    resetTimestamp: string,
  }
}

export interface timesheet {
  startTime: string,
  endTime: string,
  inCount: number,
  outCount: number,
  totalCount: number,
}

interface locationTimesheet {
  data: {
    id: number,
    name: string,
    timesheet: timesheet[],
    pageSize: number,
    pageIndex: number,
    totalCount: number,
  }
}

@Injectable()
export class LocationDetailsService {

  // 3.25.181.212
  constructor(private httpClient: HttpClient) {}

  getLocationByID() {
    return this.httpClient.get<locationByIDResponse>('http://3.27.155.65:3000/api/location/2', { observe: 'response' });
  }

  getLocationTimesheet(page: number, limit: number) {
    return this.httpClient.get<locationTimesheet>('http://3.27.155.65:3000/api/location/timesheet/2', 
      { 
        observe: 'response', 
        params: { page, limit },
      });
  }
}
