<template>
  <div class="pure-u-1-1 global-controls right-controls">
    <div class="control-group">
      <label>Profile</label>
      <profile-selector v-model='profileSelectorInput'></profile-selector>
    </div>
    <div class="control-group">
      <label>Load Preset</label>
      <preset-selector
        :profile='profileSelectorInput'
        v-model='presetSelectorInput'
      ></preset-selector>
      <div class="pure-form-message-inline">
        <button
          class="pure-button"

        >Load</button>
      </div>
    </div>
    <div class="control-group">
      <label>Save Preset</label>
      <input v-model='savePresetNameInput' type='text' />
      <div class="pure-form-message-inline">
        <button
          class="pure-button"

        >Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapActions, mapGetters, mapMutations } from 'vuex';
  import PresetSelector from '@/components/PresetSelector';
  import ProfileSelector from '@/components/ControlPanel/ProfileSelector';

  export default {
    name: 'presetControls',
    data() {
      return {
        profileSelectorInput: 'default',
        presetSelectorInput: null,
        savePresetNameInput: ''
      };
    },
    computed: {

    },
    methods: {

    },
    watch: {

    },
    components: {
      PresetSelector,
      ProfileSelector
    }
  };
</script>

<style scoped>

</style>