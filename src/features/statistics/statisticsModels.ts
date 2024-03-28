export const baseChartOptions = {
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
