export const baseChartOptions = {
  title: {
    text: "Fascicle Length over Time",
  },
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      restore: {},
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 10,
      handleIcon:
        "M8.2,13.2V2.8c0-0.4-0.3-0.8-0.8-0.8H1.6C1.1,2,0.8,2.4,0.8,2.8v10.4C0.8,13.6,1.1,14,1.6,14h5.8C7.9,14,8.2,13.6,8.2,13.2z",
      handleSize: "80%",
      handleStyle: {
        color: "#fff",
        shadowBlur: 3,
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
    },
  ],
};

export const chartOptions = {
  title: {
    text: "Fascicle Length over Time",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["1", "2", "3"],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      restore: {},
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 10,
      handleIcon:
        "M8.2,13.2V2.8c0-0.4-0.3-0.8-0.8-0.8H1.6C1.1,2,0.8,2.4,0.8,2.8v10.4C0.8,13.6,1.1,14,1.6,14h5.8C7.9,14,8.2,13.6,8.2,13.2z",
      handleSize: "80%",
      handleStyle: {
        color: "#fff",
        shadowBlur: 3,
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
    },
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "1",
      type: "line",
      data: [
        447.214, 445.986, 444.762, 443.542, 442.327, 441.115, 439.908, 438.705,
        437.507, 436.312, 435.122, 433.936, 432.755, 431.578, 430.406, 429.238,
      ],
      color: "red",
      markLine: {
        silent: true,
        data: [
          {
            xAxis: "7",
            label: {
              show: true,
              formatter: "Current Frame",
            },
          },
        ],
        lineStyle: {
          color: "black",
          type: "solid",
        },
      },
    },
  ],
};
