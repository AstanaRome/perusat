class SatelliteDataSimple {
  constructor(data) {
    this.dataStripID = data['DataStrip Information']['DataStrip ID'];
    this.acquisitionStartDate = data['DataStrip Information']['Acquisition Start Date'];
    this.acquisitionEndDate = data['DataStrip Information']['Acquisition End Date'];
    this.incidenceAngle = data['Incidence Angle'];
    this.coordinates = {
      nwCornerLatitude: data['Geographic Location Information']['NW Corner Latitude'],
      nwCornerLongitude: data['Geographic Location Information']['NW Corner Longitude'],
      neCornerLatitude: data['Geographic Location Information']['NE Corner Latitude'],
      neCornerLongitude: data['Geographic Location Information']['NE Corner Longitude'],
      seCornerLatitude: data['Geographic Location Information']['SE Corner Latitude'],
      seCornerLongitude: data['Geographic Location Information']['SE Corner Longitude'],
      swCornerLatitude: data['Geographic Location Information']['SW Corner Latitude'],
      swCornerLongitude: data['Geographic Location Information']['SW Corner Longitude'],
    };
    this.quicklookURL = `https://cof.cnois.gob.pe/customer-office-quicklook/${this.dataStripID}_QL.jpeg`;
  }
}

// Пример использования класса
const satelliteDataSimple = new SatelliteDataSimple({
  'DataStrip Information': {
    'DataStrip ID': 'DS_PER1_201811020819282_PS1_E034N14_003728',
    'Acquisition Start Date': '2018-11-02T08:19:28.249Z',
    'Acquisition End Date': '2018-11-02T08:19:34.249Z',
  },
  'Geographic Location Information': {
    'NW Corner Latitude': '14.585122996555443',
    'NW Corner Longitude': '33.484911889123964',
    'NE Corner Latitude': '14.55743657169513',
    'NE Corner Longitude': '33.616936619123194',
    'SE Corner Latitude': '14.214005992027246',
    'SE Corner Longitude': '33.5384760926192',
    'SW Corner Latitude': '14.24167275670569',
    'SW Corner Longitude': '33.40663665690377',
  },
  'Incidence Angle': '4.893597316156379',
});

console.log(satelliteDataSimple);
console.log("fefef");