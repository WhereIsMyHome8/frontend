<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { mapState } from "vuex";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { getApartDeals } from "@/api/apt";
// import { mapGetters } from "vuex";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  //...mapGetters("aptStore", ["getaptCode"]),
  computed: mapState("aptStore", ["aptCode"]),
  // computed: { ...mapGetters("aptStore", ["getaptCode"]) },
  watch: {

    aptCode(newVal, oldval) {
      console.log(`watched: ${oldval} => ${newVal}`);
      // this.chartData.datasets[0].label = newVal;
      console.log("전" + this.chartData.labels);

      //가져온 데이터를 가공을 해야함

      let temp_date = [];
      let temp_value = [];
      getApartDeals(newVal, ({ data }) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          let datez =
            element.dealYear +
            "년" +
            element.dealMonth +
            "월" +
            element.dealDay +
            "일";

          temp_date.push(datez);

          temp_value.push(parseInt(element.dealAmount) * 1000);
        }
        this.chartData.labels = temp_date;
        this.chartData.datasets[0].data = temp_value;
      });
      // console.log("후" + this.chartData.labels);
    },
  },

  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [],

        datasets: [
          {
            label: "아파트 거래량",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
