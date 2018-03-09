/**
 * Created by caowei on 2018/3/6.
 */
var UncorrectFlight = function () {
  var ipHost = 'http://192.168.208.21:8080/';
  var tableObj = '';
  var dataForm = {
    day:'',
    startTime:'',
    endTime:'',
    singleStatus:''
  }
  //初始化日期选择插件
  var initDataTime =function () {
    //日期选择初始化
    $("#un-datepicker").datetimepicker({
      language:"zh-CN",
      weekStart:1,
      todayBtn:false,
      autoclose:1,
      startView:2,
      minView:2,
      forceParse:0,
      format:"yyyy-mm-dd",// 选择时间
      pickerPosition:'bottom-left'
    })
    //开始时间初始化
    $('.un-start-date-input').datetimepicker({
      language:"zh-CN",
      weekStart:1,
      todayBtn:false,
      autoclose:1,
      startView:1,
      minView:0,
      maxView:1,
      forceParse:0,
      minuteStep:1,
      format:'hhii'
    })
    //结束时间初始化
    $('.un-end-date-input').datetimepicker({
      language:"zh-CN",
      weekStart:1,
      todayBtn:false,
      autoclose:1,
      startView:1,
      minView:0,
      maxView:1,
      forceParse:0,
      format:'hhii',
      minuteStep:1
    }).on('changeDate',function () {
        if(!$.isValidVariable($('.un-start-date-input').val())){
          var time = $('.un-end-date-input').val();
          time = time.replace(":",'')
          var startLimit = $.getFullTime(new Date()).substring(0, 8) + time
          $('.un-start-date-input').datetimepicker('setEndDate',$.parseFullTime(startLimit))
        }
      })



    //点击获取结束时间限制
    $('.un-end-date-input').on('click',function () {
      if(isToday()){
      //更新endtime
      $('.un-end-date-input').datetimepicker('setEndDate',new Date())
      //设置起始时间固定范围
        if($('.un-start-date-input').val() !=''){
          var startTime =$.getFullTime(new Date()).substring(0,8)+$('.un-start-date-input').val()
          $('.un-end-date-input').datetimepicker('setStartDate',$.parseFullTime(startTime))
        }
        //设置start-input 时间范围
        $('.un-start-date-input').datetimepicker('setEndDate',$.getFullTime(new Date()).substring(0,8)+$('.un-end-date-input').val())
      }
    })
    //点击获取开始时间限制
    $('.un-start-date-input').on('click',function () {
      if(isToday()){
      //更新endtime
        var startTime =$.getFullTime(new Date()).substring(0,8)+"0000"
        //设置起始时间固定范围
        $('.un-start-date-input').datetimepicker('setStartDate',$.parseFullTime(startTime))
        if((this.value != ''|| $('.un-end-date-input').val() == '')){
          $('.un-start-date-input').datetimepicker('setEndDate',new Date())
        }
      }
    })




    //点击获取日期时间限制
    $("#un-datepicker").on('click',function () {
      $("#un-datepicker").datetimepicker('setEndDate',new Date());
    })
    $("#un-datepicker").on('changeDate',function () {
      var selectVal = $(".day-value").val().replace(/-/g,'')+"0000"
      var todayVal = $.getFullTime(new Date())
        if (!isToday()) {
          $('.un-start-date-input').datetimepicker('setStartDate',$.parseFullTime(selectVal))
          $('.un-start-date-input').datetimepicker('setEndDate',$.parseFullTime($(".day-value").val().replace(/-/g,'')+'2359'))
          $('.un-end-date-input').datetimepicker('setStartDate',$.parseFullTime(selectVal))
          $('.un-end-date-input').datetimepicker('setEndDate',$.parseFullTime($(".day-value").val().replace(/-/g,'')+'2359'))
        }
    })
    setDefaultDates()
  }
  //判断时间是否为今天
  var isToday = function () {
    var selectVal = $(".day-value").val().replace(/-/g,'')+"0000"
    var todayVal = $.getFullTime(new Date())
    if ($.isValidVariable(selectVal) && $.isValidVariable(todayVal)) {
      // 求得起止时间相差天数
      var diff = $.calculateStringTimeDiff(selectVal, todayVal) / (1000 * 60 * 60 * 24);
      //   若天数差小于0, 则设置可选时间范围为全天状态为false
      if(diff<=-1){
        return false
      }else{
        return true
      }
    }
  }
  /**
   * 设置默认日期
   * */
  var setDefaultDates = function () {
    //当前日期
    var now = $.getFullTime(new Date()).substring(0, 8);
    //设置默认时间
    $("#un-datepicker").datetimepicker('setDate', $.parseFullTime(now + '0000'));
  };
  //数据查询
  var searchData = function () {
    $('.search-data-btn').on('click',function () {
      var dataForm = getFormData();
      var validate = validateForm(dataForm);
      if(!validate.valid){
        // 清空数据时间
        clearGeneratetime();
        //隐藏当前统计条件
        hideConditions();
        // 显示警告信息内容
        showAlear($('.alert-container'), validate);
        if($.isValidObject(tableObj)){
          tableObj.clearGridData()
        }
      }else{
        clearAlert()
      getTableData(dataForm);
      }
    })

  }
  //获取表单数据
  var getFormData = function () {
    dataForm.day = $('.day-value').val();
    dataForm.startTime = $('.un-start-date-input').val();
    dataForm.endTime = $('.un-end-date-input').val();
    dataForm.singleStatus = $('#single').val();
    return dataForm;
  }
  //获取表格数据
  var getTableData = function (dataForm) {
    var loading = Ladda.create($('.search-data-btn')[0]);
    loading.start();
    var url = ipHost + 'module-trajectoryCorrect-service/uncorrected/flights/'+dataForm.day.replace(/-/g,'')+'/'+dataForm.startTime+'/'+dataForm.endTime+'/'+dataForm.singleStatus+''
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        loading.stop();
        showConditions(dataForm);
        var generateTime = data.generateTime
        $('.uncorrect_flight  .generate-time').text('数据生成时间: ' + $.formateTime(generateTime));
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
        loading.stop();
        $('.form-wrap').removeClass('no-event');
      }
    });
  }
  //初始化表格
  var initGridTable = function () {
    var pagerId = 'un-flight-datas-pager';
    tableDataConfig.inittableParams(tableDataConfig.unCorrectFlight);
    var table = new FlightGridTable({
      canvasId: 'fly_table',
      tableId: 'un_flight_grid_table',
      pagerId: pagerId,
      colNames: tableDataConfig.unCorrectFlight.colName,
      colModel: tableDataConfig.unCorrectFlight.colModel,
      cmTemplate: tableDataConfig.unCorrectFlight.cmTemplate,
      colDisplay: tableDataConfig.unCorrectFlight.colDisplay,
      colTitle: tableDataConfig.unCorrectFlight.colTitle,
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
        onCellSelect:function (rowid,iCol,cellcontent,e) {
          var colName = table.gridTableObject.jqGrid('getGridParam')['colNames'][iCol];
          var flightId= table.tableDataMap[rowid].flightId;
          if(colName == '航班号'){
            openDetailManageDialog(rowid,flightId)
          }
        }
      }
    });
    table.initGridTableObject();
    var fileName = dataForm.day+'-'+dataForm.startTime+'-'+dataForm.endTime+"-"+dataForm.singleStatus+'未修正航班统计'
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
        table.export(fileName);
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
  /**
   * 清空警告
   *
   * */
  var clearAlert = function () {
    $('.alert-container').empty();
  };
  /**
   * @method validateForm 校验表单数据
   * @param obj 表单数据对象集合
   * @return valid 校验结果Boolean
   * @return mess 校验结果信息
   * */
  var validateForm = function (obj) {
    //日期时间校验
    var regexp = /[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))/;
    var DateValid = regexp.test(obj.day);
    if (!DateValid) {
      return {
        valid: false,
        mess: "请输入正确的起始时间,日期格式:YYYY-MM-DD"
      }
    }
    //起始时间格式校验
      var timeCom = /^([01]\d|2[0-3])[0-5]\d$/
      var startDateValid = obj.startTime;
      if (startDateValid == "" || !timeCom.test(startDateValid)) {
        return {
          valid: false,
          mess: "请输入正确的截止时间,日期格式:MMDD"
        }
      }
    var endDateValid = obj.endTime;
    if (endDateValid == "" || !timeCom.test(endDateValid)) {
      return {
        valid: false,
        mess: "请输入正确的截止时间,日期格式:MMDD"
      }
    }
    //信号状态选择校验
    var singleStatus = obj.singleStatus;
    if($.isEmptyObject(singleStatus)){
      return {
        valid: false,
        mess: "请选择一个或多个信号情况"
      }
    }
      // 起止时间范围校验
      var valid = validateDatesDifference(obj);
      if (!valid) {
        return {
          valid: false,
          mess: "输入时间不能超过当前时间或起始时间不能小于结束时间"
        }
      }
    return {
      valid: true
    };
  };
  /**
   * 校验起止日期范围是否有效
   * @returns {boolean}
   */
  var validateDatesDifference = function (obj) {
    // 起始时间值
    var start = obj.startTime;
    // 截止时间值
    var end = obj.endTime;
    // 若起止时间数值均有效
    if ($.isValidVariable(start) && $.isValidVariable(end)) {
      //获取当前时间
      var time = $('.day-value').val().replace(/-/g,'');
      start = time+ start
      end = time+ end
      var now = $.getFullTime(new Date()) ;
      // 求得起止时间和当前相差分钟
      var diff = $.calculateStringTimeDiff(now,start) / (1000 * 60 * 60);
      if (diff < 0) {
        return false;
      }
      var mins = $.calculateStringTimeDiff(now,end) / (1000 * 60 * 60);
      if (mins < 0) {
        return false;
      }
      // 求得起止时间相差分钟
      var cacul = $.calculateStringTimeDiff(start,end) / (1000 * 60 * 60);
      if (cacul > 0) {
        return false;
      }
    }
    return true;
  };
  //清空数据生成时间
  var clearGeneratetime = function () {
    $('.history-data-statistics .generate-time').empty();
  };
  /**
   * 隐藏当前统计条件
   * */
  var hideConditions = function () {
    $('.conditions-content').hide();
  };
  /**
   * @method showAlear 显示警告内容
   * @param validate 校验结果对象集合
   * */
  var showAlear = function (domobj, validate) {
    var mess = '';
    if ($.isValidObject(validate)) {
      mess = validate.mess;
    } else if ($.isValidVariable(validate)) {
      mess = validate;
    }
    // var $dom = $('.alert-container');

    var str = '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
      '<p id="alert-mess">' + mess + ' </p>' +
      '</div>';
    domobj.empty().append(str);
  };

  /**
   * 打开详情窗口
   * @param rowId
   * @param flightId
   */
  function openDetailManageDialog(rowId,flightId) {
    var winTitle = flightId + '未修正航班详情';
    var dialogId = 'grid_flight_talbe_data_' + new Date().getTime();
    var winUrl = 'detail.html?'+rowId;
    var winParams = {
      id: dialogId,
      width: $(window).width()-50,
      height: $(window).height()-100,
      center: true,
      move: true
    };
    DhxIframeDialog.create(winTitle, winUrl, winParams)
  }

  /**
   * 展示当前统计情况
   * @param dataform
   */
  var showConditions = function (dataform) {
    $('.conditions-start-data').text(dataform.day+' '+dataform.startTime);
    $('.conditions-end-data').text(dataform.day+' '+dataform.endTime);
    $('.conditions-subtype').text(dataform.singleStatus);
    $('.conditions-content').show();
  }

  return{
    init:function () {
      initDataTime()
      searchData()
    }
  }
}();
$(document).ready(function () {
  UncorrectFlight.init();
})
