var tableDataConfig = function () {
  //航段飞行时间表格配置
  var flyErrorTableDataConfig = {
    colName: {
      flyDepPointType:{
        en: 'flyDepPointType',
        cn: '起飞机场',
      },
      point:{
        en:'point',
        cn:'航路点'
      },
      flightcount:{
        en:'flightcount',
        cn:'样本数'
      },
      rdepAvgTime:{
        en:'rdepAvgTime',
        cn:'平均飞行时间(秒)'
      },
      rdepMeTime:{
        en:'rdepMeTime',
        cn:'中位飞行时间(秒)'
      },
      schMeDis:{
        en:'schMeDis',
        cn:'SCH中位差(秒)'
      },
      fplMeDis:{
        en:'fplMeDis',
        cn:'FPL中位差(秒)',
      },
      depMeDis:{
        en:'depMeDis',
        cn:'DEP中位差(秒)',
      },
      dyn10mMeDis:{
        en:'dyn10mMeDis',
        cn:'DYN10中位差(秒)',
      },
      dyn20mMeDis:{
        en:'dyn20mMeDis',
        cn:'DYN20中位差(秒)',
      },
      schAvgDis:{
        en:'schAvgDis',
        cn:'SCH平均差(秒)',
      },
      fplAvgDis:{
        en:'fplAvgDis',
        cn:'FPL平均差(秒)',
      },
      depAvgDis:{
        en:'depAvgDis',
        cn:'DEP平均差(秒)',
      },
      dyn10mAvgDis:{
        en:'dyn10mAvgDis',
        cn:'DYN10平均差(秒)',
      },
      dyn20mAvgDis:{
        en:'dyn20mAvgDis',
        cn:'DYN20平均差(秒)'
      }
    },
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
  }
  //航段飞行时间详情表格配置
  var flyDetailDataConfig = {
    colName: {
      id:{
        en:"ID",
        cn:'ID',
      },
      flightID:{
        en:"航班号",
        cn:'航班号',
      },
      aircraftType:{
        en:"机型",
        cn:'机型',
      },
      rPastTime:{
        en:"实际飞行时间(秒)",
        cn:'实际飞行时间(秒)',
      },
      schPastTime:{
        en:"SHC飞行时间(秒)",
        cn:'SHC飞行时间(秒)',
      },
      fplPastTime:{
        en:"FPL飞行时间(秒)",
        cn:'FPL飞行时间(秒)',
      },
      depPastTime:{
        en:"DEP飞行时间(秒)",
        cn:'DEP飞行时间(秒)',
      },
      dyn10PastTime:{
        en:"DYN10飞行时间(秒)",
        cn:'DYN10飞行时间(秒)',
      },
      dyn20PastTime:{
        en:"DYN20飞行时间(秒)",
        cn:'DYN20飞行时间(秒)',
      }
    },
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
    defaultSort:'aircraftType'
  }

  //终端区航路点表格配置
  var terminalPointDataConfigTop = {
    colName: {
      depAirport:{
        en:'depAirport',
        cn:'起飞机场'
      },
      terPoint:{
        en:'terPoint',
        cn:'终端区航路点'
      },
      flightcount:{
        en:'flightcount',
        cn:'样本数'
      },
      schMeDis:{
        en:'schMeDis',
        cn:'SCH中位差(秒)',
      },
      fplMeDis:{
        en:'fplMeDis',
        cn:'FPL中位差(秒)',
      },
      depMeDis:{
        en:'depMeDis',
        cn:'DEP中位差(秒)',
      },
      dyn10mMeDis:{
        en:'dyn10mMeDis',
        cn:'DYN10中位差(秒)',
      },
      dyn20mMeDis:{
        en:'dyn20mMeDis',
        cn:'DYN20中位差(秒)',
      },
      schAvgDis:{
        en:'schAvgDis',
        cn:'SCH平均差(秒)',
      },
      fplAvgDis:{
        en:'fplAvgDis',
        cn:'FPL平均差(秒)',
      },
      depAvgDis:{
        en:'depAvgDis',
        cn:'DEP平均差(秒)',
      },
      dyn10mAvgDis:{
        en:'dyn10mAvgDis',
        cn:'DYN10平均差(秒)',
      },
      dyn20mAvgDis:{
        en:'dyn20mAvgDis',
        cn:'DYN20平均差(秒)'
      }
    },
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
  }
  var terminalPointDataConfigDown = {
    colName:{
      depAirport:{
        en:'起飞机场',
        cn:'起飞机场'
      },
      terPoint:{
        en:'终端区航路点',
        cn:'终端区航路点'
      },
      flightcount:{
        en:'样本数',
        cn:'样本数'
      },
      schMeDis:{
        en:'schMeDis',
        cn:'SCH中位差',
      },
      fplMeDis:{
        en:'fplMeDis',
        cn:'FPL中位差',
      },
      depMeDis:{
        en:'depMeDis',
        cn:'DEP中位差',
      },
      dyn10mMeDis:{
        en:'dyn10mMeDis',
        cn:'DYN10中位差',
      },
      dyn20mMeDis:{
        en:'dyn20mMeDis',
        cn:'DYN20中位差',
      },
      schAvgDis:{
        en:'schAvgDis',
        cn:'SCH平均差',
      },
      fplAvgDis:{
        en:'fplAvgDis',
        cn:'FPL平均差',
      },
      depAvgDis:{
        en:'depAvgDis',
        cn:'DEP平均差',
      },
      dyn10mAvgDis:{
        en:'dyn10mAvgDis',
        cn:'DYN10平均差',
      },
      dyn20mAvgDis:{
        en:'dyn20mAvgDis',
        cn:'DYN20平均差'
      }
    } ,
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
  }
  // 终端区航路点详情表格配置
  var terminalDetailDataConfig = {
    colName: {
      id:{
        cn:'ID',
        en:'id',
      },
      flightID:{
        cn:'航班号',
        en:'航班号',
      },
      aircraftType:{
        cn:'机型',
        en:'机型',
      },
      rPastTime:{
        cn:'实际过点时间',
        en:'实际过点时间',
        formatter:unTimeFormater
      },
      schPastTime:{
        cn:'SHC过点时间',
        en:'SHC过点时间',
        formatter:unTimeFormater
      },
      fplPastTime:{
        cn:'FPL过点时间',
        en:'FPL过点时间',
        formatter:unTimeFormater
      },
      depPastTime:{
        cn:'DEP过点时间',
        en:'DEP过点时间',
        formatter:unTimeFormater
      },
      dyn10PastTime:{
        cn:'DYN10过点时间',
        en:'DYN10过点时间',
        formatter:unTimeFormater
      },
      dyn20PastTime:{
        cn:'DYN20过点时间',
        en:'DYN20过点时间',
        formatter:unTimeFormater

      },
      rPasthlevel:{
        cn:'实际过点高度',
        en:'实际过点高度',
      },
      schhlevel:{
        cn:'SHC过点高度',
        en:'SHC过点高度',
      },
      fplhlevel:{
        cn:'FPL过点高度',
        en:'FPL过点高度',
      },
      dephlevel:{
        cn:'DEP过点高度',
        en:'DEP过点高度',
      },
      dyn10hlevel:{
        cn:'DYN10过点高度',
        en:'DYN10过点高度',
      },
      dyn20hlevel:{
        cn:'DYN20过点高度',
        en:'DYN20过点高度',
      }
    },
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
    defaultSort:'aircraftType'
  }

  // 航班航路点表格配置
  var precisionTableDataConfig = {
    colName:{
      flightInOId:{
        en:'flightInOId',
        cn:'ID',
      },
      flightId:{
        en:'flightId',
        cn:'航班号',
      },
      executeDate:{
        en:'executeDate',
        cn:'执行日期',
      },
      sArrap:{
        en:'sArrap',
        cn:'计划降落机场',
      },
      sDepap:{
        en:'sDepap',
        cn:'计划起飞机场',
      },
      sDeptime:{
        en:'sDeptime',
        cn:'计划起飞时间',
        formatter:unTimeFormater
      },
      sArrtime:{
        en:'sArrtime',
        cn:'计划降落时间',
        formatter:unTimeFormater
      },
      rArrap:{
        en:'rArrap',
        cn:'实际降落机场',
      },
      rDepap:{
        en:'rDepap',
        cn:'实际起飞机场',
      },
      rArrtime:{
        en:'rArrtime',
        cn:'实际降落时间',
        formatter:unTimeFormater
      },
      rDeptime:{
        en:'rDeptime',
        cn:'实际飞行时间',
        formatter:unTimeFormater
      }
    } ,
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
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      // width: 85,
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
    isShrinkToFit:true,
  }
  //航班航路点详情表格配置
  var precisionDetailDataConfig = {
    colName: {
      flightRoute:{
        en:'flightRoute',
        cn:'航路点名称',
        frozen:true
      },
      routeseq:{
        en:'routeseq',
        cn:'航路顺序',
      },
      passTime:{
        en:'passTime',
        cn:'实际过点时间',
        formatter:timeFormater
      },
      hlevel:{
        en:'hlevel',
        cn:'飞行高度',
      },
      timeIn0To15:{
        en:'timeIn0To15',
        cn:'时间差(预测值)',
        width:150,
      },
      timeIn0To15_sub:{
        en:'timeIn0To15_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeIn15To30:{
        en:'timeIn15To30',
        cn:'时间差(预测值)',
        width:150,
      },
      timeIn15To30_sub:{
        en:'timeIn15To30_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeIn30To60:{
        en:'timeIn30To60',
        cn:'时间差(预测值)',
        width:150,
      },
      timeIn30To60_sub:{
        en:'timeIn30To60_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeIn60To120:{
        en:'timeIn60To120',
        cn:'时间差(预测值)',
        width:150,
      },
      timeIn60To120_sub:{
        en:'timeIn60To120_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeIn120:{
        en:'timeIn120',
        cn:'时间差(预测值)',
        width:150,
      },
      timeIn120_sub:{
        en:'timeIn120_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeDEP:{
        en:'timeDEP',
        cn:'时间差(预测值)',
        width:150,
      },
      timeDEP_sub:{
        en:'timeDEP_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeFPL:{
        en:'timeFPL',
        cn:'时间差(预测值)',
        width:150,
      },
      timeFPL_sub:{
        en:'timeFPL_sub',
        cn:'高度差(预测值)',
        width:150,
      },
      timeSCH:{
        en:'timeSCH',
        cn:'时间差(预测值)',
        width:150,
      },
      timeSCH_sub:{
        en:'timeSCH_sub',
        cn:'高度差(预测值)',
        width:150,
      },
    },
    colTitle: {
      flightRoute:'航路点名称',
      routeseq:'航路顺序',
      passTime:'实际过点时间',
      hlevel:'飞行高度',
      timeIn0To15:'时间差(预测值)',
      timeIn0To15_sub:'高度差(预测值)',
      timeIn15To30:'时间差(预测值)',
      timeIn15To30_sub:'高度差(预测值)',
      timeIn30To60:'时间差(预测值)',
      timeIn30To60_sub:'高度差(预测值)',
      timeIn60To120:'时间差(预测值)',
      timeIn60To120_sub:'高度差(预测值)',
      timeIn120:'时间差(预测值)',
      timeIn120_sub:'高度差(预测值)',
      timeDEP:'时间差(预测值)',
      timeDEP_sub:'高度差(预测值)',
      timeFPL:'时间差(预测值)',
      timeFPL_sub:'高度差(预测值)',
      timeSCH:'时间差(预测值)',
      timeSCH_sub:'高度差(预测值)',
    },
    colModel: {},
    colDisplay: {},
    cmTemplate: {
      width: 95,
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
      sortfunc : sortNum
    },
    isShrinkToFit:false,
    defaultSort:'routeseq'
  }
  //未修正表格配置
  var unCorrectFlight = {
    colName: {
      flightInOId:{
        en: 'flightInOId',
        cn: '航班ID',
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
      },
      // rArrtime: {
      //   en: 'rArrtime',
      //   cn: '实际降落时间',
      //   formatter: unTimeFormater,
      // },
      rDeptime: {
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
      // rArrtime: '实际降落时间',
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
    isShrinkToFit:true,
    defaultSort:'rDeptime'
  };
  //未修正详情表格配置
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
      // rArrtime: {
      //   en: 'rArrtime',
      //   cn: '实际降落时间',
      //   formatter: unTimeFormater,
      // },
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
      // rArrtime: '实际降落时间',
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
    isShrinkToFit:true,
    defaultSort:'rDeptime'
  };

  //列排序规则(中文)
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
  //列排序(纯数字)
  function sortNum(a,b,direction) {
    a = a * 1;
    b = b * 1;
    return (a > b ? 1 : -1) * direction;
  }
  //初始化表格配置
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
      if($.isValidVariable(val.width)){
        obj.colModel[i]['width'] =  val.width;
      }
      // 设置冻结列frozen: true,
      if($.isValidVariable(val.frozen)){
        obj.colModel[i]['frozen'] = val.frozen;
      }
      // 设置特殊单元格class
      if(val.classes){
        obj.colModel[i]['classes'] = val.classes
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
      return cellvalue.substring(6, 8)+'/'+cellvalue.substring(8, 10)+':'+cellvalue.substring(10, 12)
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
  return {
    flyErrorTableDataConfig: flyErrorTableDataConfig,
    terminalPointDataConfigTop: terminalPointDataConfigTop,
    terminalPointDataConfigDown: terminalPointDataConfigDown,
    precisionTableDataConfig:precisionTableDataConfig,
    unCorrectFlight:unCorrectFlight,
    flightDetail:flightDetail,
    flyDetailDataConfig: flyDetailDataConfig,
    terminalDetailDataConfig: terminalDetailDataConfig,
    precisionDetailDataConfig:precisionDetailDataConfig,
    sortName:sortName,
    sortNum:sortNum,
    timeFormater:timeFormater,
    inittableParams:inittableParams
  }
}();

// $(document).ready(function () {
//   tableDataConfig();
// });