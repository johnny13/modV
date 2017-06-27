import store from '@/../store';
import WebSocket from 'reconnecting-websocket';

const debug = process.env.NODE_ENV !== 'production' || window.MODV_DEBUG;

class MediaManagerClient {
  constructor() {
    this.available = false;

    let ws;

    try {
      ws = new WebSocket('ws://localhost:3132/');
    } catch(e) {
      if(debug) console.warn('MediaManagerClient: Initial connect failed, retrying');
    }

    this.ws = ws;

    ws.sendJSON = data => ws.send(JSON.stringify(data));

    ws.addEventListener('error', () => {
      this.available = false;
      if(debug) console.warn('MediaManagerClient: connection dropped, retrying');
    });

    ws.addEventListener('open', () => {
      this.update();
      this.available = true;
      if(debug) console.info('MediaManagerClient: connected, retriveing media list');
    });

    window.addEventListener('beforeunload', () => {
      ws.close({
        keepClosed: true
      });
      this.available = false;
    });

    ws.addEventListener('message', this.messageHandler);
  }

  update() {
    this.ws.sendJSON({ request: 'update' });
  }

  send(data) {
    this.ws.sendJSON(data);
  }

  messageHandler(message) { //eslint-disable-line
    const parsed = JSON.parse(message.data);
    if(debug) console.log('MediaManagerClient: recieved', parsed);

    if('type' in parsed) {
      switch(parsed.type) {
        default:
          break;

        case 'update':
          Object.keys(parsed.payload).forEach((profileName) => {
            const profile = parsed.payload[profileName];

            store.commit('profiles/addProfile', {
              profileName,
              images: profile.images,
              palettes: profile.palettes,
              presets: profile.presets,
              videos: profile.videos
            });
          });
          break;

        case 'file-update-add':
          if('data' in parsed) {
            const data = parsed.data;
            const type = data.type;
            const profileName = data.profile;
            const name = data.name;

            if(type === 'palette') {
              store.commit('profiles/addPaletteToProfile', {
                profileName,
                paletteName: name,
                colors: data.contents
              });
            } else if(type === 'preset') {
              store.commit('profiles/addPresetToProfile', {
                profileName,
                presetName: name,
                contents: data.contents
              });
            } else if(type === 'image') {
              store.commit('profiles/addImageToProfile', {
                profileName,
                imageName: name,
                path: data.path
              });
            } else if(type === 'video') {
              store.commit('profiles/addVideoToProfile', {
                profileName,
                videoName: name,
                path: data.path
              });
            }
          }
          break;

        case 'profile-add':
          if('data' in parsed) {
            const data = parsed.data;
            const profileName = data.profile;

            store.commit('profiles/addProfile', {
              profileName,
              images: {},
              palettes: {},
              presets: {},
              videos: {}
            });
          }
          break;

        case 'profile-delete':
          if('data' in parsed) {
            const data = parsed.data;
            const profileName = data.profile;

            store.commit('profiles/removeProfile', {
              profileName
            });
          }
          break;

        case 'file-update-delete':
          if('data' in parsed) {
            const data = parsed.data;
            const type = data.type;
            const profileName = data.profile;
            const name = data.name;

            if(type === 'palette') {
              store.commit('profiles/removePaletteFromProfile', {
                profileName,
                paletteName: name
              });
            } else if(type === 'preset') {
              store.commit('profiles/removePresetFromProfile', {
                profileName,
                presetName: name
              });
            } else if(type === 'image') {
              store.commit('profiles/removeImageFromProfile', {
                profileName,
                imageName: name
              });
            } else if(type === 'video') {
              store.commit('profiles/removeVideoFromProfile', {
                profileName,
                videoName: name
              });
            }
          }
          break;
      }
    }
  }
}

export default MediaManagerClient;