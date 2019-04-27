import * as echarts from '../ec-canvas/echarts';
import geoJson from 'mapData.js'; //全国坐标
const geoCoordMap = require('map.js').default.geoCoordMap; //城市坐标
var app = getApp()
function initChart(canvas, width, height, dataBar) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    // console.log(dataBar);
    var option = {
        backgroundColor: '#fff',
        legend: {
            // orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            itemHeight: 5,
            align: 'left',
            itemWidth: 10,
            itemGap: 25,
            textStyle: {
                color: '#333',
                fontSize: 16
            },
            data: ['百度', '360搜索', '搜狗', '搜狗移动', '神马搜索', '百度移动']
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['50', '70'],
            center: ['50%', '40%'],
            data: [

                {
                    value: dataBar.rankBaiduNum != null ? dataBar.rankBaiduNum:0,
                    name: '百度',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#001b7d'
                            }, {
                                offset: 1,
                                color: '#001b7d'
                            }]),
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            // shadowBlur: 10,

                        }
                    }
                },
                {
                    value: dataBar.rank360Num != null ? dataBar.rank360Num:0,
                    name: '360搜索',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#0033f3'
                            }, {
                                offset: 1,
                                color: '#0033f3'
                            }]),
                            shadowColor: '#ccc',
                            // shadowBlur: 10,

                        }
                    }
                },
                {
                    value: dataBar.numMsougouRank != null ? dataBar.numMsougouRank:0,
                    name: '搜狗移动',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#3964f9'
                            }, {
                                offset: 1,
                                color: '#3964f9'
                            }]),
                            shadowColor: '#ccc',
                            // shadowBlur: 10,

                        }
                    }
                },
                {
                    value: dataBar.rankSougouNum != null ? dataBar.rankSougouNum:0,
                    name: '搜狗',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#7e9bff'
                            }, {
                                offset: 1,
                                color: '#7e9bff'
                            }]),
                            shadowColor: '#ccc',
                            // shadowBlur: 10,

                        }
                    }
                },
                {
                    value: dataBar.numMbaiduRank != null ? dataBar.numMbaiduRank:0,
                    name: '百度移动',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#c1ceff'
                            }, {
                                offset: 1,
                                color: '#c1ceff'
                            }]),
                            shadowColor: '#ccc',
                            // shadowBlur: 10,

                        }
                    }
                },
                {
                    value: dataBar.numMsmRank != null ? dataBar.numMsmRank:0,
                    name: '神马搜索',
                    label: {
                        normal: {
                            textStyle: {
                                color: "#3fa7dc",
                                fontSize: 18
                            },
                            show: false,
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#d4defe'
                            }, {
                                offset: 1,
                                color: '#d4defe'
                            }]),
                            shadowColor: '#ccc',
                            // shadowBlur: 10,

                        }
                    }
                }
            ]
        }]
    };

    chart.setOption(option);
    return chart;
}
//地图
var mapArr = [{
        name: "海门",
        value: 279
    },
    {
        name: "鄂尔多斯",
        value: 29
    },
    {
        name: "招远",
        value: 200
    },
];
var convertData = function(data) {
    var res = [];
    // for (var i = 0; i < data.length; i++) {
    //     var geoCoord = geoCoordMap[data[i].name];
    //     if (geoCoord) {
    //         res.push({
    //             name: data[i].name,
    //             value: geoCoord.concat(data[i].value)
    //         });
    //     }
    // }
    return res;
};
//
function initChartMap(canvas, width, height) {
    const chartMap = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chartMap);

    echarts.registerMap('china', geoJson);

    const option = {
        backgroundColor: '#fff',
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: 'rgba(36, 37, 45,1)',
                    borderColor: "rgb(101,101,102)",
                    /**线条颜色*/
                    borderWidth: 0.5,
                    /**线条宽*/
                },
                emphasis: {
                    areaColor: 'rgba(36, 37, 45,1)'
                }
            }
        },
        series: [{
            name: 'pm2.5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapArr),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            color: 'rgba(0,160,233,0.8)',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: 'rgba(14, 145, 252, 0.26)',
                    borderWidth: 10
                }
            }
        }]

    };

    chartMap.setOption(option);

    return chartMap;
}
// 柱状图
function initChartBar(canvas, width, height, dataKey) {
    const chartBar = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chartBar);
    // console.log(dataKey)
    var option = {
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'cross',
        //     }
        // },
        legend: {
            data: ['主词数量', '产品词数量', '地区产品词数量', '产品行业词数量', '地区产品行业词数量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            //设置字体倾斜
            axisLabel: {
                interval: 0,
                rotate: 45, //倾斜度 -90 至 90 默认为0
                margin: 2,
                textStyle: {
                    fontWeight: "none",
                }
            },
        },
        yAxis: {
            type: 'category',
            data: ['百度', '搜狗', '360', '百度移动', '搜狗移动', '360移动']
        },
        series: [{
                name: '主词数量',
                type: 'bar',
                data: [dataKey.type_baidu_A,
                    dataKey.type_sougou_A,
                    dataKey.type_360_A,
                    dataKey.type_mbaidu_A,
                    dataKey.type_msogou_A,
                    dataKey.type_msm_A
                ],
                // showValue: [dataKey.type_baidu_A != null ? dataKey.type_baidu_A : 0,
                //     dataKey.type_sougou_A != null ? dataKey.type_sougou_A : 0,
                //     dataKey.type_360_A != null ? dataKey.type_360_A : 0,
                //     dataKey.type_mbaidu_A != null ? dataKey.type_mbaidu_A : 0,
                //     dataKey.type_msogou_A != null ? dataKey.type_msogou_A : 0,
                //     dataKey.type_msm_A != null ? dataKey.type_msm_A : 0
                // ],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#83bff6'
                                },
                                {
                                    offset: 1,
                                    color: '#188df0'
                                }
                            ]
                        )
                    }
                },
            },
            {
                name: '产品词数量',
                type: 'bar',
                data: [dataKey.type_baidu_B,
                    dataKey.type_sougou_B,
                    dataKey.type_360_B,
                    dataKey.type_mbaidu_B,
                    dataKey.type_msogou_B,
                    dataKey.type_msm_B
                ],
                // showValue: [dataKey.type_baidu_B != null ? dataKey.type_baidu_B : 0,
                //     dataKey.type_sougou_B != null ? dataKey.type_sougou_B : 0,
                //     dataKey.type_360_B != null ? dataKey.type_360_B : 0,
                //     dataKey.type_mbaidu_B != null ? dataKey.type_mbaidu_B : 0,
                //     dataKey.type_msogou_B != null ? dataKey.type_msogou_B : 0,
                //     dataKey.type_msm_B != null ? dataKey.type_msm_B : 0
                // ],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgb(247,127,203)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(247,127,203)'
                                }
                            ]
                        )
                    }
                },
            },
            {
                name: '地区产品词数量',
                type: 'bar',
                data: [dataKey.type_baidu_C,
                    dataKey.type_sougou_C,
                    dataKey.type_360_C,
                    dataKey.type_mbaidu_C,
                    dataKey.type_msogou_C,
                    dataKey.type_msm_C
                ],
                // showValue: [dataKey.type_baidu_C != null ? dataKey.type_baidu_C : 0,
                //     dataKey.type_sougou_C != null ? dataKey.type_sougou_C : 0,
                //     dataKey.type_360_C != null ? dataKey.type_360_C : 0,
                //     dataKey.type_mbaidu_C != null ? dataKey.type_mbaidu_C : 0,
                //     dataKey.type_msogou_C != null ? dataKey.type_msogou_C : 0,
                //     dataKey.type_msm_C != null ? dataKey.type_msm_C : 0
                // ],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#83bff6'
                                },
                                {
                                    offset: 1,
                                    color: '#188df0'
                                }
                            ]
                        )
                    }
                },
            },
            {
                name: '产品行业词数量',
                type: 'bar',
                data: [dataKey.type_baidu_D,
                    dataKey.type_sougou_D,
                    dataKey.type_360_D,
                    dataKey.type_mbaidu_D,
                    dataKey.type_msogou_D,
                    dataKey.type_msm_D
                ],
                // showValue: [dataKey.type_baidu_D != null ? dataKey.type_baidu_D : 0,
                //     dataKey.type_sougou_D != null ? dataKey.type_sougou_D : 0,
                //     dataKey.type_360_D != null ? dataKey.type_360_D : 0,
                //     dataKey.type_mbaidu_D != null ? dataKey.type_mbaidu_D : 0,
                //     dataKey.type_msogou_D != null ? dataKey.type_msogou_D : 0,
                //     dataKey.type_msm_D != null ? dataKey.type_msm_D : 0
                // ],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgb(247,127,203)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(247,127,203)'
                                }
                            ]
                        )
                    }
                },
            },
            {
                name: '地区产品行业词数量',
                type: 'bar',
                data: [dataKey.type_baidu_E,
                    dataKey.type_sougou_E,
                    dataKey.type_360_E,
                    dataKey.type_mbaidu_E,
                    dataKey.type_msogou_E,
                    dataKey.type_msm_E
                ],
                // showValue: [dataKey.type_baidu_E != null ? dataKey.type_baidu_E : 0,
                //     dataKey.type_sougou_E != null ? dataKey.type_sougou_E : 0,
                //     dataKey.type_360_E != null ? dataKey.type_360_E : 0,
                //     dataKey.type_mbaidu_E != null ? dataKey.type_mbaidu_E : 0,
                //     dataKey.type_msogou_E != null ? dataKey.type_msogou_E : 0,
                //     dataKey.type_msm_E != null ? dataKey.type_msm_E : 0
                // ],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#83bff6'
                                },
                                {
                                    offset: 1,
                                    color: '#188df0'
                                }
                            ]
                        )
                    }
                },
            },
        ]
    };
    // console.log(app.globalData.mesgs)
    // console.log(dataKey)
    chartBar.setOption(option);
    return chartBar;
}
module.exports.initChart = initChart;
module.exports.initChartMap = initChartMap;
module.exports.initChartBar = initChartBar;