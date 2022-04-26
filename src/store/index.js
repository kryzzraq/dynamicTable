import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    columns: [
      {
        field: 'id',
        label: 'Id',
        format: 'numeric',
        sortable: true,
      },
      {
        field: 'plate',
        label: 'Plate',
        sortable: true,
      },
      {
        field: 'location',
        label: 'Location',
        sortable: true,
        format: 'location',
      },
      {
        field: 'speed',
        label: 'Speed',
        sortable: false,
        format: 'speed',
        measure: 'kmh',
        precision: 2,
      },
      {
        field: 'speed_average',
        label: 'Speed Avg',
        sortable: false,
        format: 'speed',
        measure: 'mph',
        precision: 3,
      },
      {
        field: 'temperature_front',
        label: 'Front Tmp.',
        sortable: true,
        format: 'temperature',
        measure: 'celsius',
      },
      {
        field: 'temperature_back',
        label: 'Back Tmp.',
        sortable: true,
        format: 'temperature',
        measure: 'fahrenheit',
      },
    ],
    data: [
      {
        id: 1,
        plate: '0000LBN',
        location: {
          country: 'Spain',
          city: 'Valencia',
          postal_code: '46004',
          address: 'Carrer de Colón',
        },
        speed: 25.56789,
        speed_average: 30.123456789,
        temperature_front: 19.5456789,
        temperature_back: 3.23456789,
      },
      {
        id: 2,
        plate: '8964LVF',
        location: {
          country: 'Spain',
          city: 'Guadalajara',
          postal_code: '19004',
          address: 'Calle Mayor',
        },
        speed: 50,
        speed_average: 33.64,
        temperature_front: 10.8,
        temperature_back: 1.23,
      },
      {
        id: 3,
        plate: '2341HDK',
        location: {
          country: 'Spain',
          city: 'Madrid',
          postal_code: '28080',
          address: 'Calle Cocacola',
        },
        speed: 20.53,
        speed_average: 36.42,
        temperature_front: 13.5,
        temperature_back: 8.34,
      },
      {
        id: 4,
        plate: '4852MDL',
        location: {
          country: 'Spain',
          city: 'Valencia',
          postal_code: '46004',
          address: 'Calle Ratón',
        },
        speed: 73.43,
        speed_average: 53.64,
        temperature_front: 12.4,
        temperature_back: 11.54,
      },
      {
        id: 5,
        plate: '8403JLR ',
        location: {
          country: 'Spain',
          city: 'Segovia',
          postal_code: '23653',
          address: 'Calle Monitor',
        },
        speed: 54,
        speed_average: 24.76,
        temperature_front: 10.8,
        temperature_back: 5.23,
      },
      {
        id: 6,
        plate: '9473SLE',
        location: {
          country: 'Spain',
          city: 'Galicia',
          postal_code: '10235',
          address: 'Calle Teclado',
        },
        speed: 86,
        speed_average: 76.26,
        temperature_front: 15.8,
        temperature_back: 3.25,
      },
    ],
  },
  getters: {
  },
  mutations: {
    mutAddColumn(state, obj) {
      state.data.push(obj);
    },
  },
  actions: {
    actAddColumn({ commit }, obj) {
      commit('mutAddColumn', obj);
    },
  },
  modules: {
  },
});
