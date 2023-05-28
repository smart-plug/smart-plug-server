type TMeasurement = {
  deviceId: number,
  current: number,
  voltage: number,
  activePower: number,
  powerFactor: number,
  reading: Date
}

export default TMeasurement;