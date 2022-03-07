import { BlackboxEvent } from './BlackboxEvent'

export class ElementChangeTextEvent implements BlackboxEvent {
  public channel = 'element-change-text'

  public text: string
  public element_id: string

  public constructor(element_id: string, text: string) {
    this.element_id = element_id
    this.text = text
  }
}
