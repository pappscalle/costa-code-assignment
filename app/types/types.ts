export interface VehicleInformation {
  msidn: string;
  engineStatus: string;
  brand: string;
  countryOfOperation: string;
  chassisNumber: string;
  cassisSeries: string;
}

export interface Service {
  serviceName: string;
  status: string;
  lastUpdate: string;
}

export interface ServiceList {
  communicationStatus: string;
  services: Service[];
}

export interface DetailsAndServices {
  id: string;
  details: VehicleInformation;
  services: ServiceList;
}

export interface Vehicle {
  id: string;
  name?: string;
}

export interface VehicleList {
  vehicles: Vehicle[];
}
