var tableDataConfig = function () {
  var flyErrorTableDataConfig = {
    colName: ['起飞机场','航路点', '平均飞行时间(秒)', '中位飞行时间(秒)', 'SCH中位差(秒)', 'FPL中位差(秒)', 'DEP中位差(秒)', 'DYN10中位差(秒)', 'DYN20中位差(秒)', 'SCH平均差(秒)', 'FPL平均差(秒)', 'DEP平均差(秒)', 'DYN10平均差(秒)', 'DYN20平均差(秒)'],
    colTitle: {
      flyDepPointType:'起飞机场',
      point:'航路点',
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
        width:80,
        frozen:true
      },{
        name: 'point',
        index: 'point',
        width:80,
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
    colName: ['起飞机场', '终端区航路点', 'SCH中位差(秒)', 'FPL中位差(秒)', 'DEP中位差(秒)', 'DYN10中位差(秒)', 'DYN20中位差(秒)', 'SCH平均差(秒)', 'FPL平均差(秒)', 'DEP平均差(秒)', 'DYN10平均(秒)', 'DYN20平均差(秒)'],
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
      index: 'terPoint',
    }, {
      name: 'schMeDis',
      index: 'schMeDis',
    }, {
      name: 'fplMeDis',
      index: 'fplMeDis',

    }, {
      name: 'depMeDis',
      index: 'depMeDis',
      width:120,
    }, {
      name: 'dyn10mMeDis',
      index: 'dyn10mMeDis',
      width:120,
    }, {
      name: 'dyn20mMeDis',
      index: 'dyn20mMeDis',
      width:120,
    }, {
      name: 'schAvgDis',
      index: 'schAvgDis',
      width:120,
    }, {
      name: 'fplAvgDis',
      index: 'fplAvgDis',
      width:120,
    }, {
      name: 'depAvgDis',
      index: 'depAvgDis',
      width:120,
    }, {
      name: 'dyn10mAvgDis',
      index: 'dyn10mAvgDis',
      width:120,
    }, {
      name: 'dyn20mAvgDis',
      index: 'dyn20mAvgDis',
      width:120,
    }],
    data: []
  }
  var terminalPointDataConfigDown = {
    colName: ['起飞机场', '终端区航路点', 'SCH中位差', 'FPL中位差', 'DEP中位差', 'DYN10中位差', 'DYN20中位差', 'SCH平均差', 'FPL平均差', 'DEP平均差', 'DYN10平均差', 'DYN20平均差'],
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
      index: 'depMeHLevel',
      width:120,
    }, {
      name: 'dyn10MeHLevel',
      index: 'dyn10MeHLevel',
      width:120,
    }, {
      name: 'dyn20MeHLevel',
      index: 'dyn20MeHLevel',
      width:120,
    }, {
      name: 'schAvgHLevel',
      index: 'schAvgHLevel',
      width:120,
    }, {
      name: 'fplAvgHLevel',
      index: 'fplAvgHLevel',
      width:120,
    }, {
      name: 'depAvgHLevel',
      index: 'depAvgHLevel',
      width:120,
    }, {
      name: 'dyn10AvgHLevel',
      index: 'dyn10AvgHLevel',
      width:120,
    }, {
      name: 'dyn20AvgHLevel',
      index: 'dyn20AvgHLevel',
      width:120,
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
        frozen: true,
        width:130,
      }, {
        name: 'flightID',
        index: 'flightID',
        frozen: true,
        width:130,
      }, {
        name: 'aircraftType',
        index: 'aircraftType',
        width:130,
      }, {
        name: 'rPastTime',
        index: 'rPastTime',
        width:130,
      }, {
        name: 'schPastTime',
        index: 'schPastTime',
        width:130,
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime',
        width:130,
      }, {
        name: 'depPastTime',
        index: 'depPastTime',
        width:130,
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime',
        width:130,
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime',
        width:130,
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
        frozen: true,
        width:80,
      }, {
        name: 'flightID',
        index: 'flightID',
        frozen: true,
        width:80,
      }, {
        name: 'aircraftType',
        index: 'aircraftType',
        width:80,
      }, {
        name: 'rPastTime',
        index: 'rPastTime',
        width:100,
        formatter: timeFormatter
      }, {
        name: 'schPastTime',
        index: 'schPastTime',
        width:80,
        formatter: timeFormatter
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime',
        width:100,
        formatter: timeFormatter
      }, {
        name: 'depPastTime',
        index: 'depPastTime',
        width:100,
        formatter: timeFormatter
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime',
        width:100,
        formatter: timeFormatter
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime',
        width:100,
        formatter: timeFormatter
      }, {
        name: 'rPasthlevel',
        index: 'rPasthlevel',
        width:100,
      }, {
        name: 'schhlevel',
        index: 'schhlevel',
        width:80,
      }, {
        name: 'fplhlevel',
        index: 'fplhlevel',
        width:80,
      }, {
        name: 'dephlevel',
        index: 'dephlevel',
        width:80,
      }, {
        name: 'dyn10hlevel',
        index: 'dyn10hlevel',
        width:100,
      }, {
        name: 'dyn20hlevel',
        index: 'dyn20hlevel',
        width:100,
      }
    ],
    data: []
  }

  var precisionTableDataConfig = {
    colName: [' ID ', '航班号','执行时间', '计划起飞机场', '计划降落机场', '计划起飞时间', '计划降落时间', '实际起飞机场', '实际降落机场', '实际起飞时间', '实际降落时间'],
    colTitle: {
      flightInOId:'航班在oracle数据库中的id',
      flightId:'航班号',
      executeDate:'航班执行日期',
      sArrap:'时刻表降落机场',
      sDepap:'时刻表起飞机场',
      sDeptime:'时刻表起飞时间',
      sArrtime:'时刻表降落时间',
      rArrap:'实际降落机场',
      rDepap:'实际起飞机场',
      rArrtime:'实际降落时间',
      rDeptime:'实际飞行时间'
    },
    colModel: [
      {
        name: 'flightInOId',
        index: 'flightInOId',
        frozen:true
      }, {
        name: 'flightId',
        index: 'flightId',
        frozen:true
      }, {
        name: 'executeDate',
        index: 'executeDate',
        width:130,
        formatter: timeFormatter
      }, {
        name: 'sDepap',
        index: 'sDepap',
        width:130,
      }, {
        name: 'sArrap',
        index: 'sArrap',
        width:130,
      }, {
        name: 'sDeptime',
        index: 'sDeptime',
        width:130,
        formatter: timeFormatter
      }, {
        name: 'sArrtime',
        index: 'sArrtime',
        width:130,
        formatter: timeFormatter
      }, {
        name: 'rDepap',
        index: 'rDepap',
        width:130
      }, {
        name: 'rArrap',
        index: 'rArrap',
        width:130,
      }, {
        name: 'rDeptime',
        index: 'rDeptime',
        width:130,
        formatter: timeFormatter
      },{
        name: 'rArrtime',
        index: 'rArrtime',
        width:130,
        formatter: timeFormatter
      }  ],
    data: []
  }
  var precisionDetailDataConfig = {
    colName: ['航路点', '实际过点时间', '0-15(分钟)', '15-30(分钟)', '30-60(分钟)', '60-120(分钟)', '120(分钟)以上', 'DEP', 'FPL', 'SCH',],
    colTitle: {
      flightRoute:'航路点名称',
      passTime:'实际过点时间',
      timeIn0To15:'过点时间和保存时间的差值在15分钟内',
      timeIn15To30:'过点时间和保存时间的差值在15到30分钟',
      timeIn30To60:'过点时间和保存时间的差值在30到60分钟',
      timeIn60To120:'过点时间和保存时间的差值在60到120分钟',
      timeIn120:'过点时间和保存时间的差值在超过120分钟',
      timeDEP:'过点时间和DEP状态的时间差值',
      timeFPL:'过点时间和FPL状态的时间差值',
      timeSCH:'过点时间和SCH状态的时间差值'
    },
    colModel: [
      {
        name: 'flightRoute',
        index: 'flightRoute',
        frozen:true
      }, {
        name: 'passTime',
        index: 'passTime',
        formatter: timeFormatter
      }, {
        name: 'timeIn0To15',
        index: 'timeIn0To15'
      }, {
        name: 'timeIn15To30',
        index: 'timeIn15To30'
      }, {
        name: 'timeIn30To60',
        index: 'timeIn30To60'
      }, {
        name: 'timeIn60To120',
        index: 'timeIn60To120'
      }, {
        name: 'timeIn120',
        index: 'timeIn120'
      }, {
        name: 'timeDEP',
        index: 'timeDEP'
      }, {
        name: 'timeFPL',
        index: 'timeFPL'
      }, {
        name: 'timeSCH',
        index: 'timeSCH'
      }],
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
  //列排序规则
  function sortName(a, b, direction) {
    // 若为升序排序，空值转换为最大的值进行比较
    // 保证排序过程中，空值始终在最下方
    if (a*1 != NaN && b*1 != NaN && a != ''&& b != '' ) {
      // 数字类型
      var maxNum = Number.MAX_VALUE;
      if (!$.isValidVariable(a) || a < 0) {
        if (direction > 0) {
          a = maxNum;
        }
      }
      if (!$.isValidVariable(b) || b < 0) {
        if (direction > 0) {
          b = maxNum;
        }
      }
      return (a > b ? 1 : -1) * direction;
    } else {
      // 字符串类型
      var maxStr = 'ZZZZZZZZZZZZ';
      if (!$.isValidVariable(a)) {
        if (direction > 0) {
          a = maxStr;
        } else {
          a = '';
        }
      }
      if (!$.isValidVariable(b)) {
        if (direction > 0) {
          b = maxStr;
        } else {
          b = '';
        }
      }
      return a.localeCompare(b) * direction;
    }
  }
  //时间格式化规则
  function timeFormatter(cellvalue, options, rowObject) {
    if ($.isValidVariable(cellvalue)) {
      return '<span title="'+cellvalue+'">'+cellvalue.substring(8, 12)+'</span>';
    } else {
      return '';
    }
  }
  /*数据样例*/
  var flyData = {};
  var terData = {};
  var preData = {};
  return {
    flyErrorTableDataConfig: flyErrorTableDataConfig,
    terminalPointDataConfigTop: terminalPointDataConfigTop,
    terminalPointDataConfigDown: terminalPointDataConfigDown,
    precisionTableDataConfig:precisionTableDataConfig,
    resizeToFitContainer: resizeToFitContainer,
    flyDetailDataConfig: flyDetailDataConfig,
    terminalDetailDataConfig: terminalDetailDataConfig,
    precisionDetailDataConfig:precisionDetailDataConfig,
    flyData: flyData,
    terData:terData,
    preData:preData,
    sortName:sortName
  }
};

$(document).ready(function () {
  tableDataConfig();
});