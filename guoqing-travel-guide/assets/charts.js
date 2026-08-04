(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: Radar Chart (9 cities) ---
  var radarChart = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  radarChart.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: {
      data: ['洛阳', '太原', '张家界', '南昌', '武汉', '桂林', '福州', '兰州', '合肥'],
      bottom: 0,
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 12, itemHeight: 8, type: 'scroll'
    },
    radar: {
      indicator: [
        { name: '交通便利', max: 10 },
        { name: '气候舒适', max: 10 },
        { name: '人流控制', max: 10 },
        { name: '体验丰富', max: 10 },
        { name: '性价比', max: 10 }
      ],
      center: ['50%', '46%'],
      radius: '60%',
      axisName: { color: ink, fontSize: 13, fontWeight: 600 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: [bg2, 'rgba(212,118,42,0.03)', bg2, 'rgba(212,118,42,0.03)', bg2] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [9, 8, 9, 9, 8], name: '洛阳', itemStyle: { color: accent } },
        { value: [9, 7, 10, 8, 9], name: '太原', itemStyle: { color: accent2 } },
        { value: [8, 10, 7, 8, 6], name: '张家界', itemStyle: { color: accent3 } },
        { value: [8, 10, 9, 9, 7], name: '南昌', itemStyle: { color: '#5B7B8A' } },
        { value: [9, 9, 7, 9, 7], name: '武汉', itemStyle: { color: '#8B6914' } },
        { value: [7, 9, 7, 10, 7], name: '桂林', itemStyle: { color: '#6B8E23' } },
        { value: [7, 9, 9, 8, 7], name: '福州', itemStyle: { color: '#4682B4' } },
        { value: [8, 5, 9, 9, 5], name: '兰州', itemStyle: { color: '#A0522D' } },
        { value: [10, 8, 10, 7, 9], name: '合肥', itemStyle: { color: '#9932CC' } }
      ],
      areaStyle: { opacity: 0.06 },
      lineStyle: { width: 2 },
      symbolSize: 5
    }]
  });
  window.addEventListener('resize', function() { radarChart.resize(); });

  // --- Chart 2: Budget Bar Chart (9 cities) ---
  var budgetChart = echarts.init(document.getElementById('chart-budget'), null, { renderer: 'svg' });
  var cities = ['太原', '合肥', '洛阳', '福州', '南昌', '武汉', '桂林', '张家界', '兰州'];
  var budgetLow =  [8000, 8700, 11000, 11000, 12000, 12000, 12000, 14000, 15500];
  var budgetHigh = [13500, 14200, 17000, 18500, 19000, 19500, 19500, 21000, 23000];

  budgetChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true,
      formatter: function(params) {
        var city = params[0].name;
        var low = params[0].value;
        var high = params[1].value;
        return '<strong>' + city + '</strong><br/>预算下限: ' + low.toLocaleString() + ' 元<br/>预算上限: ' + high.toLocaleString() + ' 元<br/>3人7天合计';
      }
    },
    legend: {
      data: ['预算下限', '预算上限'],
      bottom: 0, textStyle: { color: muted, fontSize: 12 }
    },
    grid: { left: '3%', right: '5%', bottom: '15%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category', data: cities,
      axisLabel: { color: ink, fontSize: 12, fontWeight: 600 },
      axisLine: { lineStyle: { color: rule } }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '元',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11, formatter: function(val) { return (val / 10000) + '万'; } },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { show: false }
    },
    series: [
      { name: '预算下限', type: 'bar', data: budgetLow, barWidth: 18, itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] } },
      { name: '预算上限', type: 'bar', data: budgetHigh, barWidth: 18, itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] } }
    ]
  });
  window.addEventListener('resize', function() { budgetChart.resize(); });

})();
