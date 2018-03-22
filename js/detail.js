/**
 * Created by caowei on 2018/3/7.
 */
var DetailFlightTable = function () {
  var tableObj = '';
  var flightid = flightId.split("&")[0].replace('?','');
  var flightName = '';
  //初始化表格
  var initGridTable = function (config) {
    var pagerId = 'table-pager';
    tableDataConfig.inittableParams(tableDataConfig.flightDetail);
    var table = new FlightGridTable({
      canvasId: 'flight-table',
      tableId: 'detail-table',
      pagerId: pagerId,
      colNames: config.colName,
      colModel: config.colModel,
      cmTemplate: config.cmTemplate,
      colDisplay: config.colDisplay,
      colTitle: config.colTitle,
      colStyle: {},
      colEdit: {},
      search: false,
      params: {
        shrinkToFit: config.isShrinkToFit,
        rowNum: 999999,
        sortname: config.defaultSort,
        // sortorder: 'asc',
        // sortname: 'SEQ',//排序列
        // 是否显示行号
        rownumbers: true,
        //是否显示快速过滤
        showQuickFilter: false,
        // scroll : true, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
        afterSearchCallBack: function () {

        },
      }
    });
    table.initGridTableObject();
    table.gridTableObject
      .navButtonAdd('#' + pagerId, {
        caption: "高级查询",
        title: "高级查询",
        buttonicon: "glyphicon-search",
        onClickButton: function () {
          table.showAdvanceFilter();
        },
        position: "first"
      })
      .navButtonAdd('#' + pagerId, {
        caption: "快速过滤",
        title: "快速过滤",
        buttonicon: "glyphicon-filter",
        onClickButton: function () {
          //清理协调窗口
          table.clearCollaborateContainer();
          table.showQuickFilter();
          table.quickFilterFlag = !table.quickFilterFlag;
          table.addMultiSelectToHeader();
          table.checkedMultiOperate();
        },
        position: "first"
      })
      .navButtonAdd('#' + pagerId, {
        caption: "导出",
        title: "导出Excel",
        buttonicon: "glyphicon-export",
        onClickButton: function () {
          table.export(flightName + '航班统计详情');
        },
        position: "first"
      });
    // 显示pager
    $('#'+ pagerId).show();
    //清除冻结列
    table.gridTableObject.jqGrid("destroyFrozenColumns");
    table.gridTableObject.jqGrid("setFrozenColumns");
    table.resizeToFitContainer();
    return table;
  }
  //表格数据转化
  var fireTableDataChange = function (data,table) {
    table.tableDataMap = {};
    table.tableData = {};
    table.data = data;
    var tableData = [];
    var tableMap = {};
    if($.isValidObject(data.flights)){
      var result = data.flights;
    }else{
      var result = data;
    }
    for (var index in result) {
      var d = result[index];
      //用于解决导出是0为数值型时导出值为空
      $.each(d,function (i,e) {
        if(e == 0&&typeof (e) == 'number'){
          d[i] = '0';
        }
      })
      //将id赋予表格的rowid
      if($.isValidVariable(d.flightInOId)){
        d['id'] = d.flightInOId;
        tableMap[result[index].flightInOId] = d;
      }else{
        d['id'] = d.id;
        tableMap[result[index].id] = d;
      }
      tableData.push(d);
    }
    table.tableDataMap = tableMap;
    table.tableData = tableData;
    table.drawGridTableData();
  }
  //未修正航班统计获取表格数据
  var getFlightGridData = function () {
    var url = ipHost + 'module-trajectoryCorrect-service/uncorrected/flight/'+flightid
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        var generateTime = data.generateTime
        $('.generate_time').text('数据生成时间: ' + $.formateTime(generateTime));
        $('.win_head').text(data.flights[0].flightId + '未修正航班详情');
        flightName = data.flights[0].flightId
        if($.isValidObject(tableObj)){
          tableObj.clearGridData()
          fireTableDataChange(singleConverToCn(data),tableObj)
        }else{
          tableDataConfig.inittableParams(tableDataConfig.flightDetail)
          tableObj = initGridTable(tableDataConfig.flightDetail)
          fireTableDataChange(singleConverToCn(data),tableObj)
        }
      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
      }
    });
  }
  //航段飞行时间获取表格数据
  var getFlyFlightGridData = function () {
    var data = legTimeData;
    //设置页面标题以及时间
    $('.generate_time').text('数据生成时间: ' + $.formateTime(dataTime));
    $('.win_head').text(flightId + "航段飞行时间详情");
    if($.isValidObject(tableObj)){
      tableObj.clearGridData()
      fireTableDataChange(data,tableObj)
    }else{
      tableDataConfig.inittableParams(tableDataConfig.flyDetailDataConfig)
      tableObj = initGridTable(tableDataConfig.flyDetailDataConfig)
      fireTableDataChange(data,tableObj)
    }
  }
  //终端区航路点获取表格数据
  var getTerFlightGridData = function () {
    var data = legTimeData;
    //设置页面标题以及时间
    $('.generate_time').text('数据生成时间: ' + $.formateTime(dataTime));
    $('.win_head').text(flightId + "终端区航路点过点高度航班详情");
    if($.isValidObject(tableObj)){
      tableObj.clearGridData()
      fireTableDataChange(data,tableObj)
    }else{
      tableDataConfig.inittableParams(tableDataConfig.terminalDetailDataConfig)
      tableObj = initGridTable(tableDataConfig.terminalDetailDataConfig)
      fireTableDataChange(data,tableObj)
    }
  }
  //航班航路点预测精度获取表格数据
  var getPreFlightGridData = function () {
    var url = ipHost + 'module-trajectoryCorrect-service/trajectory/accuracy/check/'+flightid
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        var generateTime = data.generateTime
        //设置页面标题以及时间
        $('.generate_time').text('数据生成时间: ' + $.formateTime(generateTime));
        $('.win_head').text(preFlightName + '航班航路点预测精度航班详情');
        if($.isValidObject(tableObj)){
          tableObj.clearGridData()
          fireTableDataChange(data.flightRouteResults,tableObj)
        }else{
          tableDataConfig.inittableParams(tableDataConfig.precisionDetailDataConfig)
          tableObj = initGridTable(tableDataConfig.precisionDetailDataConfig)
          tableObj .gridTableObject.jqGrid('setGroupHeaders',{
            useColSpanStyle : true ,//没有表头的列是否与表头所在行的空单元格合并
            groupHeaders : [
              {
                startColumnName : "timeIn0To15",//合并列的起始位置 colModel中的name
                numberOfColumns : 2, //合并列数 包含起始列
                titleText : "过点时间和保存时间的差值在15分钟内"//表头
              },{
                startColumnName : "timeIn15To30",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在15到30分钟"
              },{
                startColumnName : "timeIn30To60",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在30-60分钟"
              },{
                startColumnName : "timeIn60To120",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在60-120分钟"
              },{
                startColumnName : "timeIn120",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在120分钟以上"
              },{
                startColumnName : "timeDEP",
                numberOfColumns : 2,
                titleText : "过点时间和DEP状态的时间差值"
              },{
                startColumnName : "timeFPL",
                numberOfColumns : 2,
                titleText : "过点时间和FPL状态的时间差值"
              },{
                startColumnName : "timeSCH",
                numberOfColumns : 2,
                titleText : "过点时间和SCH状态的时间差值"
              }
            ]
          })
          var dataArr = accurancyFlightConvert(data.flightRouteResults)
          fireTableDataChange(dataArr,tableObj)
          tableObj.resizeToFitContainer();
          $('.containers .ui-jqgrid-bdiv').addClass('no-fit')
        }
      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
      }
    });
  }
  //时间误差过大统计详情
  var getOutFlightGridData = function () {
    var data = outTimeData;
    //设置页面标题以及时间
    $('.generate_time').text('数据生成时间: ' + $.formateTime(dataTime));
    $('.win_head').text(flightId + "航段飞行时间详情");
    if($.isValidObject(tableObj)){
      tableObj.clearGridData()
      fireTableDataChange(data,tableObj)
    }else{
      flightName = flightId + dataTime;
      tableDataConfig.inittableParams(tableDataConfig.countFlightDetail)
      tableObj = initGridTable(tableDataConfig.countFlightDetail)
      fireTableDataChange(data.errorFlightRoutes,tableObj)
    }
  }
  /**
   * 航班航路点预测精度数据转换
   * @param originData
   * @returns {Array}
   */
  var accurancyFlightConvert = function (originData) {
    var resultArr = [];
    $.map(originData,function (n,i) {
      var obj = {};
      obj['flightRoute'] = n.flightRoute;
      obj['routeseq'] = n.routeseq;
      obj['passTime'] = n.passTime;
      obj['hlevel'] = n.hlevel;
      obj['timeIn0To15'] = valueComapre(n.timeIn0To15,n.passTimeIn0To15);
      obj['timeIn0To15_sub'] = valueComapreSub(n.hlevelIn0To15,n.passHlevelIn0To15);
      obj['timeIn15To30'] = valueComapre(n.timeIn15To30,n.passTimeIn15To30);
      obj['timeIn15To30_sub'] = valueComapreSub(n.hlevelIn15To30,n.passHlevelIn15To30);
      obj['timeIn30To60'] = valueComapre(n.timeIn30To60,n.passTimeIn30To60);
      obj['timeIn30To60_sub'] = valueComapreSub(n.hlevelIn30To60,n.passHlevelIn30To60);
      obj['timeIn60To120'] = valueComapre(n.timeIn60To120,n.passTimeIn60To120);
      obj['timeIn60To120_sub'] = valueComapreSub(n.hlevelIn60To120,n.passHlevelIn60To120);
      obj['timeIn120'] = valueComapre(n.timeIn120,n.passTimeIn120);
      obj['timeIn120_sub'] = valueComapreSub(n.hlevelIn120,n.passHlevelIn120);
      obj['timeDEP'] = valueComapre(n.timeDEP,n.passTimeDEP);
      obj['timeDEP_sub'] = valueComapreSub(n.hlevelDEP,n.passHlevelDEP);
      obj['timeFPL'] = valueComapre(n.timeFPL,n.passTimeFPL);
      obj['timeFPL_sub'] = valueComapreSub(n.hlevelFPL,n.passHlevelFPL);
      obj['timeSCH'] = valueComapre(n.timeSCH,n.passTimeSCH);
      obj['timeSCH_sub'] = valueComapreSub(n.hlevelSCH,n.passHlevelSCH);
      resultArr.push(obj);
    })
    return resultArr;
  }
  /**
   * 航班航路点预测精度航班详情叶数据格式化
   * @param timeIn
   * @param passTimeIn
   * @returns {string}
   */
  var valueComapre = function (timeIn,passTimeIn) {
    if(passTimeIn == null){
      passTimeIn = '';
    }else {
      var title  = passTimeIn;
      passTimeIn = title.substring(6, 8) + '/' + title.substring(8, 10) + ":" + title.substring(10, 12)+":"+ title.substring(12, 14)
    }
    if(timeIn == null){
      timeIn = '';
      var parma = timeIn + passTimeIn
      return parma
    }else{
      var parma = timeIn + '('+passTimeIn+')';
      return parma
    }
  }
  /**
   * 航班航路点预测精度航班详情叶数据格式化
   * @param timeIn
   * @param passTimeIn
   * @returns {string}
   */
  var valueComapreSub = function (hlevelIn,passHlevelIn) {
    if(hlevelIn == null){
      hlevelIn = '';
      return '';
    }
    if(passHlevelIn == null){
      passHlevelIn = '';
    }
    return hlevelIn+'('+passHlevelIn+')';
  }
  //信号状态enToCn
  var singleConverToCn = function (data) {
    var CnData = data;
    $.each(CnData.flights,function (i,e) {
      if(e.radarState == 'NSI'){
        CnData.flights[i].radarState = '无信号'
      }else if(e.radarState == 'ISI'){
        CnData.flights[i].radarState = '信号中断'
      }else{
        CnData.flights[i].radarState = '有信号'
      }
    })
    return CnData
  }
  var initData = function () {
    if(fly){
      getFlyFlightGridData()
    }
    if(uncor){
      getFlightGridData()
    }
    if(ter){
      getTerFlightGridData()
    }
    if(pre){
      getPreFlightGridData()
    }
    if(out){
      getOutFlightGridData()
    }
  }
  return{
    init:function () {
      initData();
    }
  }
}()
$(document).ready(function () {
    DetailFlightTable.init();
})