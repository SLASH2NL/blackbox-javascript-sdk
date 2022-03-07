"use strict";
import { BlackboxEvent } from "../events/BlackboxEvent";
import { Subject } from "rxjs";
import { 
  ElementChangeTextEvent, 
  ElementPositionEvent, 
  ElementRotateEvent, 
  ElementScaleEvent, 
  ElementVisibilityEvent, 
  MuteMasterEvent, 
  PingEvent, 
  PlayEvent, 
  PongEvent,  
  ViewPointSelectEvent, 
  VolumeEvent 
} from "../events";
import { ElementMuteEvent } from "../events/ElementMuteEvent";
import { ElementListResponseEvent } from "../events/ElementListResponseEvent";

export class Blackbox {
  private static element: HTMLIFrameElement;
  private static url: URL;
  public static subject: Subject<BlackboxEvent> = new Subject<BlackboxEvent>()

  public static init(element: HTMLIFrameElement|null) {
    if (!element) {
      throw new Error('Blackbox frame not found');
    }

    try {
      Blackbox.url = new URL(element.src);
    } catch (e) {
      throw new Error('Given url is invalid.');
    }

    Blackbox.element = element;

    window.addEventListener('message', Blackbox.postMessageListener)
  }

  public static post(event: BlackboxEvent) {
    if (Blackbox.element === null) {
      throw new Error('Blackbox not initialized.');
    }

    if (Blackbox.element.contentWindow === null) {
      throw new Error('ContentWindow is not available on the given element.');
    }

    Blackbox.element.contentWindow.postMessage(JSON.stringify(event), Blackbox.url.protocol + '//' + Blackbox.url.host);
  }

  public static get(data: string) {
    const event = JSON.parse(data);
    if(!event) {
      throw new Error('Event is not valid.');
    }

    switch (event.channel) {
      case 'element-change-text':
        Blackbox.subject.next(new ElementChangeTextEvent(event.element_id, event.text));
        break;
      case 'element-position':
        Blackbox.subject.next(new ElementPositionEvent(event.element_id, event.x, event.y, event.z, event.tween, event.tween_duration));
        break;
      case 'element-rotate':
        Blackbox.subject.next(new ElementRotateEvent(event.element_id, event.x, event.y, event.z, event.tween, event.tween_duration));
        break;
      case 'element-scale':
        Blackbox.subject.next(new ElementScaleEvent(event.element_id, event.x, event.y, event.z, event.tween, event.tween_duration));
        break;
      case 'element-visibility':
        Blackbox.subject.next(new ElementVisibilityEvent(event.element_id, event.state));
        break;
      case 'mute-master':
        Blackbox.subject.next(new MuteMasterEvent(event.excluded_element, event.state));
        break;
      case 'controls-element-mute':
        Blackbox.subject.next(new ElementMuteEvent(event.excluded_element, event.state));
        break;
      case 'ping':
        Blackbox.subject.next(new PingEvent());
        break;
      case 'play':
        Blackbox.subject.next(new PlayEvent(event.state, event.proximity));
        break;
      case 'pong':
        Blackbox.subject.next(new PongEvent());
        break;
      case 'view-point-select':
        Blackbox.subject.next(new ViewPointSelectEvent(event.view_point_id));
        break;
      case 'volume':
        Blackbox.subject.next(new VolumeEvent(event.volume));
        break;
      case 'element-list-response':
        Blackbox.subject.next(new ElementListResponseEvent(event.elements));
      break;
      default:
        throw new Error('Event is not valid.');
    }
  } 

  public static destroy() {
    window.removeEventListener('message', Blackbox.postMessageListener);
  }

  private static postMessageListener(event: MessageEvent) {
    try {

      console.log(event.origin)
      if (event.origin !== Blackbox.url.origin) {
        return
      }

      Blackbox.get(event.data);
    } catch (e) {
      throw new Error('Given url is invalid.');
    }
  }
}
