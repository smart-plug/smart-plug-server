export type TConsumption = {
  deviceId: number,
  current: number,
  voltage: number,
  reading: Date,
  potency: number,
  originalData: boolean
}

export type TConsumptionFilter = {
  startDate: Date,
  endDate: Date
}

export type TConsumptionAllData = {
  consumption: Array<TConsumption>,
  accumulatedConsumption: number,
  consumptionVariation: number,
  projectedAccumulatedConsumption: number
}