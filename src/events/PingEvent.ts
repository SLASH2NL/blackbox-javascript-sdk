import { BlackboxEvent } from './BlackboxEvent'

export class PingEvent implements BlackboxEvent {
  public channel = 'ping'
}
