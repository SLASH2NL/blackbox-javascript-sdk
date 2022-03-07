import { BlackboxEvent } from './BlackboxEvent'

export class ViewPointSelectEvent implements BlackboxEvent {
  public channel: string = 'view-point-select'
  public view_point_id: number|null
  
  public constructor(view_point_id: number|null) {
    this.view_point_id = view_point_id
  }
}
