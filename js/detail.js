/**
 * Created by caowei on 2018/3/7.
 */
var DetailFlightTable = function () {
  var ipHost = 'http://192.168.208.21:8080/';
  var tableObj = '';
  var flightid = flightId.split("&")[0].replace('?','');
  var flightName = '';
  //初始化表格
  var initGridTable = function () {
    var pagerId = 'table-pager';
    tableDataConfig.inittableParams(tableDataConfig.flightDetail);
    var table = new FlightGridTable({
      canvasId: 'flight-table',
      tableId: 'detail-table',
      pagerId: pagerId,
      colNames: tableDataConfig.flightDetail.colName,
      colModel: tableDataConfig.flightDetail.colModel,
      cmTemplate: tableDataConfig.flightDetail.cmTemplate,
      colDisplay: tableDataConfig.flightDetail.colDisplay,
      colTitle: tableDataConfig.flightDetail.colTitle,
      colStyle: {},
      colEdit: {},
      search: false,
      params: {
        shrinkToFit: true,
        rowNum: 999999,
        sortname: 'EOBT',
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
          table.export(flightName + '未修正航班统计详情');
        },
        position: "first"
      });
    // 显示pager
    $('#'+ pagerId).show();
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
    var result = data.flights;
    for (var index in result) {
      var d = result[index];
      //将id赋予表格的rowid
      d['id'] = d.flightInOId;
      tableData.push(d);
      tableMap[result[index].flightInOId] = d;
    }
    table.tableDataMap = tableMap;
    table.tableData = tableData;
    table.drawGridTableData();
  }
  //获取表格数据
  var getFlightGridData = function () {
    var url = ipHost + 'module-trajectoryCorrect-service/uncorrected/flight/'+flightid
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        var generateTime = data.generateTime
        $('.generate_time').text('数据生成时间: ' + $.formateTime(generateTime));
        flightName = data.flights[0].flightId
        if($.isValidObject(tableObj)){
          tableObj.clearGridData()
          fireTableDataChange(data,tableObj)
        }else{
          tableObj = initGridTable()
          fireTableDataChange(data,tableObj)
        }
      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
      }
    });
  }
  return{
    init:function () {
      getFlightGridData()
    }
  }
}()
$(document).ready(function () {
    DetailFlightTable.init();
})
