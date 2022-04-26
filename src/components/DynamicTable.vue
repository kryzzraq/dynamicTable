<template>
  <section class='d-flex flex-column justify-center pt-4'>
    <table class='table'>
      <thead>
        <tr class='table__titles'>
          <th></th>
          <th class='px-7 py-2' v-for='column in columns' :key='column.field'>
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(row, index) in rows' :key='row.id'
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
              v-show="pag * pagination / rows.length < 1" @click.prevent="pag += 1"
            >
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </td>
        </tr>
      </tfoot>
    </table>
    <div v-if="selected.length" class="my-4 d-flex flex-column">
      <DownloadData :selectedItems="selected"/>
    </div>
  </section>
</template>

<script>
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
    rows: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    quantity: [5, 10, 15],
    pagination: 5,
    selected: [],
    pag: 1,
    loading: false,
  }),
  methods: {
    remove() {
      // eslint-disable-next-line
      // debugger;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
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
