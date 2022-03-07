"use strict";
import { Subject } from "rxjs";
import {
  ElementChangeTextEvent,
  ElementPositionEvent,
  ElementRotateEvent,
  ElementScaleEvent,
  ElementVisibilityEvent,
  MuteMasterEvent,
  ElementMuteEvent,
  ElementListResponseEvent,
  BlackboxEvent,
  PingEvent,
  PlayEvent,
  PongEvent,
  ViewPointSelectEvent,
  VolumeEvent
} from "../events/index";

export class Blackbox {
  private static window: Window;
  private static url: URL;
  public static isInitialized: boolean = false;
  public static subject: Subject<BlackboxEvent> = new Subject<BlackboxEvent>()

  /**
   * Initialize the blackbox sdk.
   * If no HTMLIFrameElement is given,
   * the window of the current page will be used.
   *
   * @param element HTMLIFrameElement|null
   * @returns void
   * @throws Error
   */
  public static init(element: HTMLIFrameElement|null = null): void {

    Blackbox.window = element?.contentWindow ?? window;

    try {
      Blackbox.url = new URL(element ? element.src : Blackbox.window.origin);
    } catch (e) {
      throw new Error('Given url is invalid.');
    }

    window.addEventListener('message', Blackbox.postMessageListener)
    Blackbox.isInitialized = true;
  }

  /**
   * Post a Blackbox event to the blackbox window.
   *
   * @param event BlackboxEvent
   * @return void
   */
  public static post(event: BlackboxEvent): void {
    Blackbox.window.postMessage(JSON.stringify(event), Blackbox.url.protocol + '//' + Blackbox.url.host);
  }

  /**
   * Get a Blackbox event from a json string.
   *
   * @param jsonData string
   * @returns BlackboxEvent
   * @throws Error
   */
  public static get(jsonData: string) {
    let event = null
    try {
      event = JSON.parse(jsonData);
    } catch (e) {
        // Not valid json skip.
       return;
    }

    switch (event.channel ?? '') {
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

  /**
   * Remove event listener on destroy.
   *
   * @return void
   */
  public static destroy(): void {
    window.removeEventListener('message', Blackbox.postMessageListener);
  }

  /**
   * Listen for events from the blackbox window.
   *
   * @param event MessageEvent
   * @returns void
   * @throws Error
   */
  private static postMessageListener(event: MessageEvent): void {
    try {
      if (event.origin !== Blackbox.url.origin) {
        return
      }

      Blackbox.get(event.data);
    } catch (e) {
      throw new Error('Event is not valid.');
    }
  }
}
