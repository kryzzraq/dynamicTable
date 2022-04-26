<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <v-img
          class="mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.linkedin.com/in/laura-martin-vicente/"
        target="_blank"
        text
        color="secondary"
      >
        <span class="mr-2">Laura Martín</span>
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container v-if="!loading">
        <DynamicTable :columns="columns" />
      </v-container>
      <v-container v-else class="d-flex justify-center align-self-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          class="progress__circular"
        ></v-progress-circular>
      </v-container>
    </v-main>
   <v-footer padless color="primary">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong> Vue & Vuetify</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import DynamicTable from './components/DynamicTable.vue';

export default {
  name: 'App',
  components: {
    DynamicTable,
  },
  computed: {
    ...mapState(['columns', 'data']),
  },
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>

<style lang='sass' scoped>
.progress__circular
  transform: translateY(35vh)

</style>
