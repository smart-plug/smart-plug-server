import TMeasurement from '../utils/types/TMeasurement';
import { Model } from 'mongoose';
import Measurement from '../models/mongoose/Measurement';
import { CONSUMPTION_DATA_NOTFOUND } from '../utils/errors/errorsList';
import { TConsumption, TConsumptionCalculated, TConsumptionAllData } from '../utils/types/TConsumption';

export default class ConsumptionService {
  private _model: Model<TMeasurement>;

  constructor(model: Model<TMeasurement> = Measurement) {
    this._model = model;
  }

  public get = async (deviceId: number): Promise<TConsumptionCalculated> => {
    const measurements = await this._model.find({ deviceId: deviceId }).sort({ reading: 1 });

    if (measurements.length < 2) {
      throw CONSUMPTION_DATA_NOTFOUND;
    }

    const consumptions = this.consumptionCalcutation(measurements);

    const consumptionsAllData: TConsumptionAllData = {
      consumptions: consumptions.consumptions,
      accumulatedConsumption: consumptions.accumulatedConsumption,
      consumptionVariation: 0,
      projectedAccumulatedConsumption: 0
    };

    return consumptionsAllData;
  };

  private consumptionCalcutation(measurements: Array<TMeasurement>): TConsumptionCalculated {
    const MILLISECONDS_IN_HOUR = 3600000;
    let accumulatedConsumption = 0;
    const consumptions: Array<TConsumption> = [];

    for (let count = 1; count < measurements.length; count ++) {
      const medianCurrent = (measurements[count - 1].current + measurements[count].current) / 2;
      const timeVariationHours = Math.abs(+measurements[count].reading - +measurements[count - 1].reading) / MILLISECONDS_IN_HOUR;
      const medianConsumption = medianCurrent * measurements[count].voltage * timeVariationHours;
      const consumption: TConsumption = {
        deviceId: measurements[count].deviceId,
        current: medianCurrent,
        voltage: measurements[count].voltage,
        reading: measurements[count].reading,
        potency: medianCurrent * measurements[count].voltage,
        consumption: medianConsumption,
        originalData: true
      };
      consumptions.push(consumption);
      accumulatedConsumption += medianConsumption;
    }

    const consumptionCalculated: TConsumptionCalculated = {
      consumptions: consumptions,
      accumulatedConsumption: accumulatedConsumption
    };

    return consumptionCalculated;
  }
}
