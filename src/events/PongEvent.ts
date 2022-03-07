import { BlackboxEvent } from './BlackboxEvent'

export class PongEvent implements BlackboxEvent {
  public channel = 'pong'
}
