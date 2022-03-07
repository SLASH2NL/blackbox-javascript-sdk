import { BlackboxEvent } from './BlackboxEvent'

export class MuteMasterEvent implements BlackboxEvent {
  public channel: string = 'controls-mute';
  public excluded_element: string|null
  public state: boolean

  public constructor(excluded_element: string|null, state: boolean) {
    this.excluded_element = excluded_element;
    this.state = state;
  }

}
