<template>
  <section class='d-flex flex-column justify-center pt-4'>
    <table class='table'>
      <thead>
        <tr class='table__titles'>
          <th></th>
          <th class='px-7 py-2' v-for='column in columns'
          :key='column.field' @click="sortTable(column.field)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(row, index) in data' :key='row.id'
          v-show="(pag - 1) * pagination <= index  && pag * pagination > index"
        >
          <td>
             <v-checkbox
              v-model="selected"
              color="primary"
              :value="row"
              hide-details
              class="pa-0 ma-0"
            ></v-checkbox>
          </td>
          <td>{{ row.id }}</td>
          <td>{{ row.plate }}</td>
          <td>
            {{row.location.address}}, {{row.location.city}},
            {{row.location.postal_code}}, {{row.location.country}}
          </td>
          <td>{{ row.speed }}</td>
          <td>{{ row.speed_average }}</td>
          <td>{{ row.temperature_front }}</td>
          <td>{{ row.temperature_back }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="table__bottom">
          <td>
            <v-btn rounded icon small v-show="pag != 1" @click.prevent="pag -= 1">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
          </td>
          <td colspan="6">
            <v-select
              :items="quantity"
              v-model="pagination"
              outlined
              dense
              class="table__pagination"
            ></v-select>
          </td>
          <td class='text-right'>
            <v-btn rounded icon small
              v-show="pag * pagination / data.length < 1" @click.prevent="pag += 1"
            >
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="mt-4">
       <v-btn outlined @click="AddColumn()" >
        Add data
      </v-btn>
    </div>
    <div v-if="selected.length" class="my-4 d-flex flex-column">
      <DownloadData :selectedItems="selected"/>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DownloadData from './DownloadData.vue';

export default {
  name: 'DynamicTable',
  components: {
    DownloadData,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['data']),
  },
  data: () => ({
    quantity: [5, 10, 15],
    pagination: 5,
    selected: [],
    pag: 1,
    loading: false,
    newItem: {
      id: 7,
      plate: '8964LVF',
      location: {
        country: 'Spain',
        city: 'Madrid',
        postal_code: '28080',
        address: 'Calle Cocacola',
      },
      speed: 73.43,
      speed_average: 24.76,
      temperature_front: 12.8,
      temperature_back: 7.25,
    },
    ascending: false,
    sortColumn: '',
  }),
  methods: {
    sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      const { ascending } = this;
      this.data.sort((a, b) => {
        // need to do a new sort if user select 'location' because 'location'
        // constains an object not a primitive type
        if (col === 'location') {
          if (a[col].postal_code > b[col].postal_code) {
            return ascending ? 1 : -1;
          } if (a[col].postal_code < b[col].postal_code) {
            return ascending ? -1 : 1;
          }
          return 0;
        }

        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    AddColumn() {
      this.actAddColumn(this.newItem);
    },
    ...mapActions([
      'actAddColumn',
    ]),
  },
};
</script>

<style lang='sass' scoped>
@import '../styles/settings.sass'

.table
  border-bottom: 0.2em solid $primary
  padding-bottom: .5em
  border-collapse: collapse

  td
    padding: .5em
    border-bottom: 1px solid $light-grey
    text-align: center

  th
    cursor: pointer

  th:first-child
    border-radius: .3em 0 0 .3em
    padding-left: .5em

  th:last-child
    border-radius: 0 .3em .3em 0
    padding-left: .5em

  &__titles
    background-color: $primary
    padding: 0.2em

  &__bottom
    background-color: $primary
    border-radius: 0 0 .3em .3em

  &__pagination
    background: white
    height: 40px
    width: 75px
    margin: auto !important
</style>
