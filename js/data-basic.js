var tableDataConfig = function () {
  var flyErrorTableDataConfig = {
    colName: ['起飞机场','航路点', '样本数','平均飞行时间(秒)', '中位飞行时间(秒)', 'SCH中位差(秒)', 'FPL中位差(秒)', 'DEP中位差(秒)', 'DYN10中位差(秒)', 'DYN20中位差(秒)', 'SCH平均差(秒)', 'FPL平均差(秒)', 'DEP平均差(秒)', 'DYN10平均差(秒)', 'DYN20平均差(秒)'],
    colTitle: {
      flyDepPointType:'起飞机场',
      point:'航路点',
      flightcount:'样本数',
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
        // frozen:true
      },{
        name: 'point',
        index: 'point',
        width:80,
         // frozen:true
      },{
        name: 'flightcount',
        index: 'flightcount',
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
    colName: ['起飞机场', '终端区航路点','样本数', 'SCH中位差(秒)', 'FPL中位差(秒)', 'DEP中位差(秒)', 'DYN10中位差(秒)', 'DYN20中位差(秒)', 'SCH平均差(秒)', 'FPL平均差(秒)', 'DEP平均差(秒)', 'DYN10平均(秒)', 'DYN20平均差(秒)'],
    colTitle:{
      depAirport:'起飞机场',
      terPoint:'终端区航路点',
      flightcount:'样本数',
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
         // frozen: true
    }, {
      name: 'terPoint',
      index: 'terPoint',
    }, {
      name:'flightcount',
      index:'flightcount'
    },{
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
    colName: ['起飞机场', '终端区航路点','样本数', 'SCH中位差', 'FPL中位差', 'DEP中位差', 'DYN10中位差', 'DYN20中位差', 'SCH平均差', 'FPL平均差', 'DEP平均差', 'DYN10平均差', 'DYN20平均差'],
    colTitle:{
      depAirport:'起飞机场',
      terPoint:'终端区航路点',
      flightcount:'样本数',
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
      // frozen: true
    }, {
      name: 'terPoint',
      index: 'terPoint'
    }, {
      name:'flightcount',
      index:'flightcount'
    },{
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
        // frozen: true,
        width:130,
      }, {
        name: 'flightID',
        index: 'flightID',
        // frozen: true,
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
        // frozen: true,
        width:80,
      }, {
        name: 'flightID',
        index: 'flightID',
        // frozen: true,
        width:80,
      }, {
        name: 'aircraftType',
        index: 'aircraftType',
        width:80,
      }, {
        name: 'rPastTime',
        index: 'rPastTime',
        width:100,
        formatter: timeFormater
      }, {
        name: 'schPastTime',
        index: 'schPastTime',
        width:80,
        formatter: timeFormater
      }, {
        name: 'fplPastTime',
        index: 'fplPastTime',
        width:100,
        formatter: timeFormater
      }, {
        name: 'depPastTime',
        index: 'depPastTime',
        width:100,
        formatter: timeFormater
      }, {
        name: 'dyn10PastTime',
        index: 'dyn10PastTime',
        width:100,
        formatter: timeFormater
      }, {
        name: 'dyn20PastTime',
        index: 'dyn20PastTime',
        width:100,
        formatter: timeFormater
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
        // frozen:true
      }, {
        name: 'flightId',
        index: 'flightId',
        // frozen:true
      }, {
        name: 'executeDate',
        index: 'executeDate',
        width:130,
        // formatter: eighttimeFormater
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
        formatter: timeFormater
      }, {
        name: 'sArrtime',
        index: 'sArrtime',
        width:130,
        formatter: timeFormater
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
        formatter: timeFormater
      },{
        name: 'rArrtime',
        index: 'rArrtime',
        width:130,
        formatter: timeFormater
      }  ],
    data: []
  }
  var precisionDetailDataConfig = {
    colName: ['航路点', '航路顺序','实际过点时间','飞行高度', '时间差(预测值)','高度差(预测值)',  '时间差(预测值)','高度差(预测值)', '时间差(预测值)','高度差(预测值)', '时间差(预测值)','高度差(预测值)','时间差(预测值)','高度差(预测值)','时间差(预测值)','高度差(预测值)', '时间差(预测值)','高度差(预测值)', '时间差(预测值)','高度差(预测值)'],
    colTitle: {
      flightRoute:'航路点名称',
      routeseq:'航路顺序',
      passTime:'实际过点时间',
      hlevel:'飞行高度',
      // timeDEP:'过点时间和DEP状态的时间差值',
      // timeFPL:'过点时间和FPL状态的时间差值',
      // timeSCH:'过点时间和SCH状态的时间差值'
    },
    colModel: [
      {
        name: 'flightRoute',
        index: 'flightRoute',
        width:100,
        // frozen:true
      }, {
        name:'routeseq',
        index:'routeseq',
        width:100,
      }, {
        name: 'passTime',
        index: 'passTime',
        width:100,
        formatter: timeFormater
      },{
        name: 'hlevel',
        index: 'hlevel',
        width:100,
      }, {
        name: 'timeIn0To15',
        index: 'timeIn0To15',
      },{
        name: 'timeIn0To15_sub',
        index: 'timeIn0To15_sub',
      }, {
        name: 'timeIn15To30',
        index: 'timeIn15To30',
      },{
        name: 'timeIn15To30_sub',
        index: 'timeIn15To30_sub',
      }, {
        name: 'timeIn30To60',
        index: 'timeIn30To60',
      }, {
        name: 'timeIn30To60_sub',
        index: 'timeIn30To60_sub',
      }, {
        name: 'timeIn60To120',
        index: 'timeIn60To120',
      },{
        name: 'timeIn60To120_sub',
        index: 'timeIn60To120_sub',
      }, {
        name: 'timeIn120',
        index: 'timeIn120',
      },{
        name: 'timeIn120_sub',
        index: 'timeIn120_sub',
      }, {
        name: 'timeDEP',
        index: 'timeDEP',
      }, {
        name: 'timeDEP_sub',
        index: 'timeDEP_sub',
      }, {
        name: 'timeFPL',
        index: 'timeFPL',
      }, {
        name: 'timeFPL_sub',
        index: 'timeFPL_sub',
      }, {
        name: 'timeSCH',
        index: 'timeSCH',
      }, {
        name: 'timeSCH_sub',
        index: 'timeSCH_sub',
      }],
    data: []
  }
  var unCorrectFlight = {
    colName: {
      flightInOId:{
        en: 'flightInOId',
        cn: '航班id',
      },
      flightId: {
        en: 'flightId',
        cn: '航班号',
      }, saveTime: {
        en: 'saveTime',
        cn: '保存时间',
        formatter: unTimeFormater,
      }, radarState: {
        en: 'radarState',
        cn: '信号状态',
      }, executeDate: {
        en: 'executeDate',
        cn: '执行日期',
        // formatter: timeFormater,
      }, rArrtime: {
        en: 'rArrtime',
        cn: '实际降落时间',
        formatter: unTimeFormater,
      }, rDeptime: {
        en: 'rDeptime',
        cn: '实际起飞时间',
        formatter: unTimeFormater,
      }, pDepap: {
        en: 'pDepap',
        cn: '起飞机场',
      }, pArrap: {
        en: 'pArrap',
        cn: '降落机场',
      }
    },
    colModel: {},
    colDisplay: {},
    colTitle: {
      flightInOId:'航班id',
      flightId:'航班号',
      saveTime: '保存时间',
      radarState: '信号状态',
      executeDate: '执行日期',
      rArrtime: '实际降落时间',
      rDeptime: '实际起飞时间',
      pDepap: '起飞机场',
      pArrap:'降落机场',
    },
    cmTemplate: {
      width: 85,
      align: 'center',
      sortable: true,
      // search: true,
      searchoptions: {
        sopt: ['cn', 'nc', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en'],
      },
      cellattr: function (rowId, value, rowObject, colModel, arrData) {
        // 需要赋予表格的属性
        var attrs = '';
        // 无效数值不做处理
        if (!$.isValidVariable(value)) {
          return attrs;
        }

        var title = rowObject[colModel.name];
        if (!$.isValidVariable(title)) {
          title = '';
        }
        var len = title.length;
        //时间格式化 YYYYMMDD HH:MM
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //12位有效时间
        if (regexp.test(title) && len == 12) {
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12);
        } else if (regexp.test(title) && len == 14) { //14位有效时间
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12) + ':' + title.substring(12, 14);
        }
        attrs = ' title="' + title + '"';
        return attrs;
      },
      sortfunc : function(a, b, direction) {
        // 若为升序排序，空值转换为最大的值进行比较
        // 保证排序过程中，空值始终在最下方
        if ($.type(a) === "number" || $.type(b) === "number") {
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

    },
  };
  var flightDetail = {
    colName: {
      flightInOId:{
        en: 'flightInOId',
        cn: '航班id',
      },
      flightId: {
        en: 'flightId',
        cn: '航班号',
      },
      executeDate: {
        en: 'executeDate',
        cn: '执行时间',
      },
      sDepap: {
        en: 'sDepap',
        cn: '计划起飞机场',
      },
      sArrap: {
        en: 'sArrap',
        cn: '计划降落机场',
      },
      sDeptime: {
        en: 'sDeptime',
        cn: '计划起飞时间',
        formatter: unTimeFormater,
      },
      sArrtime: {
        en: 'sArrtime',
        cn: '计划降落时间',
        formatter: unTimeFormater,
      },
      rDepap: {
        en: 'rDepap',
        cn: '实际起飞机场',
      },
      rArrap: {
        en: 'rArrap',
        cn: '实际降落机场',
      },
      rDeptime: {
        en: 'rDeptime',
        cn: '实际起飞时间',
        formatter: unTimeFormater,
      },
      rArrtime: {
        en: 'rArrtime',
        cn: '实际降落时间',
        formatter: unTimeFormater,
      },
      radarState: {
        en: 'radarState',
        cn: '信号状态',
      }
    },
    colModel: {},
    colDisplay: {},
    colTitle: {
      flightInOId:'航班id',
      flightId:'航班号',
      executeDate: '执行时间',
      sDepap: '计划起飞机场',
      sArrap: '计划降落机场',
      sDeptime: '计划起飞时间',
      sArrtime: '计划降落时间',
      rDepap: '实际起飞机场',
      rArrap: '实际降落机场',
      rDeptime: '实际起飞时间',
      rArrtime: '实际降落时间',
      radarState: '信号状态',
    },
    cmTemplate: {
      width: 85,
      align: 'center',
      sortable: true,
      // search: true,
      searchoptions: {
        sopt: ['cn', 'nc', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en'],
      },
      cellattr: function (rowId, value, rowObject, colModel, arrData) {
        // 需要赋予表格的属性
        var attrs = '';
        // 无效数值不做处理
        if (!$.isValidVariable(value)) {
          return attrs;
        }

        var title = rowObject[colModel.name];
        if (!$.isValidVariable(title)) {
          title = '';
        }
        var len = title.length;
        //时间格式化 YYYYMMDD HH:MM
        var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
        //12位有效时间
        if (regexp.test(title) && len == 12) {
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12);
        } else if (regexp.test(title) && len == 14) { //14位有效时间
          title = title.substring(0, 8) + ' ' + title.substring(8, 10) + ":" + title.substring(10, 12) + ':' + title.substring(12, 14);
        }
        attrs = ' title="' + title + '"';
        return attrs;
      },
      sortfunc : function(a, b, direction) {
        // 若为升序排序，空值转换为最大的值进行比较
        // 保证排序过程中，空值始终在最下方
        if ($.type(a) === "number" || $.type(b) === "number") {
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

    },
  };
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
  //
  function sortNum(a,b,direction) {
    a = a * 1;
    b = b * 1;
    return (a > b ? 1 : -1) * direction;
  }
  //初始化未修正航班表格配置
  function inittableParams (obj) {
    obj.colModel = {};
    obj.colDisplay = {};
    // obj.colTitle = {};
    //取colName为参照
    var colNames = obj.colName;
    // 遍历生成对应的colModel、colDisplay、colTitle
    for (var i in colNames) {
      var val = colNames[i];
      obj.colModel[i] = {name: i};
      // 设置格式化
      if ($.isValidVariable(val.formatter)) {
        obj.colModel[i]['formatter'] = val.formatter;
      }
      obj.colDisplay[i] = {display: 1};
      //若colName的hidden为true,则设置display为0
      if (val.hidden) {
        obj.colDisplay[i].display = 0;
      }
    }

  }
  //时间格式化规则
  function timeFormater(cellvalue, options, rowObject) {
    if ($.isValidVariable(cellvalue)) {
      return '<span title="'+cellvalue+'">'+cellvalue.substring(6, 8)+'/'+cellvalue.substring(8, 10)+':'+cellvalue.substring(10, 12)+'</span>';
    } else {
      return '';
    }
  }

  //未修正航班单元格时间格式化
  function unTimeFormater(cellvalue, options, rowObject) {
    var val = cellvalue * 1;
    if ($.isValidVariable(cellvalue) && !isNaN(val)) {
      if (cellvalue.length == 12) {
        return cellvalue.substring(6, 8) + '/' + cellvalue.substring(8, 10)+ ':' + cellvalue.substring(10, 12);
      } else if (cellvalue.length == 14) {
        return cellvalue.substring(6, 8) + '/' + cellvalue.substring(8, 12);
      }
    } else {
      return '';
    }
  };
  /*数据样例*/
  var flyData = {};
  var terData = {};
  var preData = {};
  return {
    flyErrorTableDataConfig: flyErrorTableDataConfig,
    terminalPointDataConfigTop: terminalPointDataConfigTop,
    terminalPointDataConfigDown: terminalPointDataConfigDown,
    precisionTableDataConfig:precisionTableDataConfig,
    unCorrectFlight:unCorrectFlight,
    flightDetail:flightDetail,
    resizeToFitContainer: resizeToFitContainer,
    flyDetailDataConfig: flyDetailDataConfig,
    terminalDetailDataConfig: terminalDetailDataConfig,
    precisionDetailDataConfig:precisionDetailDataConfig,
    flyData: flyData,
    terData:terData,
    preData:preData,
    sortName:sortName,
    sortNum:sortNum,
    timeFormater:timeFormater,
    inittableParams:inittableParams
  }
}();

// $(document).ready(function () {
//   tableDataConfig();
// });