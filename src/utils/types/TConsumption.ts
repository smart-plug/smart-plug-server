export type TConsumption = {
  deviceId: number,
  current: number,
  voltage: number,
  activePower: number,
  powerFactor: number,
  accumulatedConsumption: number,
  reading: Date,
  originalData: boolean
}

export type TConsumptionFilter = {
  startDate: Date,
  endDate: Date
}

export type TConsumptionFilterString = {
  startDate: string,
  endDate: string
}

export type TConsumptionAllData = {
  consumptions: Array<TConsumption>,
  totalAccumulatedConsumption: number,
  consumptionVariation: number,
  projectedAccumulatedConsumption: number
}

export type TConsumptionCalculated = {
  consumptions: Array<TConsumption>,
  accumulatedConsumption: number
}