<template>
  <dropdown
    :data="selectData"
    :width='129'
    :cbChanged="dropdownChanged"
    :class="{'preset-selector': true}"
  ></dropdown>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'presetSelector',
    props: [
      'value',
      'profile'
    ],
    data() {
      return {
        currentPreset: null
      };
    },
    computed: {
      ...mapGetters('profiles', [
        'allProfiles'
      ]),
      selectData() {
        const data = [];
        const allProfiles = this.allProfiles;
        if(!Object.prototype.hasOwnProperty.call(allProfiles, this.profile)) return [];

        const profile = allProfiles[this.profile];


        Object.keys(profile.presets).forEach((presetName) => {
          data.push({
            label: presetName,
            value: presetName
          });
        });

        data.sort((a, b) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        });

        return data;
      }
    },
    methods: {
      dropdownChanged(e) {
        this.currentPreset = e[0].value;
        this.$emit('input', this.currentPreset);
      }
    }
  };
</script>

<style lang='scss'>
  .preset-selector-container {
    display: inline-block;
  }

  .preset-selector.hsy-dropdown {
      display: inline-block;
      vertical-align: middle;

    & > .selected {
      // height: 28px !important;
      // line-height: 28px !important;

      font-family: inherit;
      /* font-size: 100%; */
      padding: .5em 22px .5em 1em;
      color: #444;
      color: rgba(0,0,0,.8);
      border: 1px solid #999;
      border: 0 rgba(0,0,0,0);
      background-color: #E6E6E6;
      text-decoration: none;
      border-radius: 2px;
    }
  }
</style>