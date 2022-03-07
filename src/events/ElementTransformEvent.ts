import { BlackboxEvent } from './BlackboxEvent'

export class ElementTransformEvent implements BlackboxEvent {
  public channel = 'element-transform'

  private x: number|null
  private y: number|null
  private z: number|null

  private tween: boolean
  private tween_duration: number

  private element_id: string|null

  constructor (element_id: string|null = null, x: number|null = null, y: number|null = null, z: number|null = null, tween: boolean = false, tween_duration: number = 0) {
    this.element_id = element_id
    this.x = x
    this.y = y
    this.z = z
    this.tween = tween
    this.tween_duration = tween_duration
  }
}
