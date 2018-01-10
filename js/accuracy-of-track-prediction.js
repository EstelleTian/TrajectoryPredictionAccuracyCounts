var PredictionData = function () {
  //Ip地址
  var ipHost = 'http://192.168.243.191:8080/module-trajectoryCorrect-service/trajectory/correct/';
  // 当前nav索引
  var stateIndex =0;
  var searchUrl = [ipHost,ipHost + 'point/'];
  /*
   * 表单查询对象
   * */
  var DataForm = {
    startDate: '',
    endDate: '',
    currentType: '',
    currentStatus: '',
    airportName: ''
  }
  /*
   * 数据对象
   * */
  var tableDataConfigs = tableDataConfig();
  /*
   * 表格对象
   * */
  var tableObject = {
    flyTableObj: 'flight_grid_table',
    terTableObjTop: 't_flight_grid_table',
    terTableObjDown: 'd_flight_grid_table'
  }
  // 初始化组件
  var initComponent = function () {
    //初始化日历插件datepicker
    initDatepicker();
    // 设置默认时间
    setDefaultDates();
    //绑定Window事件，窗口变化时重新调整表格大小
    initDocumentResize();

  };
  // 初始化事件绑定
  var initEvent = function () {
    // 导航点击事件
    initNavTabEvent();
    // 提交按钮
    initSubmitEvent();
  };

  /**
   * 导航事件
   * */

  var initNavTabEvent = function () {
    //导航栏

    var nav = $('#nav');
    $('.nav li', nav).on('click', function () {
      // 更新当前nav索引
       stateIndex = $(this).index();
    });
    //航段飞行时间误差统计导航点击事件
    $('.nav_monitor').on('click', function () {
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //切换模块
      $('.fly_time').show();
      $('.ter_time').hide();
      // clearData(tableObject);
      // hideConditions()
    });
    // 终端区航路点过点时间统计导航点击事件
    $('.nav-history-data-statistics').on('click', function () {
      //修改标题文字
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //模块切换
      $('.fly_time').hide();
      $('.ter_time').show();
      // clearData(tableObject)
      // hideConditions()
    });
    //起飞机场点击事件状态绑定
    initAirportState($('.dep'),$('.arr'))
    //降落机场点击事件状态绑定
    initAirportState($('.arr'),$('.dep'))
  }
  /*
  * 清空页面数据
  * */
  var clearData = function (table) {
    $('.start-date-input').val('');
    $('.flight-end-date').val('');
    $('.flight_name').val('')
    if(stateIndex == 0){
      $.jgrid.gridUnload(table.flyTableObj);
    }else if(stateIndex == 1){
      $.jgrid.gridUnload(table.terTableObjTop);
      $.jgrid.gridUnload(table.terTableObjDown);
    }
  }
  /*
  * 提示前清空数据
  * */
  var alertClearData = function (table) {
    if($.isValidObject(table)){
      if(stateIndex == 0){
        $.jgrid.gridUnload(table.flyTableObj);
      }else if(stateIndex == 1){
        $.jgrid.gridUnload(table.terTableObjTop);
        $.jgrid.gridUnload(table.terTableObjDown);
      }
    }
  }
  /*
  * 监控起飞降落机场状态
  * */
  var initAirportState = function (state1,state2) {
    state1.on('click', function () {
      if ($(this).hasClass('selected')) {
        state2.removeClass('selected')
      } else {
        $(this).addClass('selected')
        state2.removeClass('selected')
      }
    })
  }
  /**判断机场状态*/
  var airportStatus = function () {
    if(stateIndex == 0){
      if ($('.fly_time .dep').hasClass('selected')) {
        return '起飞机场'
      } else {
        return '降落机场'
      } s
    }else if(stateIndex == 1){
      if ($('.ter_time .dep').hasClass('selected')) {
        return '起飞机场'
      } else {
        return '降落机场'
      }
    }
  }
  /*
   * 获取表单数据
   * */
  var getFormData = function (formObj) {
    if (stateIndex == 0) {
      formObj.startDate = $(".fly_time .start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.endDate = $(".fly_time .flight-end-date").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.currentType = airportStatus().replace(/(^\s*)|(\s*$)/g, "");
      formObj.airportName = $(".fly_time .fly_airport_Name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
      if (formObj.currentType == '起飞机场') {
        formObj.currentStatus = 'D'
      } else {
        formObj.currentStatus = 'A'
      }
    }else{
      formObj.startDate = $(".ter_time .start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.endDate = $(".ter_time .flight-end-date").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.currentType = airportStatus().replace(/(^\s*)|(\s*$)/g, "");
      formObj.airportName = $(".ter_time .fly_airport_Name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
      if (formObj.currentType == '起飞机场') {
        formObj.currentStatus = 'D'
      } else {
        formObj.currentStatus = 'A'
      }
    }
    return formObj;
  }
  /**
   * 提交按钮事件
   * */
  var initSubmitEvent = function () {
      $('.fly-data-btn').on('click', function () {
        $(".no-datas-tip").hide();
        alertClearData(tableObject)
        //获取 表单数据
        getFormData(DataForm);
        // 处理表单提交
        handleSubmitForm(DataForm,'fly_time');
      });
      $('.ter-data-btn').on('click', function () {
        $(".no-datas-tip").hide();
        alertClearData(tableObject)
        //获取 表单数据
        getFormData(DataForm);
        // 处理表单提交
        handleSubmitForm(DataForm,'ter_time');

      });
  };

  /**
   * 校验起止日期范围是否有效，无效则弹出警告
   * */
  var validateDates = function () {
      // 清空警告
      clearAlert();
      // 清空提示
      clearTip();
      // 校验起止日期范围是否有效
      var bool = validateDatesDifference();
      // 若起止日期范围无效则弹出警告
      if(!bool){
        // 弹出警告
        showAlear({
            valid: false,
            mess: "起止时间跨度不能超过7天"
        })
      }
  };

    /**
     * 校验起止日期范围是否有效
     * */
    var validateDatesDifference = function () {

        // 起始时间值
        var start = $('.start-date-input').val();
        // 截止时间值
        var end = $('.flight-end-date').val();
        // 若起止时间数值均有效
        if ($.isValidVariable(start) && $.isValidVariable(end)) {
            // 求得起止时间相差天数
            var diff = Math.abs($.calculateStringTimeDiff(start + '0000', end + '0000') / (1000 * 60 * 60 * 24));
            //   若天数差大于7, 则警告
            if (diff > 7) {
                return false;
            }
        }
        return true;
    };

    /**
     *  设置起止时间输入框日历插件的可选范围及默认选中日期
     * */
    var setStartdDataRange = function () {
        // 起始时间值
        var start = $('.start-date-input').val();
        // 截止时间值
        var end = $('.flight-end-date').val();
        // 截止时间前1天
        var preDay = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -1);
        // 截止时间前7天的日期值
        var day7 = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -7);
        // 求得起止时间相差天数
        var diff = Math.abs($.calculateStringTimeDiff(start + '0000', end + '0000') / (1000 * 60 * 60 * 24));
        // 设置起止日期的可选开始日期
        $('.start-date-input').datepicker('setStartDate', $.parseFullTime(day7));
        // 设置起止日期的可选结束日期
        $('.start-date-input').datepicker('setEndDate', $.parseFullTime(end+'0000'));
        // 若截止日期小于起止日期,设置起止日期的默认选中日期为截止日期的前1天
        if(end*1 < start*1){
            // 设置起止日期的默认选中日期为截止日期的前1天
            $('.start-date-input').datepicker('setDate', $.parseFullTime(preDay));
        }else if (diff > 7) { // 若起止时间相差天数大于7天
            // 设置起止日期的默认选中日期为截止日期的前1天
            $('.start-date-input').datepicker('setDate', $.parseFullTime(preDay));
        }else {
            // 设置起止日期的默认选中日期为当前数值(用于解决输入框数值与日历默认选中日期数值不一致的问题)
            $('.start-date-input').datepicker('setDate', $.parseFullTime(start+'0000'));
        }
    };

  /*
   * @method dataConvert 数据转换方法
   * @param data ajax返回数据对象
   * @param gridParam 表格参数配置
   * @param option 表格参数具体配置字符串
   * */
  var dataConvert = function (data, gridParam, option) {
    if ($.isValidObject(data)) {
      if ($.isValidObject(data.map)) {
        $.each(data.map, function (i, e) {
          var obj = {}
          //航段飞行时间误差数据转换
          if (option == 'flyErrorTableDataConfig') {
            obj.flyDepPointType = i;
            $.each(gridParam[option].colModel, function (index, ele) {
              if (ele['index'] != 'flyDepPointType') {
                obj[ele['index']] = e[ele['index']];
              }
            })
          } else {
            //终端区航路点过点时间统计数据转换
            obj.depAirport = i;
            var str = i.split('-')
            obj.terPoint = str[1]
            $.each(gridParam[option].colModel, function (index, ele) {
              if (ele['index'] != 'depAirport' && ele['index'] != 'terPoint') {
                obj[ele['index']] = e[ele['index']];
              }
            })
          }
          gridParam[option].data.push(obj)
        })
      }
    }
  }
  /**
   * 初始化表格
   */
  var initGridTable = function (config, tableId,pagerId) {
    var table = $('#' + tableId).jqGrid({
      styleUI: 'Bootstrap',
      datatype: 'local',
      rownumbers: true,
      height: "auto",
      shrinkToFit: false,
      cmTemplate: {
        align: 'center',
        resize: false
      },
      pager:pagerId,
      pgbuttons: false,
      pginput: false,
      colNames: config.colName,
      colModel: config.colModel,
      rowNum: 999999, // 一页显示多少条
      // sortname: 'time', // 初始化的时候排序的字段
      // sortorder: 'asc', //排序方式,可选desc,asc
      viewrecords: true,
      onCellSelect: function (rowid, index, contents, event) {
        if (index == 1) {
          //模态框设置
          var option = {
            title: contents + '航班详情',
            content: '<div class="detail"><table id="' + rowid + 'table" class="detail_table"></table><div id="' + rowid + 'detail_pager"></div></div>',
            width: 1280,
            height: 960,
            isIcon: false,
            showCancelBtn: false,
            mtop: 180
          }
          //初始化模态框
          BootstrapDialogFactory.dialog(option);
          //初始化航段飞行时间误差统计详情表格
          if (!$('.ter_time').is(':visible')) {
            tableDataConfigs.flyDetailDataConfig.data = tableDataConfigs.data.infoMap[contents];
            initGridTableDetail(tableDataConfigs.flyDetailDataConfig, rowid + 'table',rowid +'detail_pager')
          } else {
            //初始化终端区航路点过点时间统计详情表格
            tableDataConfigs.terminalDetailDataConfig.data = tableDataConfigs.data.infoMap[contents];
            initGridTableDetail(tableDataConfigs.terminalDetailDataConfig, rowid + 'table',rowid +'detail_pager')
          }
        }
      }
    })
    //数据填充
    $('#' + tableId).jqGrid('setGridParam', {datatype: 'local', data: config.data}).trigger('reloadGrid')
    $('#' + tableId).jqGrid('navGrid', '#' + pagerId, {
      add: false,
      edit: false,
      view: false,
      del: false,
      search: false,
      refresh: false
    });

    $('#' + tableId).jqGrid('setFrozenColumns')
    //尺寸计算表格适配内容大小
    tableDataConfigs.resizeToFitContainer(tableId)
  };
/*
* 初始化详情表格
* */
  var initGridTableDetail = function (config, tableId,pagerId) {
    var table = $('#' + tableId).jqGrid({
      styleUI: 'Bootstrap',
      datatype: 'local',
      rownumbers: true,
      height: "auto",
      shrinkToFit: false,
      cmTemplate: {
        align: 'center',
        resize: false
      },
      pager:pagerId,
      pgbuttons: false,
      pginput: false,
      colNames: config.colName,
      colModel: config.colModel,
      rowNum: 999999, // 一页显示多少条
      sortname: 'aircraftType', // 初始化的时候排序的字段
      // sortorder: 'asc', //排序方式,可选desc,asc
      viewrecords: true,
    })
    $('#' + tableId).jqGrid('setGridParam', {datatype: 'local', data: config.data}).trigger('reloadGrid')
    $('#' + tableId).jqGrid('navGrid', '#' + pagerId, {
      add: false,
      edit: false,
      view: false,
      del: false,
      search: false,
      refresh: false
    });
    tableDataConfigs.resizeToFitContainer(tableId)
    $('#' + tableId).jqGrid('setFrozenColumns')
    $('.modal-content .frozen-bdiv').css('top','35px');
  };
  /**
   * 处理表单提交
   * */
  var handleSubmitForm = function (obj,state) {
      // 清空警告
      clearAlert();
      // 清空提示
      clearTip();
      //校验表单;
      var validate = validateForm(obj);
      if (!validate.valid) {
          // 清空数据时间
          clearGeneratetime();
          //隐藏当前统计条件
          hideConditions();
          // 显示警告信息内容
          showAlear(validate);
          return;
      } else {
          //显示当前统计条件
          showConditions(obj,state);
          //数据查询
          searchData(DataForm, searchUrl[stateIndex]);
      }
  }
  /**
   * 校验表单
   * */
  var validateForm = function (obj) {
      var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
      //起始时间格式校验
      var endDateValid = regexp.test(obj.startDate);
      if (!endDateValid) {
        alertClearData(tableObject);
          return {
              valid: false,
              mess: "请输入正确的起始时间,日期格式:YYYYMMDD"
          }
      }
      //截止时间格式校验
      var endDateValid = regexp.test(obj.endDate);
      if (!endDateValid) {
        alertClearData(tableObject);
          return {
              valid: false,
              mess: "请输入正确的截止时间,日期格式:YYYYMMDD"
          }
      }
      // 起止时间范围校验
      var valid =  validateDatesDifference();
      if( !valid){
        alertClearData(tableObject);
          return {
              valid: false,
              mess: "起止时间跨度不能超过7天"
          }
      }
      // 机场名称校验
      if (obj.airportName == "") {
        alertClearData(tableObject);
          return {
              valid: false,
              mess: "请输入正确的机场名称"
          }
      }
      return {
          valid: true
      };
  };

  /**
   *  警告
   *
   *  mess str 警告信息内容
   * */
  var showAlear = function (validate) {
    var mess = '';
    if ($.isValidObject(validate)) {
      mess = validate.mess;
    } else if ($.isValidVariable(validate)) {
      mess = validate;
    }
    var $dom = $('.alert-container');
    var str = '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
      '<p id="alert-mess">' + mess + ' </p>' +
      '</div>';
    $dom.empty().append(str);
  };

  /**
   * 清空警告
   *
   * */
  var clearAlert = function () {
    $('.alert-container').empty();
  };

  /**
   *
   * 提示
   * */

  var showTip = function (mess) {
    mess = mess || '';
    $('.charts-wrap .no-datas-tip').text(mess).show();
  };

  /**
   * 清空提示
   * */
  var clearTip = function () {
    $('.history-data-statistics .no-datas-tip').text('').hide();
  };


  /**
   * 显示当前统计条件
   * */
  var showConditions = function (obj ,state) {
      //当前选中的类型
      $('.'+state+' .conditions-start-data').text(obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $('.'+state+' .conditions-end-data').text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $('.'+state+' .conditions-type').text('机场状态:' + obj.currentType).attr('title', '机场状态: ' + obj.currentType);
      $('.'+state+' .conditions-subtype').text('机场名称:' + obj.airportName).attr('title', '机场名称: ' + obj.airportName);
      $('.'+state+' .conditions-content').removeClass('hidden');
  };
/**
 * 隐藏当前统计条件
 * */
  var hideConditions = function () {
    $('.conditions-content').addClass('hidden');
  };

  /**
   * 数据查询
   * */
  var searchData = function (formData, searchUrl) {
    var loading = Ladda.create($('.search_data')[stateIndex]);
    loading.start();
    $('.form-wrap').addClass('no-event');
    var url = searchUrl +formData.startDate + '/' +   formData.endDate + '/' + formData.airportName + '/' + formData.currentStatus + '';
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        // 当前数据
        if ($.isValidObject(data)) {
          //提取数据
          var time = data.generateTime;
          $.extend(tableDataConfigs.data, data)
          // 更新数据时间
          if ($.isValidVariable(time)) {
            // 更新数据时间
            updateGeneratetime(time);
          }
          if (searchUrl == ipHost) {
            tableDataConfigs.flyErrorTableDataConfig.data = [];
            tableDataConfigs.flyDetailDataConfig.data = [];
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'flyErrorTableDataConfig')
            initGridTable(tableDataConfigs.flyErrorTableDataConfig, 'flight_grid_table','flight-datas-pager')
          } else {
            tableDataConfigs.terminalPointDataConfigTop.data = []
            tableDataConfigs.terminalPointDataConfigDown.data = []
            tableDataConfigs.terminalDetailDataConfig.data = []
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'terminalPointDataConfigTop')
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'terminalPointDataConfigDown')
            initGridTable(tableDataConfigs.terminalPointDataConfigTop, tableObject.terTableObjTop,'flight-datas-pager')
            initGridTable(tableDataConfigs.terminalPointDataConfigDown, tableObject.terTableObjDown,'d-datas-pager')
          }
          // 若数据为空
          if ($.isEmptyObject(data.map)) {
            alertClearData(tableObject)
            //显示提示
            showTip('本次统计数据结果为空');
            loading.stop();
            $('.form-wrap').removeClass('no-event');
            return;
          }
          loading.stop();
          $('.form-wrap').removeClass('no-event');

        } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
          var err = "查询失败:" + data.error;
          showAlear(err);
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        } else {
          showAlear("查询失败");
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        }

      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
        loading.stop();
        showAlear("查询失败");
        $('.form-wrap').removeClass('no-event');
      }
    });
  };

  var updateGeneratetime = function (time) {
    var timeFormatter = formateTime(time);
    $('.history-data-title .generate-time').text('数据生成时间: ' + timeFormatter);
  };

  /**
   *  清空数据时间
   * */
  var clearGeneratetime = function () {
    $('.history-data-statistics .generate-time').empty();
  };

  /**
   * 格式化时间
   * */
  var formateTime = function (time) {
    var year = time.substring(0, 4);
    var mon = time.substring(4, 6);
    var date = time.substring(6, 8);
    var hour = time.substring(8, 10);
    var min = time.substring(10, 12);
    var str = year + '-' + mon + '-' + date + ' ' + hour + ":" + min;
    return str;
  };

  /**
   * 绑定Window事件，窗口变化时重新调整表格大小
   * */
  var initDocumentResize = function () {
    $(window).resize(function () {
        resizeToFitContainer();
      if($.isValidObject(tableObject)){
        if(stateIndex == 0){
          tableDataConfigs.resizeToFitContainer('flight_grid_table')
        }else if(stateIndex == 1){
          tableDataConfigs.resizeToFitContainer('flight_grid_table')
          tableDataConfigs.resizeToFitContainer('d_flight_grid_table')
        }
      }
    });
  };

  /**
   *  计算echarts初始化前父容器的高度, echarts高度自适应
   * */
  var resizeToFitContainer = function () {
    var body = $('body').height();
    var head = $('.headbar').outerHeight() + parseInt($('.headbar').css('marginBottom'));
    var nav = $('.nav-menu').outerHeight() + parseInt($('.nav-menu').css('marginBottom'));
    var innerNav = $('.history-data-title').outerHeight() + parseInt($('.history-data-title').css('marginBottom'));
    var form = $('.form-wrap').outerHeight() + parseInt($('.form-wrap').css('marginBottom'));
    var wrapHeight = body - head - nav - innerNav - form - 20;
    var chartHeight = wrapHeight - $('.conditions').outerHeight();
    $('.charts-wrap').height(wrapHeight);
    $('.echart-row').height(chartHeight);
  };
  /**
   * 初始化日期插件datepicker
   * */
  var initDatepicker = function () {
      // 起始时间输入框
      $('.start-date-input').datepicker({
          language: "zh-CN",
          autoclose: true, //选择日期后自动关闭面板
          endDate: '0d', //可选日期最后日期
          //格式化
          format: 'yyyymmdd',
      });
      // 截止时间输入框
      $('.flight-end-date').datepicker({
          language: "zh-CN",
          autoclose: true, //选择日期后自动关闭面板
          endDate: '0d', //可选日期最后日期
          //格式化
          format: 'yyyymmdd',
      });
      //事件绑定
      $('.start-date-input').on('changeDate', function () {
          // 校验起止日期范围是否有效，无效则弹出警告
          validateDates();
      });
      $('.flight-end-date').on('changeDate', function () {
          // 设置起止时间输入框日历插件的可选范围及默认选中日期
          setStartdDataRange();
          // 校验起止日期范围是否有效，无效则弹出警告
          validateDates();
      });
  };

/**
 * 设置默认日期
 * */
  var setDefaultDates = function () {
      //当前日期
      var now = $.getFullTime(new Date()).substring(0, 8);
      // 当前日期前1天
      var preDay = $.addStringTime(now + '0000', 3600 * 1000 * 24 * -1);
      // 设置起止日期
      $('.start-date-input').datepicker('setDate', $.parseFullTime(preDay));
      // 设置截止日期
      $('.flight-end-date').datepicker('setDate', $.parseFullTime(now+'0000'));
  };
    return {
    init: function () {
      // 初始化组件
      initComponent();
      // 初始化事件绑定
      initEvent();
      //表格容器尺寸适配
      resizeToFitContainer();
    }
  }
}();

$(document).ready(function () {
  PredictionData.init();
});