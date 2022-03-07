# Blackbox javascript SDK

Blackbox SDK for JavaScript includes a library of events that can be used to communicate with a Blackbox 3d-room.

## Installation
Use npm package manager

```sh
npm install blackbox-javascript-sdk
```
Or directly in your browser
For the latest version use:
```
<script src="//unpkg.com/blackbox-javascript-sdk/dist/blackbox-javascript-sdk.min.js"><script>
```
Or a specific version:
```
<script src="//unpkg.com/blackbox-javascript-sdk@version/dist/blackbox-javascript-sdk.min.js"><script>
```
## Basic usage
Attach the blackbox sdk to your current window.

```javascript
Blackbox.init();

Blackbox.subject.subscribe((event) => {
    if (event instanceof PongEvent) {
        alert('Received pong event!')
        return
    }
});
```

Send a ping request to test if your integration works.
```javascript
Blackbox.post(new PingEvent())
```
You should now get a prompt saying ```'Received pong event!'```
<br>
<br>

### Usage with vanilla JS via a CDN.
Wen included via a CDN you will have to prefix the blackbox instance with 'blackbox.':

```javascript
var instance = blackbox.Blackbox;
instance.init();

instance.subject.subscribe(function(event) {
    if (event.channel == 'pong') {
        alert('Received pong event!')
        return
    }
})

instance.post(new blackbox.PingEvent())
```
### Attach to iframe
To use the SDK with an embedded blackbox iframe you can initialize the SDK with a reference to the iframe element.
```html
<html>
<head>
  <title>iframe example</title>
</head>
<body>
  <iframe id="iframe-element" src="http://your-blackbox-url/embed"></iframe>
</body>
</html>
```
```javascript
const iframe = document.getElementById('iframe-element');
Blackbox.init(iframe);
...
```

## List available elements
Request a list of elements in the room. An array of element types can be passed to the request. The available element type can be found in [ElementType.ts](src/models/ElementType.ts)

```javascript
Blackbox.init();

Blackbox.post(new ElementListRequest());

Blackbox.subject.subscribe((event) => {
    if (event instanceof ElementListResponse) {
        // List all elements in the console.
        console.log(event.elements)
        return
    }
});
```
### With filter
```javascript
Blackbox.init();

// Only request all video elements in the room.
Blackbox.post(new ElementListRequest([
    ElementType.Video
]));

Blackbox.subject.subscribe((event) => {
    if (event instanceof ElementListResponse) {
        // List the filtered elements in the console.
        console.log(event.elements)
        return
    }
});
```

<br><br>
## Available events

| Event | Description   | Parameters    |
|---    |---            |---            |
| [ElementChangeTextEvent](src/events/ElementChangeTextEvent.ts)        | Set the text of a text element 	|	``element_id: string, text: string``
| [ElementListRequestEvent](src/events/ElementListRequestEvent.ts)       | Request a list of available elements in a room 	|	``filter: enum ElementType``
| [ElementListResponseEvent](src/events/ElementListResponseEvent.ts)      | Return all available elements in a room. 	|	``elements: Array<RoomElement>``
| [ElementMuteEvent](src/events/ElementMuteEvent.ts)              | Mute or un-mute a element. 	|	``element_id: string, state: boolean``
| [ElementPositionEvent](src/events/ElementPositionEvent.ts)          | Set the position of a element. 	|	``element_id: string, x: number, y:number, z: number, tween: boolean, tween_duration: number``
| [ElementRotateEvent](src/events/ElementRotateEvent.ts)            | Set the rotation of a element. 	|	``element_id: string, x: number, y:number, z: number, tween: boolean, tween_duration: number``
| [ElementScaleEvent](src/events/ElementScaleEvent.ts)             | Set the scaling factor of a element. 	|	``element_id: string, x: number, y:number, z: number, tween: boolean, tween_duration: number``
| [ElementVisibilityEvent](src/events/ElementVisibilityEvent.ts)        | Set the visibility of a element. 	|	``element_id: string, state: boolean``
| [MuteMasterEvent](src/events/MuteMasterEvent.ts)               | Mute or un-mute the whole room. 	|	``excluded_element: string, state: boolean``
| [PingEvent](src/events/PingEvent.ts)                     | Event used to check communication between the windows. 	|	``-``
| [PongEvent](src/events/PongEvent.ts)                     | Event used to check communication between the windows	|	``-``
| [PlayEvent](src/events/PlayEvent.ts)                     | Set the play or pause state of the current room. 	|	``state: boolean, proximity: boolean``
| [ViewPointSelectEvent](src/events/ViewPointSelectEvent.ts)    | Set the active viewpoint. 	|	``view_point_id: number``
| [VolumeEvent](src/events/VolumeEvent.ts)    | Set the volume of the current room. 	|	``volume: number``
