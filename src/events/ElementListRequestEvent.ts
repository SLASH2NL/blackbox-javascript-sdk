import { BlackboxEvent } from './BlackboxEvent'

export enum ElementType {
    Audio = 'audio',
    Button = 'button',
    Html = 'html',
    Image = 'image',
    LiveStream = 'live_stream',
    Model = 'model',
    Text = 'text',
    Video = 'video',
    NativeVideo = 'native_video',
    LightElement = 'light',
    RichText = 'rich_text',
    Iframe = 'iframe',
    ViewPoint = 'view_point',
    Group = 'group'
}

export class ElementListRequestEvent implements BlackboxEvent {
  public channel = 'element-list-request'

  private filter: Array<ElementType>

  public constructor (filter: Array<ElementType> = []) {
    this.filter = filter
  }

  public getFilter () {
    return this.filter
  }
}
