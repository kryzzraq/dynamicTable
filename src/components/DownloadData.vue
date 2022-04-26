<template>
  <div v-if="selectedItems.length" class="pb-4 d-flex flex-column">
    <h3>Selected elements:</h3>
    <div class="d-flex flex-wrap">
      <div
        v-for="data in selectedItems"
        :key="data.id"
        class="d-flex flex-column py-2 px-5 selected"
      >
        <span>
          <span class="title__selected">Id:</span>
          {{ data.id }}
        </span>
        <span>
          <span class="title__selected">Plate:</span>
          {{ data.plate }}
        </span>
        <span>
          <span class="title__selected">Location:</span>
          <span class="info__location">
            <span>{{ data.location.address }}</span>
            <span>{{ data.location.city }}</span>
            <span>{{ data.location.postal_code }}</span>
            <span>{{ data.location.country }}</span>
          </span>
        </span>
        <span>
          <span class="title__selected">Speed:</span>
          {{ data.speed }}
        </span>
        <span>
          <span class="title__selected">Avg speed: </span>
          {{ data.speed_average }}
        </span>
        <span>
          <span class="title__selected">Temperature front </span>
          {{ data.temperature_front }}
        </span>
        <span>
          <span class="title__selected">Temperature back:</span>
          {{ data.temperature_back }}
        </span>
      </div>
    </div>
    <v-btn :loading="loading" class="ma-1" outlined @click="remove">
      Download data
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DownloadData',
  props: {
    selectedItems: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    remove() {
      this.loading = true;
      setTimeout(() => {
        // To format the array in to a CSV string
        const csvString = [
          ['ID', 'Plate', 'Country', 'City', 'Postal Code', 'Adress', 'Speed', 'Avg Speed', 'Temperature Front', 'Temperature Back'],
          ...this.selectedItems.map((item) => [
            item.id,
            item.plate,
            item.location.country,
            item.location.city,
            item.location.postal_code,
            item.location.address,
            item.speed,
            item.speed_average,
            item.temperature_front,
            item.temperature_back,
          ]),
        ]
          .map((e) => e.join(','))
          .join('\n');

        // To download data as a CSV file
        const linkData = document.createElement('a');
        linkData.href = `data:text/csv;charset=utf-8,${encodeURI(csvString)}`;
        linkData.target = '_blank';
        linkData.download = 'data.csv';
        linkData.click();

        this.loading = false;
      }, 1500);
    },
  },
};
</script>

<style lang='sass'>
@import '../styles/settings.sass'

.selected
  border: 1px solid $primary
  border-radius: 5px
  margin: 1em
  min-width: 375px

  .info__location
    span
      padding-left: 3px

  .title__selected
    font-weight: bold
</style>
