import { BaseAccessory } from './base-accessory'
import { RingDevice } from '../api'
import { HAP, hap } from './hap'
import { RingAlarmPlatformConfig } from './config'

export class CoAlarm extends BaseAccessory {
  constructor(
    public readonly device: RingDevice,
    public readonly accessory: HAP.Accessory,
    public readonly logger: HAP.Log,
    public readonly config: RingAlarmPlatformConfig
  ) {
    super()

    const {
      Characteristic: { CarbonMonoxideDetected },
      Service: { CarbonMonoxideSensor }
    } = hap

    this.registerCharacteristic(
      CarbonMonoxideDetected,
      CarbonMonoxideSensor,
      data => {
        return data.alarmStatus === 'active'
          ? CarbonMonoxideDetected.CO_LEVELS_ABNORMAL
          : CarbonMonoxideDetected.CO_LEVELS_NORMAL
      }
    )

    this.initSensorService(CarbonMonoxideSensor)
  }
}
