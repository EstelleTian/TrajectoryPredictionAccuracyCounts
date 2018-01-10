var tableDataConfig = function () {
  var flyErrorTableDataConfig = {
    colName: ['起飞机场-航路点-机型', '实际飞行时间平均值(秒)', '实际飞行时间中位数(秒)', 'SCH中位数时间差(秒)', 'FPL中位数时间差(秒)', 'DEP中位数时间差(秒)', 'DYN10中位数时间差(秒)', 'DYN20中位数时间差(秒)', 'SCH平均时间差(秒)', 'FPL平均时间差(秒)', 'DEP平均时间差(秒)', 'DYN10平均时间差(秒)', 'DYN20平均时间差(秒)'],
    colTitle: {
      flyDepPointType:'航路点',
      rdepAvgTime:'实际飞行时间平均值(秒)',
      rdepMeTime:'实际飞行时间中位数(秒)',
      schMeDis:'SCH中位数时间差(秒)',
      fplMeDis:'FPL中位数时间差(秒)',
      depMeDis:'DEP中位数时间差(秒)',
      dyn10mMeDis:'DYN10中位数时间差(秒)',
      dyn20mMeDis:'DYN20中位数时间差(秒)',
      schAvgDis:'SCH平均时间差(秒)',
      fplAvgDis:'FPL平均时间差(秒)',
      depAvgDis:'DEP平均时间差(秒)',
      dyn10mAvgDis:'DYN10平均时间差(秒)',
      dyn20mAvgDis:'DYN20平均时间差(秒)'
    },
    colModel: [
      {
        name: 'flyDepPointType',
        index: 'flyDepPointType',
        frozen:true
      }, {
        name: 'rdepAvgTime',
        index: 'rdepAvgTime'
      }, {
        name: 'rdepMeTime',
        index: 'rdepMeTime'
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
  var terminalPointDataConfigTop = {
    colName: ['起飞机场', '终端区航路点', 'SCH中位数时间差(秒)', 'FPL中位数时间差(秒)', 'DEP中位数时间差(秒)', 'DYN10中位数时间差(秒)', 'DYN20中位数时间差(秒)', 'SCH平均数时间差(秒)', 'FPL平均数时间差(秒)', 'DEP平均数时间差(秒)', 'DYN10平均数时间差(秒)', 'DYN20平均数时间差(秒)'],
    colTitle:{
      depAirport:'起飞机场',
      terPoint:'终端区航路点',
      schMeDis:'SCH中位数时间差(秒)',
      fplMeDis:'FPL中位数时间差(秒)',
      depMeDis:'DEP中位数时间差(秒)',
      dyn10mMeDis:'DYN10中位数时间差(秒)',
      dyn20mMeDis:'DYN20中位数时间差(秒)',
      schAvgDis:'SCH平均数时间差(秒)',
      fplAvgDis:'FPL平均数时间差(秒)',
      depAvgDis:'DEP平均数时间差(秒)',
      dyn10mAvgDis:'DYN10平均数时间差(秒)',
      dyn20mAvgDis:'DYN20平均数时间差(秒)'
    },
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
      name: '',
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
    colTitle:{
      depAirport:'起飞机场',
      terPoint:'终端区航路点',
      schMeHLevel:'SCH中位数高度差',
      fplMeHLevel: 'FPL中位数高度差',
      depMeHLevel:'DEP中位数高度差',
      dyn10MeHLevel:'DYN10中位数高度差',
      dyn20MeHLevel:'DYN20中位数高度差',
      schAvgHLevel:'SCH平均数高度差',
      fplAvgHLevel:'FPL平均数高度差',
      depAvgHLevel:'DEP平均数高度差',
      dyn10AvgHLevel:'DYN10平均数高度差',
      dyn20AvgHLevel:'DYN20平均数高度差',
    },
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
    colName: ['ID', '航班号', '机型', '实际飞行时间(秒)', 'SHC飞行时间(秒)', 'FPL飞行时间(秒)', 'DEP飞行时间(秒)', 'DYN10飞行时间(秒)', 'DYN20飞行时间(秒)'],
    colTitle: {
      id:'ID',
      flightID:'航班号',
      aircraftType:'机型',
      rPastTime:'实际飞行时间(秒)',
      schPastTime:'SHC飞行时间(秒)',
      fplPastTime:'FPL飞行时间(秒)',
      depPastTime:'DEP飞行时间(秒)',
      dyn10PastTime:'DYN10飞行时间(秒)',
      dyn20PastTime:'DYN20飞行时间(秒)',
    },
    colModel: [
      {
        name: 'id',
        index: 'id',
        width:100,
        frozen: true
      }, {
        name: 'flightID',
        width:100,
        index: 'flightID',
        frozen: true
      }, {
        name: 'aircraftType',
        width:100,
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
    colTitle:{
      id:'ID',
      flightID:'航班号',
      aircraftType:'机型',
      rPastTime:'实际过点时间',
      schPastTime:'SHC过点时间',
      fplPastTime:'FPL过点时间',
      depPastTime:'DEP过点时间',
      dyn10PastTime:'DYN10过点时间',
      dyn20PastTime:'DYN20过点时间',
      rPasthlevel:'实际过点高度',
      schhlevel:'SHC过点高度',
      fplhlevel:'FPL过点高度',
      dephlevel:'DEP过点高度',
      dyn10hlevel:'DYN10过点高度',
      dyn20hlevel:'DYN20过点高度',
    },
    colModel: [
      {
        name: 'id',
        index: 'id',
        width:100,
        frozen: true
      }, {
        name: 'flightID',
        index: 'flightID',
        frozen: true,
        width:100
      }, {
        name: 'aircraftType',
        index: 'aircraftType',
        width:100
      }, {
        name: 'rPastTime',
        index: 'rPastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'schPastTime',
        index: 'schPastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'depPastTime',
        index: 'depPastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime',
        width:100,
        formatter: function (cellvalue, options, rowObject) {
          if ($.isValidVariable(cellvalue)) {
            return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
          } else {
            return '';
          }
        }
      }, {
        name: 'rPasthlevel',
        index: 'rPasthlevel',
        width:100
      }, {
        name: 'schhlevel',
        index: 'schhlevel',
        width:100
      }, {
        name: 'fplhlevel',
        index: 'fplhlevel',
        width:100
      }, {
        name: 'dephlevel',
        index: 'dephlevel',
        width:100
      }, {
        name: 'dyn10hlevel',
        index: 'dyn10hlevel',
        width:100
      }, {
        name: 'dyn20hlevel',
        index: 'dyn20hlevel',
        width:100
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
    var gridTableHeight = gridTableBDiv.outerHeight() - (gridTableGBox.outerHeight() - container.height()+20);
    var gridTableWidth = container.width();

    // 调用表格修改高度宽度方法
    $('#' + tableId).jqGrid('setGridHeight', gridTableHeight);
    $('#' + tableId).jqGrid('setGridWidth', (gridTableWidth - 2));
  }

  var timeFormater = function (cellvalue, options, rowObject) {
    if ($.isValidVariable(cellvalue)) {
      return cellvalue + '(秒)';
    } else {
      return '';
    }
  }
  /*数据样例*/
  var flyData = {};
  var terData = {};
  return {
    flyErrorTableDataConfig: flyErrorTableDataConfig,
    terminalPointDataConfigTop: terminalPointDataConfigTop,
    terminalPointDataConfigDown: terminalPointDataConfigDown,
    resizeToFitContainer: resizeToFitContainer,
    flyDetailDataConfig: flyDetailDataConfig,
    terminalDetailDataConfig: terminalDetailDataConfig,
    flyData: flyData,
    terData:terData
  }
};

$(document).ready(function () {
  tableDataConfig();
});