import { BlackboxEvent } from './BlackboxEvent'

export class ElementMuteEvent implements BlackboxEvent {
  public channel = 'controls-element-mute'

  /**
   * Indicates the mute state: true means mute element. false means stop muting element.
   *
   * @type {boolean}
   */
  public state: boolean = false

  public element_id: string

  public constructor(element_id: string, state: boolean) {
    this.element_id = element_id
    this.state = state
  }
}
