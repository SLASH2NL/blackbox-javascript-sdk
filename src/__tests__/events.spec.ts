import { ElementChangeTextEvent, ElementListResponseEvent, ElementPositionEvent, ElementRotateEvent, ElementScaleEvent, ElementVisibilityEvent, MuteMasterEvent, PingEvent, PlayEvent, PongEvent, ViewPointSelectEvent, VolumeEvent } from '../events';
import { ElementMuteEvent } from '../events/ElementMuteEvent';
import { Blackbox } from '../main/index';

beforeAll(() => {
    const iframe = document.createElement('iframe');
    iframe.id = 'test-frame';
    iframe.src = 'http://localhost:8080/embed';

    document.body.appendChild(iframe);
    Blackbox.init(iframe)
})


afterAll(() => {
    Blackbox.destroy()
})

test('Element change text', () => {
    Blackbox.get('{"channel":"element-change-text","element_id":"test-element","text":"test"}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementChangeTextEvent);
    })
})

test('Element position', () => {
    Blackbox.get('{"channel":"element-position","element_id":"test-element","x":0,"y":0,"z":0}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementPositionEvent);
    })
})

test('Element rotate', () => {
    Blackbox.get('{"channel":"element-rotate","element_id":"test-element","x":0,"y":0,"z":0}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementRotateEvent);
    })
})

test('Element scale', () => {
    Blackbox.get('{"channel":"element-scale","element_id":"test-element","x":0,"y":0,"z":0}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementScaleEvent);
    })
})

test('Element visibility', () => {
    Blackbox.get('{"channel":"element-visibility","element_id":"test-element","visible":true}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementVisibilityEvent);
    })
})

test('Element mute', () => {
    Blackbox.get('{"channel":"controls-element-mute","element_id":"test-element","mute":true}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementMuteEvent);
    })
})

test('Mute master', () => {
    Blackbox.get('{"channel":"mute-master","mute":true}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(MuteMasterEvent);
    })
})

test('Ping', () => {
    Blackbox.get('{"channel":"ping"}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(PingEvent);
    })
})

test('Pong', () => {
    Blackbox.get('{"channel":"pong"}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(PongEvent);
    })
})

test('Play', () => {
    Blackbox.get('{"channel":"play","state":"play","proximity":0}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(PlayEvent);
    })
})

test('View point select', () => {
    Blackbox.get('{"channel":"view-point-select","view_point_id":"test-view-point"}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ViewPointSelectEvent);
    })
})

test('Volume', () => {
    Blackbox.get('{"channel":"volume","volume":0.5}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(VolumeEvent);
    })
})

test('Element list response', () => {
    Blackbox.get('{"channel": "element-list-response", "elements": [{"id": "test-element", "type": "test-type", "text": "test-text", "x": 0, "y": 0, "z": 0, "rotateX": 0, "rotateY": 0, "rotateZ": 0, "scaleX": 0, "scaleY": 0, "scaleZ": 0, "visible": true, "mute": false}]}');
    Blackbox.subject.subscribe(event => {
        expect(event).toBeInstanceOf(ElementListResponseEvent);
    })
})

test('Invalid event', () => {
    expect(() => {
        Blackbox.get('{"channel":"invalid-event"}');
    }).toThrowError('Event is not valid.');
})