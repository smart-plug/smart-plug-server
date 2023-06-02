import TMeasurement from '../utils/types/TMeasurement';
import { Model } from 'mongoose';
import Measurement from '../models/mongoose/Measurement';
import { TConsumption, TConsumptionCalculated, TConsumptionAllData, TConsumptionFilterString, TConsumptionFilter } from '../utils/types/TConsumption';

export default class ConsumptionService {
  private _model: Model<TMeasurement>;

  constructor(model: Model<TMeasurement> = Measurement) {
    this._model = model;
  }

  public get = async (deviceId: number, consumptionFilterString: TConsumptionFilterString): Promise<TConsumptionAllData> => {
    const consumptionFilter = this.treatFilter(consumptionFilterString);
    console.log(consumptionFilter);
    const measurements = await this._model.find({ deviceId: deviceId }).where({
      reading: {
        $gte: consumptionFilter.startDate,
        $lt: consumptionFilter.endDate
      }
    }).sort({ reading: 1 });

    if (measurements.length == 0) {
      return {
        consumptions: [],
        totalAccumulatedConsumption: 0,
        consumptionVariation: 0,
        projectedAccumulatedConsumption: 0
      };
    }

    const consumptions = this.consumptionCalcutation(measurements);

    const consumptionsAllData: TConsumptionAllData = {
      consumptions: consumptions.consumptions,
      totalAccumulatedConsumption: consumptions.accumulatedConsumption,
      consumptionVariation: 0,
      projectedAccumulatedConsumption: 0
    };

    return consumptionsAllData;
  };

  private treatFilter(consumptionFilterString: TConsumptionFilterString): TConsumptionFilter {
    if (consumptionFilterString.startDate === undefined || consumptionFilterString.endDate === undefined) {
      return this.defaultFilter();
    }

    const startDateTimestamp = Date.parse(consumptionFilterString.startDate);
    const endDateTimestamp = Date.parse(consumptionFilterString.endDate);

    if (isNaN(startDateTimestamp) || isNaN(endDateTimestamp)) {
      return this.defaultFilter();
    }

    if (startDateTimestamp > endDateTimestamp) {
      return this.defaultFilter();
    }

    const endDate = new Date(endDateTimestamp);
    endDate.setDate(endDate.getDate() + 1);

    const consumptionFilter: TConsumptionFilter = {
      startDate: new Date(startDateTimestamp),
      endDate: endDate
    };

    return consumptionFilter;
  }

  private defaultFilter(): TConsumptionFilter {
    const dateNow = new Date();
    const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    const lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
    const consumptionFilter : TConsumptionFilter = {
      startDate: firstDay,
      endDate: lastDay
    };

    return consumptionFilter;
  }

  private consumptionCalcutation(measurements: Array<TMeasurement>): TConsumptionCalculated {
    const MILLISECONDS_IN_HOUR = 3600000;
    let accumulatedConsumption = 0;
    const consumptions: Array<TConsumption> = [{
      deviceId: measurements[0].deviceId,
      current: measurements[0].current,
      voltage: measurements[0].voltage,
      activePower: measurements[0].activePower,
      powerFactor: measurements[0].powerFactor,
      accumulatedConsumption: 0,
      reading: measurements[0].reading,
      originalData: true
    }];

    for (let count = 1; count < measurements.length; count ++) {
      const timeVariationHours = Math.abs(+measurements[count].reading - +measurements[count - 1].reading) / MILLISECONDS_IN_HOUR;
      const averagePower = (measurements[count].activePower + measurements[count - 1].activePower) / 2;
      const simpsonRule = (measurements[count - 1].activePower + 4 * averagePower + measurements[count].activePower) / 6;
      accumulatedConsumption += simpsonRule * timeVariationHours;
      const consumption: TConsumption = {
        deviceId: measurements[count].deviceId,
        current: measurements[count].current,
        voltage: measurements[count].voltage,
        activePower: measurements[count].activePower,
        powerFactor: measurements[count].powerFactor,
        accumulatedConsumption: accumulatedConsumption,
        reading: measurements[count].reading,
        originalData: true
      };
      consumptions.push(consumption);
    }

    const consumptionCalculated: TConsumptionCalculated = {
      consumptions: consumptions,
      accumulatedConsumption: accumulatedConsumption
    };

    return consumptionCalculated;
  }
}
