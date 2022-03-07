import { BlackboxEvent } from './BlackboxEvent'

export class VolumeEvent implements BlackboxEvent {
  public channel: string = 'controls-volume'

  /**
   * Indicates the volume between 0 and 1.
   *
   * @type {number}
   */
  public volume: number = 0

  public constructor(volume: number) {
    this.volume = volume
  }
}
