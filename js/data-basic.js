var tableDataConfig = function () {
  var flyErrorTableDataConfig = {
    colName: ['起飞机场-航路点-机型', '实际飞行时间平均值', '实际飞行时间中位数', 'SCH中位数时间差', 'FPL中位数时间差', 'DEP中位数时间差', 'DYN10中位数时间差', 'DYN20中位数时间差,', 'SCH平均时间差', 'FPL平均时间差', 'DEP平均时间差', 'DYN10平均时间差', 'DYN20平均时间差'],
    colModel: [
      {
        name: 'flyDepPointType',
        index: 'flyDepPointType',
        frozen: true
      }, {
        name: 'rdepAvgTime',
        index: 'rdepAvgTime',
        formatter: timeFormater
      }, {
        name: 'rdepMeTime',
        index: 'rdepMeTime',
        formatter: timeFormater
      }, {
        name: 'schMeDis',
        index: 'schMeDis',
        formatter: timeFormater
      }, {
        name: 'fplMeDis',
        index: 'fplMeDis',
        formatter: timeFormater
      }, {
        name: 'depMeDis',
        index: 'depMeDis',
        formatter: timeFormater
      }, {
        name: 'dyn10mMeDis',
        index: 'dyn10mMeDis',
        formatter: timeFormater
      }, {
        name: 'dyn20mMeDis',
        index: 'dyn20mMeDis',
        formatter: timeFormater
      }, {
        name: 'schAvgDis',
        index: 'schAvgDis',
        formatter: timeFormater
      }, {
        name: 'fplAvgDis',
        index: 'fplAvgDis',
        formatter: timeFormater
      }, {
        name: 'depAvgDis',
        index: 'depAvgDis',
        formatter: timeFormater
      }, {
        name: 'dyn10mAvgDis',
        index: 'dyn10mAvgDis',
        formatter: timeFormater
      }, {
        name: 'dyn20mAvgDis',
        index: 'dyn20mAvgDis',
        formatter: timeFormater
      }],
    data: []
  }
  var terminalPointDataConfigTop = {
    colName: ['起飞机场', '终端区航路点', 'SCH中位数时间差', 'FPL中位数时间差', 'DEP中位数时间差', 'DYN10中位数时间差', 'DYN20中位数时间差', 'SCH平均数时间差', 'FPL平均数时间差', 'DEP平均数时间差', 'DYN10平均数时间差', 'DYN20平均数时间差'],
    colModel: [{
      name: 'depAirport',
      index: 'depAirport',
      frozen: true
    }, {
      name: 'terPoint',
      index: 'terPoint'
    }, {
      name: 'schMeDis',
      index: 'schMeDis'
    }, {
      name: 'fplMeDis',
      index: 'fplMeDis'
    }, {
      name: 'depMeDis',
      index: 'depMeDis'
    }, {
      name: 'dyn10mMeDis',
      index: 'dyn10mMeDis'
    }, {
      name: 'dyn20mMeDis',
      index: 'dyn20mMeDis'
    }, {
      name: 'schAvgDis',
      index: 'schAvgDis'
    }, {
      name: 'fplAvgDis',
      index: 'fplAvgDis'
    }, {
      name: 'depAvgDis',
      index: 'depAvgDis'
    }, {
      name: 'dyn10mAvgDis',
      index: 'dyn10mAvgDis'
    }, {
      name: 'dyn20mAvgDis',
      index: 'dyn20mAvgDis'
    }],
    data: []
  }
  var terminalPointDataConfigDown = {
    colName: ['起飞机场', '终端区航路点', 'SCH中位数高度差', 'FPL中位数高度差', 'DEP中位数高度差', 'DYN10中位数高度差', 'DYN20中位数高度差', 'SCH平均数高度差', 'FPL平均数高度差', 'DEP平均数高度差', 'DYN10平均数高度差', 'DYN20平均数高度差'],
    colModel: [{
      name: 'depAirport',
      index: 'depAirport',
      frozen: true
    }, {
      name: 'terPoint',
      index: 'terPoint'
    }, {
      name: 'schMeHLevel',
      index: 'schMeHLevel'
    }, {
      name: 'fplMeHLevel',
      index: 'fplMeHLevel'
    }, {
      name: 'depMeHLevel',
      index: 'depMeHLevel'
    }, {
      name: 'dyn10MeHLevel',
      index: 'dyn10MeHLevel'
    }, {
      name: 'dyn20MeHLevel',
      index: 'dyn20MeHLevel'
    }, {
      name: 'schAvgHLevel',
      index: 'schAvgHLevel'
    }, {
      name: 'fplAvgHLevel',
      index: 'fplAvgHLevel'
    }, {
      name: 'depAvgHLevel',
      index: 'depAvgHLevel'
    }, {
      name: 'dyn10AvgHLevel',
      index: 'dyn10AvgHLevel'
    }, {
      name: 'dyn20AvgHLevel',
      index: 'dyn20AvgHLevel'
    }
    ],
    data: []
  }
  var flyDetailDataConfig = {
    colName: ['ID', '航班号', '机型', '实际飞行时间', 'SHC飞行时间', 'FPL飞行时间', 'DEP飞行时间', 'DYN10飞行时间', 'DYN20飞行时间'],
    colModel: [
      {
        name: 'id',
        index: 'id',
        frozen: true
      }, {
        name: 'flightID',
        index: 'flightID'
      }, {
        name: 'aircraftType',
        index: 'aircraftType'
      }, {
        name: 'rPastTime',
        index: 'rPastTime'
      }, {
        name: 'schPastTime',
        index: 'schPastTime'
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime'
      }, {
        name: 'depPastTime',
        index: 'depPastTime'
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime'
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime'
      }],
    data: []
  }
  var terminalDetailDataConfig = {
    colName: ['ID', '航班号', '机型', '实际过点时间', 'SHC过点时间', 'FPL过点时间', 'DEP过点时间', 'DYN10过点时间', 'DYN20过点时间', '实际过点高度', 'SHC过点高度', 'FPL过点高度', 'DEP过点高度', 'DYN10过点高度', 'DYN20过点高度'],
    colModel: [
      {
        name: 'id',
        index: 'id',
        frozen: true
      }, {
        name: 'flightID',
        index: 'flightID'
      }, {
        name: 'aircraftType',
        index: 'aircraftType'
      }, {
        name: 'rPastTime',
        index: 'rPastTime',
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return cellvalue.substring(8, 12);
          } else {
            return '';
          }
        }
      }, {
        name: 'schPastTime',
        index: 'schPastTime',
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return cellvalue.substring(8, 12);
          } else {
            return '';
          }
        }
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime',
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return cellvalue.substring(8, 12);
          } else {
            return '';
          }
        }
      }, {
        name: 'depPastTime',
        index: 'depPastTime',
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return cellvalue.substring(8, 12);
          } else {
            return '';
          }
        }
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime'
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime'
      }, {
        name: 'rPasthlevel',
        index: 'rPasthlevel'
      }, {
        name: 'schhlevel',
        index: 'schhlevel'
      }, {
        name: 'fplhlevel',
        index: 'fplhlevel'
      }, {
        name: 'dephlevel',
        index: 'dephlevel'
      }, {
        name: 'dyn10hlevel',
        index: 'dyn10hlevel'
      }, {
        name: 'dyn20hlevel',
        index: 'dyn20hlevel'
      }
    ],
    data: []
  }

  /**
   * 调整表格大小以适应所在容器
   *
   * */
  function resizeToFitContainer(tableId) {
    // 获取表格结构下元素
    var gridTableGBox = $('#gbox_' + tableId);
    var gridTableGView = $('#gview_' + tableId);
    var gridTableBDiv = gridTableGView.find('.ui-jqgrid-bdiv');

    // 获取容器高度
    var container = gridTableGBox.parent();

    // 计算表格高度
    var gridTableHeight = gridTableBDiv.outerHeight() - (gridTableGBox.outerHeight() - container.height());
    var gridTableWidth = container.width();

    // 调用表格修改高度宽度方法
    $('#' + tableId).jqGrid('setGridHeight', gridTableHeight);
    $('#' + tableId).jqGrid('setGridWidth', (gridTableWidth - 2));
  }

  var timeFormater = function (cellvalue, options, rowObject) {
    if ($.isValidVariable(cellvalue)) {
      return cellvalue + '(s)';
    } else {
      return '';
    }
  }
  /*数据样例*/
  var data = {
    // "map": {
    //     "ZBAA-BOBAK": {
    //         "schAvgHLevel": -42,
    //         "fplAvgHLevel": -2,
    //         "depAvgHLevel": -24,
    //         "dyn10AvgHLevel": -34,
    //         "dyn20AvgHLevel": -47,
    //         "schAvgDis": 1023,
    //         "fplAvgDis": 1505,
    //         "depAvgDis": 215,
    //         "dyn10mAvgDis": 185,
    //         "dyn20mAvgDis": 157,
    //         "schMeHLevel": -53,
    //         "fplMeHLevel": 0,
    //         "depMeHLevel": -9,
    //         "dyn10MeHLevel": -30,
    //         "dyn20MeHLevel": -57,
    //         "schMeDis": 727,
    //         "fplMeDis": 1089,
    //         "depMeDis": 194,
    //         "dyn10mMeDis": 153,
    //         "dyn20mMeDis": 142,
    //         "flightcount": 55
    //     }
    // },
    // "infoMap": {
    //     "ZBAA-BOBAK": [
    //         {
    //             "id": 37266253,
    //             "flightID": "CCA1206",
    //             "aircraftType": "A321",
    //             "rPastTime": "20180105104459",
    //             "schPastTime": "20180105100756",
    //             "fplPastTime": "20180105100915",
    //             "depPastTime": "20180105104144",
    //             "dyn10PastTime": "20180105104144",
    //             "dyn20PastTime": "20180105104226",
    //             "rPasthlevel": "FL147",
    //             "schhlevel": "FL220",
    //             "fplhlevel": "FL220",
    //             "dephlevel": "FL220",
    //             "dyn10hlevel": "FL220",
    //             "dyn20hlevel": "FL220"
    //         },
    //         {
    //             "id": 37266253,
    //             "flightID": "CCA1206",
    //             "aircraftType": "A321",
    //             "rPastTime": "20180105104459",
    //             "schPastTime": "20180105100756",
    //             "fplPastTime": "20180105100915",
    //             "depPastTime": "20180105104144",
    //             "dyn10PastTime": "20180105104144",
    //             "dyn20PastTime": "20180105104226",
    //             "rPasthlevel": "FL147",
    //             "schhlevel": "FL220",
    //             "fplhlevel": "FL220",
    //             "dephlevel": "FL220",
    //             "dyn10hlevel": "FL220",
    //             "dyn20hlevel": "FL220"
    //         },
    //     ]
    // },
    // "commonTypeMap": {
    //     "B738": {
    //         "schAvgHLevel": -34,
    //         "fplAvgHLevel": 0,
    //         "depAvgHLevel": -8,
    //         "dyn10AvgHLevel": -18,
    //         "dyn20AvgHLevel": -30,
    //         "schAvgDis": 767,
    //         "fplAvgDis": 690,
    //         "depAvgDis": 199,
    //         "dyn10mAvgDis": 203,
    //         "dyn20mAvgDis": 190,
    //         "schMeHLevel": -33,
    //         "fplMeHLevel": 0,
    //         "depMeHLevel": 0,
    //         "dyn10MeHLevel": -9,
    //         "dyn20MeHLevel": -34,
    //         "schMeDis": 574,
    //         "fplMeDis": 577,
    //         "depMeDis": 131,
    //         "dyn10mMeDis": 133,
    //         "dyn20mMeDis": 136,
    //         "flightcount": 46
    //     },
    // },
    // "typeMap": {
    //     "D": {
    //         "schAvgHLevel": -13,
    //         "fplAvgHLevel": 10,
    //         "depAvgHLevel": -2,
    //         "dyn10AvgHLevel": -20,
    //         "dyn20AvgHLevel": -8,
    //         "schAvgDis": 1446,
    //         "fplAvgDis": 2084,
    //         "depAvgDis": 173,
    //         "dyn10mAvgDis": 246,
    //         "dyn20mAvgDis": 163,
    //         "schMeHLevel": -10,
    //         "fplMeHLevel": 9,
    //         "depMeHLevel": 0,
    //         "dyn10MeHLevel": -14,
    //         "dyn20MeHLevel": -16,
    //         "schMeDis": 908,
    //         "fplMeDis": 1344,
    //         "depMeDis": 120,
    //         "dyn10mMeDis": 266,
    //         "dyn20mMeDis": 188,
    //         "flightcount": 19
    //     },
    //
    // },
    // "generateTime": "201801051203",
    // "status": 0
  }
  return {
    flyErrorTableDataConfig: flyErrorTableDataConfig,
    terminalPointDataConfigTop: terminalPointDataConfigTop,
    terminalPointDataConfigDown: terminalPointDataConfigDown,
    resizeToFitContainer: resizeToFitContainer,
    flyDetailDataConfig: flyDetailDataConfig,
    terminalDetailDataConfig: terminalDetailDataConfig,
    data: data
  }
};

$(document).ready(function () {
  tableDataConfig();
});