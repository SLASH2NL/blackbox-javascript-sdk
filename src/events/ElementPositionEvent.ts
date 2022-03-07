import { ElementTransformEvent } from './ElementTransformEvent';

export class ElementPositionEvent extends ElementTransformEvent {
  public channel: string = 'element-position';
}
