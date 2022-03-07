import { BlackboxEvent } from './BlackboxEvent'

export class ElementVisibilityEvent implements BlackboxEvent {
  public channel = 'element-visibility'

  public state: boolean
  public element_id: string

  public constructor(element_id: string, state: boolean) {
    this.element_id = element_id
    this.state = state
  }
}
