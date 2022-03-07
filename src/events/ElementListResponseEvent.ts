import { RoomElement } from '../models/RoomElement'
import { BlackboxEvent } from './BlackboxEvent'

export class ElementListResponseEvent implements BlackboxEvent {
  public channel = 'element-list-response'

  private elements: Array<RoomElement>

  public constructor (elements: Array<RoomElement>) {
    this.elements = elements
  }

  public getElements () {
    return this.elements
  }
}
