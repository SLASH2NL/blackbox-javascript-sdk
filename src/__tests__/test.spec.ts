import { ElementRotateEvent } from '../events/ElementRotateEvent';
import { Blackbox } from '../main/index';

test('Without iframe', () => {
    expect(() => {
        Blackbox.init()
    }).not.toThrowError();
})

test('With iframe invalid url', () => {
    const iframe = document.createElement('iframe');
    iframe.id = 'test-frame';
    iframe.removeAttribute('src')

    document.body.appendChild(iframe);
    expect(() => {
        Blackbox.init(iframe)
        const event = new ElementRotateEvent();
        Blackbox.post(event);
    }).toThrowError('Given url is invalid.');
})

test('With iframe', () => {
    const iframe = document.createElement('iframe');
    iframe.id = 'test-frame';
    iframe.src = 'http://localhost:8080/embed';

    document.body.appendChild(iframe);
    expect(() => {
        Blackbox.init(iframe)
        const event = new ElementRotateEvent();
        Blackbox.post(event);
    }).not.toThrowError();
})
