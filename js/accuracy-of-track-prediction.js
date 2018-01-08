var PredictionData = function () {
  //Ip地址
  var ipHost = 'http://192.168.243.191:8080/module-trajectoryCorrect-service/trajectory/correct/'
  var searchUrl = {
    terMinalTime: ipHost,
    terMinalHeight: ipHost + 'point/'
  }
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
    terTableObjTop: 'flight_grid_table',
    terTableObjDown: 'd_flight_grid_table'
  }
  // 初始化组件
  var initComponent = function () {
    //初始化日历插件datepicker
    initDatepicker();
    //绑定Window事件，窗口变化时重新调整表格大小
    initDocumentResize();

  };
  // 初始化事件绑定
  var initEvent = function () {
    // 导航
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
    //航段飞行时间误差统计导航点击事件
    $('.nav_monitor').on('click', function () {
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //切换table个数
      $('.down_table').hide();
      $('.down_table').removeClass('h50');
      $('.fly_table').removeClass('h50');
      $('.fly_table').addClass('h100');
      //修改标题文字
      if ($('.header_name').text() == '航段飞行时间误差统计') {
        return
      } else {
        $('.header_name').text('航段飞行时间误差统计')
      }
      //清空数据
      $('.start-date-input').val('');
      $('.flight-end-date').val('');
      $('.flight_name').val('')
      $.jgrid.gridUnload(tableObject.terTableObjTop);
      $.jgrid.gridUnload(tableObject.terTableObjDown);
      hideConditions()
    });
    // 终端区航路点过点时间统计导航点击事件
    $('.nav-history-data-statistics').on('click', function () {
      //切换table个数
      $('.down_table').show();
      $('.down_table').addClass('h50');
      $('.fly_table').removeClass('h100');
      $('.fly_table').addClass('h50');
      //修改标题文字
      if ($('.header_name').text() == '航段飞行时间误差统计') {
        $('.header_name').text('终端区航路点过点时间统计')
      } else {
        return
      }
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //清空数据
      $('.start-date-input').val('');
      $('.flight-end-date').val('');
      $('.flight_name').val('')
      $.jgrid.gridUnload(tableObject.flyTableObj);
      hideConditions()
    });
    //起飞机场点击事件状态绑定
    $('.dep').on('click', function () {

      if ($(this).hasClass('selected')) {
        $('.arr').removeClass('selected')
      } else {
        $(this).addClass('selected')
        $('.arr').removeClass('selected')
      }
    });
    //降落机场点击事件状态绑定
    $('.arr').on('click', function () {
      if ($(this).hasClass('selected')) {
        $('.dep').removeClass('selected')
      } else {
        $(this).addClass('selected')
        $('.dep').removeClass('selected')
      }
    });
  }
  /**判断机场状态*/
  var airportStatus = function () {
    if ($('.dep').hasClass('selected')) {
      return '起飞机场'
    } else {
      return '降落机场'
    }
  }
  /*
   * 获取表单数据
   * */
  var getFormData = function (formObj) {
    if ($(".fly_time").is(":visible")) {
      formObj.startDate = $(".start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.endDate = $(".flight-end-date").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.currentType = airportStatus().replace(/(^\s*)|(\s*$)/g, "");
      formObj.airportName = $(".fly_airport_Name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
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
    $('.search_data').on('click', function () {
      $(".no-datas-tip").hide()
      getFormData(DataForm);
      // 处理表单提交
      handleSubmitForm(DataForm)
      //航段飞行时间统计
      if ($('.header_name').text() == '航段飞行时间误差统计') {
        searchData(DataForm, searchUrl.terMinalTime)
      } else {
        //终端区航路点过点时间统计
        searchData(DataForm, searchUrl.terMinalHeight)
      }

    });
  };
  /*
   * 数据转换方法
   * */
  var dataConvert = function (data, gridParam, option) {
    //航段飞行时间误差数据转换
    if ($.isValidObject(data)) {
      if ($.isValidObject(data.map)) {
        $.each(data.map, function (i, e) {
          var obj = {}
          if (option == 'flyErrorTableDataConfig') {
            obj.flyDepPointType = i;
            $.each(gridParam[option].colModel, function (index, ele) {
              if (ele['index'] != 'flyDepPointType') {
                obj[ele['index']] = e[ele['index']];
              }
            })
          } else {
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
  var initGridTable = function (config, tableId) {
    var table = $('#' + tableId).jqGrid({
      styleUI: 'Bootstrap',
      datatype: 'local',
      rownumbers: true,
      autowidth: true,
      height: "auto",
      shrinkToFit: false,
      cmTemplate: {
        align: 'center',
        resize: false
      },
      colNames: config.colName,
      colModel: config.colModel,
      rowNum: 999999, // 一页显示多少条
      // sortname: 'time', // 初始化的时候排序的字段
      // sortorder: 'asc', //排序方式,可选desc,asc
      // viewrecords: true,
      onCellSelect: function (rowid, index, contents, event) {
        console.log(this)
        if (index == 1) {
          var option = {
            title: contents + '详情',
            content: '<div class="detail"><table id="' + rowid + 'table" class="detail_table"></table></div>',
            width: 1280,
            height: 960,
            isIcon: false,
            showCancelBtn: false,
            mtop: 180
          }
          BootstrapDialogFactory.dialog(option);
          if ($('.header_name').text() == '航段飞行时间误差统计') {
            tableDataConfigs.flyDetailDataConfig.data = tableDataConfigs.data.infoMap[contents];
            initGridTable(tableDataConfigs.flyDetailDataConfig, rowid + 'table')
          } else {
            tableDataConfigs.terminalDetailDataConfig.data = tableDataConfigs.data.infoMap[contents];
            initGridTable(tableDataConfigs.terminalDetailDataConfig, rowid + 'table')
          }
        }
      }
    })
    $('#' + tableId).jqGrid('setGridParam', {datatype: 'local', data: config.data}).trigger('reloadGrid')
    tableDataConfigs.resizeToFitContainer(tableId)
  };

  /**
   * 处理表单提交
   * */
  var handleSubmitForm = function (obj) {
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
      showConditions(obj);
      //数据查询
      //searchData(obj);
    }
  }
  /**
   * 校验表单
   * */
  var validateForm = function (obj) {
    var regexp = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)/;
    //起始时间格式
    var endDateValid = regexp.test(obj.endDate);
    if (!endDateValid) {
      return {
        valid: false,
        mess: "请输入正确的截止时间,日期格式:YYYYMMDD"
      }
    }
    if (obj.airportName == "") {
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
    $('.history-data-statistics .no-datas-tip').text(mess).show();
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
  var showConditions = function (obj) {
    //当前选中的类型
    $('.conditions-start-data').text('时间:' + obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
    $('.conditions-end-data').text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
    $('.conditions-type').text('机场类型:' + obj.currentType).attr('title', '机场类型: ' + obj.currentType);
    $('.conditions-subtype').text('机场名称:' + obj.airportName).attr('title', '机场: ' + obj.airportName);
    $('.conditions-content').removeClass('hidden');
  };

  var hideConditions = function () {
    $('.conditions-content').addClass('hidden');
  };

  /**
   * 数据查询
   * */
  var searchData = function (formData, searchUrl) {
    var loading = Ladda.create($('.history-data-btn')[0]);
    loading.start();
    $('.form-wrap').addClass('no-event');
    var url = searchUrl + formData.endDate + '/' + formData.startDate + '/' + formData.airportName + '/' + formData.currentStatus + '';
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        // 当前数据
        if ($.isValidObject(data)) {
          //提取数据
          var time = data.generatetime;
          $.extend(tableDataConfigs.data, data)
          // 更新数据时间
          if ($.isValidVariable(time)) {
            // 更新数据时间
            updateGeneratetime(time);
          }
          if ($('.header_name').text() == '航段飞行时间误差统计') {
            tableDataConfigs.flyErrorTableDataConfig.data = [];
            tableDataConfigs.flyDetailDataConfig.data = [];
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'flyErrorTableDataConfig')
            initGridTable(tableDataConfigs.flyErrorTableDataConfig, 'flight_grid_table')
          } else {
            tableDataConfigs.terminalPointDataConfigTop.data = []
            tableDataConfigs.terminalPointDataConfigDown.data = []
            tableDataConfigs.terminalDetailDataConfig.data = []
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'terminalPointDataConfigTop')
            dataConvert(tableDataConfigs.data, tableDataConfigs, 'terminalPointDataConfigDown')
            initGridTable(tableDataConfigs.terminalPointDataConfigTop, tableObject.terTableObjTop)
            initGridTable(tableDataConfigs.terminalPointDataConfigDown, tableObject.terTableObjDown)
          }
          // 若数据为空
          if (!$.isValidObject(data)) {
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
    $('.history-data-statistics .generate-time').text('数据生成时间: ' + timeFormatter);
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
      if ($('.history-data-statistics').is(":visible")) {
        resizeToFitContainer();
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
    $('.start-date-input').datepicker({
      language: "zh-CN",
      // showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
      autoclose: true, //选择日期后自动关闭面板
      // clearBtn: true, //是否显示清空按钮
      //todayHighlight: true,
      //startDate: '-6d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
      endDate: '0d', //可选日期最后日期
      // keepEmptyValues: true,
      // forceParse: true,
      //格式化
      format: 'yyyymmdd',
    });
    $('.flight-end-date').datepicker({
      language: "zh-CN",
      // showOnFocus: false, //是否在获取焦点时显示面板 true显示 false不显示 默认true
      autoclose: true, //选择日期后自动关闭面板
      // clearBtn: true, //是否显示清空按钮
      //todayHighlight: true,
      startDate: '-6d', //可选日期的开始日期 0d:当前 -1d:当前的前1天, +1d:当前的后1天
      endDate: '0d', //可选日期最后日期
      // keepEmptyValues: true,
      // forceParse: true,
      //格式化
      format: 'yyyymmdd',
    });
    $('.start-date-input').on('changeDate', function () {
      var  time = $('.start-date-input').val();
      var day7 = $.addStringTime(time + '0000', 3600*1000*24*-1*6);
      var endTime  = $.parseFullTime(time+ '0000');
      $('.flight-end-date').datepicker('setStartDate',  $.parseFullTime(day7));
      $('.flight-end-date').datepicker('setEndDate',endTime );
      // $('.flight-end-date').datepicker('setDate',endTime );
    })
  };
  return {
    init: function () {
      // 初始化组件
      initComponent();
      // 初始化事件绑定
      initEvent();

      resizeToFitContainer();
    }
  }
}();

$(document).ready(function () {
  PredictionData.init();
})