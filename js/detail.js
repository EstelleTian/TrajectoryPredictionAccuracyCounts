/**
 * Created by caowei on 2018/3/7.
 */
var DetailFlightTable = function () {
  var tableObj = '';
  var flightid = flightId.split("&")[0].replace('?','');
  var flightName = '';
  //初始化表格
  var initGridTable = function (config,flightID,data) {
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
        // sortfunc:config.sortfunc,
        sortorder: config.order,
        // 是否显示行号
        rownumbers: true,
        //是否显示快速过滤
        showQuickFilter: false,
        // scroll : true, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
        afterSearchCallBack: function () {

        },
        onCellSelect: function (rowid, index, contents, event) {
          if(contents != "&nbsp;"){
            var colName = table.gridTableObject.jqGrid('getGridParam')['colNames'][index];
            var name = 'pass' + table.gridTableObject.jqGrid('getGridParam')['colModel'][index]['name']
            if(colName =='时间差(预测值)'){
              var flightRoute = data[rowid-1].flightRoute;
              var time = data[rowid-1][name];
              var flightId = flightID;
              var opt = {
                flightRoute:flightRoute,
                time:time,
                flightId:flightId
              }
              openAccDetailManageDialog(opt,'accDetail')
            }

          }
        }
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
    var url = ipHost + 'module-trajectoryCorrect-service/trajectory/accuracy/check/'+flightId
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
          tableObj = initGridTable(tableDataConfig.precisionDetailDataConfig,flightId,data.flightRouteResults)
          tableObj .gridTableObject.jqGrid('setGroupHeaders',{
            useColSpanStyle : true ,//没有表头的列是否与表头所在行的空单元格合并
            groupHeaders : [
              {
                startColumnName : "TimeIn0To15",//合并列的起始位置 colModel中的name
                numberOfColumns : 2, //合并列数 包含起始列
                titleText : "过点时间和保存时间的差值在15分钟内"//表头
              },{
                startColumnName : "TimeIn15To30",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在15到30分钟"
              },{
                startColumnName : "TimeIn30To60",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在30-60分钟"
              },{
                startColumnName : "TimeIn60To120",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在60-120分钟"
              },{
                startColumnName : "TimeIn120",
                numberOfColumns : 2,
                titleText : "过点时间和保存时间的差值在120分钟以上"
              },{
                startColumnName : "TimeDEP",
                numberOfColumns : 2,
                titleText : "过点时间和DEP状态的时间差值"
              },{
                startColumnName : "TimeFPL",
                numberOfColumns : 2,
                titleText : "过点时间和FPL状态的时间差值"
              },{
                startColumnName : "TimeSCH",
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
  //航班航路点预测精度详情页时间差表格
  var getPreFlightGridDataCacu = function () {
    var url = ipHost + 'module-trajectoryCorrect-service/trajectory/flight/'+flightId  +'/'+ time + '/'+ routue;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        var generateTime = data.generateTime
        //设置页面标题以及时间
        $('.generate_time').text('数据生成时间: ' + $.formateTime(generateTime));
        $('.win_head').text( '航班航路点预测精度航班详情');
        if($.isValidObject(tableObj)){
          tableObj.clearGridData()
          fireTableDataChange(data.flights,tableObj)
        }else{
          tableDataConfig.inittableParams(tableDataConfig.preFlightDetail)
          tableObj = initGridTable(tableDataConfig.preFlightDetail)
          fireTableDataChange(data.flights,tableObj)
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
    $('.win_head').text(flightId + "时间误差过大统计详情");
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
  //不连贯航班详情
  var getInconFlightGridData = function () {
    var data = inconFlightConvert(inconData.flightRoute);
    //设置页面标题以及时间
    $('.generate_time').text('数据生成时间: ' + $.formateTime(dataTime));
    $('.win_head').text(flightId + "不连贯航班详情");
    if($.isValidObject(tableObj)){
      tableObj.clearGridData()
      fireTableDataChange(data,tableObj)
    }else{
      flightName = flightId + dataTime;
      if(timeType){
        tableDataConfig.inittableParams(tableDataConfig.inconTimeDetailFlight)
        tableObj = initGridTable(tableDataConfig.inconTimeDetailFlight)
        fireTableDataChange(data,tableObj)
      }else{
        tableDataConfig.inittableParams(tableDataConfig.inconHeightDetailFlight)
        tableObj = initGridTable(tableDataConfig.inconHeightDetailFlight)
        var inconHData = positionConvert(data)
        fireTableDataChange(inconHData,tableObj)
      }
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
      obj['TimeIn0To15'] = valueComapre(n.timeIn0To15,n.passTimeIn0To15);
      obj['TimeIn0To15_sub'] = valueComapreSub(n.hlevelIn0To15,n.passHlevelIn0To15);
      obj['TimeIn15To30'] = valueComapre(n.timeIn15To30,n.passTimeIn15To30);
      obj['TimeIn15To30_sub'] = valueComapreSub(n.hlevelIn15To30,n.passHlevelIn15To30);
      obj['TimeIn30To60'] = valueComapre(n.timeIn30To60,n.passTimeIn30To60);
      obj['TimeIn30To60_sub'] = valueComapreSub(n.hlevelIn30To60,n.passHlevelIn30To60);
      obj['TimeIn60To120'] = valueComapre(n.timeIn60To120,n.passTimeIn60To120);
      obj['TimeIn60To120_sub'] = valueComapreSub(n.hlevelIn60To120,n.passHlevelIn60To120);
      obj['TimeIn120'] = valueComapre(n.timeIn120,n.passTimeIn120);
      obj['TimeIn120_sub'] = valueComapreSub(n.hlevelIn120,n.passHlevelIn120);
      obj['TimeDEP'] = valueComapre(n.timeDEP,n.passTimeDEP);
      obj['TimeDEP_sub'] = valueComapreSub(n.hlevelDEP,n.passHlevelDEP);
      obj['TimeFPL'] = valueComapre(n.timeFPL,n.passTimeFPL);
      obj['TimeFPL_sub'] = valueComapreSub(n.hlevelFPL,n.passHlevelFPL);
      obj['TimeSCH'] = valueComapre(n.timeSCH,n.passTimeSCH);
      obj['TimeSCH_sub'] = valueComapreSub(n.hlevelSCH,n.passHlevelSCH);
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
  /**
   * 不连贯航班统计详情数据转换
   * @param originData
     */
  var inconFlightConvert = function (originData) {
    //创建数据结果集
    var objArr = [];
    $.each(originData,function (i,e) {
      //创建数据对象
      var obj = {};
      obj['name'] = e.name;
      obj['pastTime'] = e.pastTime;
      if($.isValidVariable(e.bfPastTime)||$.isValidVariable(e.afPastTime)){
        obj['beforePoint'] = (e.bfName?(e.bfName+ ":"):'') + (e.bfPastTime?tableDataConfig.timeFormater(e.bfPastTime):'');
        obj['afterPoint'] = (e.afName ?(e.afName+ ":"):'') + (e.afPastTime?tableDataConfig.timeFormater(e.afPastTime):'') ;
      }
      obj['status'] = e.status ;
      obj['saveTime'] = e.saveTime ;
      if($.isValidVariable(e.hlevel)){
        obj['hlevel'] = e.hlevel ;
      }
      if($.isValidVariable(e.bfHlevel)||$.isValidVariable(e.afHlevel)){
        obj['beforePoint'] = (e.bfName?(e.bfName+ ":"):'')  + (e.bfHlevel?e.bfHlevel:'');
        obj['afterPoint'] = (e.afName?(e.afName+ ":"):'')  + (e.afHlevel?e.afHlevel:'');
      }
      if($.isValidVariable(e.location)){
        obj['location'] = e.location ;
      }
      objArr.push(obj)
    })
    return objArr;
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
  //不连贯航班详情按高度统计位置enToCn
  var positionConvert = function (data) {
    var CnData = data;
    $.each(CnData,function (i,e) {
      if(e.location == 'TOD'){
        CnData[i].location = '下降阶段'
      }else if(e.location == 'TOC'){
        CnData[i].location = '爬升阶段'
      }else{
        CnData[i].location = '巡航阶段'
      }
    })
    return CnData
  }

  /**
   * 打开详情窗口
   * @param title
   * @param contents
   * @param rowid
   */
  function openAccDetailManageDialog(opt,type) {
    var winTitle = opt.flightRoute + '航路点详情';
    var dialogId = 'grid_flight_talbe_data_' + new Date().getTime();
    var winUrl = 'detail.html?/'+type+'/'+opt.flightId+'/'+opt.time+'/'+opt.flightRoute+ '/';
    var winParams = {
      id: dialogId,
      width: 800,
      height: 600,
      center: true,
      move: true
    };
    var winObj = DhxIframeDialog.create(winTitle, winUrl, winParams)
  }

  var initData = function () {
    if(fly){
      getFlyFlightGridData()
      $('title').text('航段飞行时间误差航班详情')
    }
    if(uncor){
      getFlightGridData()
      $('title').text('未修正航班详情')
    }
    if(ter){
      getTerFlightGridData()
      $('title').text('终端区航路点过点时间航班详情')
    }
    if(pre){
      getPreFlightGridData()
      $('title').text('航班航路点航班详情')
    }
    if(out){
      getOutFlightGridData()
      $('title').text('时间误差过大航班详情')
    }
    if(incon){
      getInconFlightGridData()
      $('title').text('不连贯航班详情')
    }
    if(accDetail){
      getPreFlightGridDataCacu()
      $('title').text('航班航路点航班时间差详情')
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