import { BlackboxEvent } from './BlackboxEvent'

export class PlayEvent implements BlackboxEvent {
  public channel: string = 'controls-play'

  /**
   * Indicates the play/pause state. Play on true, pause on false.
   *
   * @type {boolean}
   */
  private state: boolean
  private proximity: boolean

  public constructor(state: boolean, proximity: boolean = false) {
    this.state = state
    this.proximity = proximity
  }
}
