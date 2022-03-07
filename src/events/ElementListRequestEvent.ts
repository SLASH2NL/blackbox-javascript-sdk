import { ElementType } from '../models/ElementType';
import { BlackboxEvent } from './BlackboxEvent';

export class ElementListRequestEvent implements BlackboxEvent {
  public channel = 'element-list-request';

  private filter: Array<ElementType>;

  public constructor(filter: Array<ElementType> = []) {
    this.filter = filter;
  }

  public getFilter() {
    return this.filter;
  }
}
