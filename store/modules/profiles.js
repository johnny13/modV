import Vue from 'vue';
import { modV } from '@/modv';

const state = {
  profiles: {}
};

// getters
const getters = {
  allProfiles: state => state.profiles,
  getPaletteFromProfile: state => ({ paletteName, profileName }) => state.profiles[profileName].palettes[paletteName]
};

// actions
const actions = {
  savePaletteToProfile({ commit }, { profileName, paletteName, colors }) {
    const MediaManager = modV.MediaManagerClient;

    MediaManager.send({
      request: 'save-palette',
      profile: profileName,
      name: paletteName,
      payload: colors
    });
  }
};

// mutations
const mutations = {
  addProfile(state, { profileName, images, palettes, presets, videos }) {
    const profile = {};
    profile.images = images || {};
    profile.palettes = palettes || {};
    profile.presets = presets || {};
    profile.videos = videos || {};

    Vue.set(state.profiles, profileName, profile);
  },
  removeProfile(state, { profileName }) {
    Vue.delete(state.profiles, profileName);
  },

  addPaletteToProfile(state, { profileName, paletteName, colors }) {
    const profile = state.profiles[profileName];
    Vue.set(profile.palettes, paletteName, colors);
  },
  removePaletteFromProfile(state, { profileName, paletteName }) {
    if(!Object.prototype.hasOwnProperty.call(state.profiles, profileName)) return;

    const profile = state.profiles[profileName];

    if(!Object.prototype.hasOwnProperty.call(profile.palettes, paletteName)) return;

    Vue.delete(profile.palettes, paletteName);
  },

  addPresetToProfile(state, { profileName, presetName, contents }) {
    const profile = state.profiles[profileName];
    Vue.set(profile.presets, presetName, contents);
  },
  removePresetFromProfile(state, { profileName, presetName }) {
    const profile = state.profiles[profileName];
    Vue.delete(profile.presets, presetName);
  },

  addImageToProfile(state, { profileName, imageName, path }) {
    const profile = state.profiles[profileName];
    Vue.set(profile.images, imageName, path);
  },
  removeImageFromProfile(state, { profileName, imageName }) {
    const profile = state.profiles[profileName];
    Vue.delete(profile.images, imageName);
  },

  addVideoToProfile(state, { profileName, videoName, path }) {
    const profile = state.profiles[profileName];
    Vue.set(profile.videos, videoName, path);
  },
  removeVideoFromProfile(state, { profileName, videoName }) {
    const profile = state.profiles[profileName];
    Vue.delete(profile.videos, videoName);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};