var PredictionData = function () {
  //Ip地址
  var ipHost = 'http://192.168.208.21:8080/module-trajectoryCorrect-service/trajectory/';
  // 当前nav索引
  var stateIndex = 0;
  //状态与地址对应关系
  var searchUrl = {
    fly: ipHost + 'correct/',
    ter: ipHost + 'correct/point/',
    pre: ipHost + 'flight/'
  }
  //根据索引获取当前页面状态数组
  var stateArr = ['fly', 'ter', 'pre','uncor']
  //搜索状态
  var searchState = '';
  //表格对应id集合
  var idsObj = {
    fly:{
      canvasId:'fly-canvas',
      tableId:'fly-grid-table',
      pagerId:'fly-grid-pager',
    },
    ter:{
      top:{
        canvasId:'ter-top-canvas',
        tableId:'ter-top-grid-table',
        pagerId:'ter-top-table-pager',
      },
      down:{
        canvasId:'ter-down-canvas',
        tableId:'ter-down-grid-table',
        pagerId:'ter-down-table-pager',
      }
    },
    pre:{
      canvasId:'pre-canvas',
      tableId:'pre-grid-table',
      pagerId:'pre-table-pager',
    },
    uncor:{
      canvasId:'un-canvas',
      tableId:'un-grid-table',
      pagerId:'un-table-pager',
    }
  }
  //表格对象集合
  var tableObject = {
    fly:'',
    ter:{
      top:'',
      down:''
    },
    pre:'',
    uncor:''
  }
  //数据生成时间集合
  var generateTimeObj = {
    flyDataTime:'',
    terDataTime:''
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
  // 初始化组件
  var initComponent = function () {
    //初始化日历插件datepicker
    initDatepicker('.fly_time ');
    initDatepicker('.ter_time ');
    initPreDatapicker();
    // 设置默认时间
    setDefaultDates();

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
    var tabPage = [$('.fly_time'), $('.ter_time'), $('.precision_show'),$('.uncorrect_flight')]
    var nav = $('#nav');
    $('.nav li', nav).on('click', function () {
      // 更新当前nav索引
      stateIndex = $(this).index();
    });
    //航段飞行时间误差统计导航点击事件
    $('.nav_monitor').on('click', function () {
      // 清空警告
      clearAlert();
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //切换模块
      tabToggle(stateIndex, tabPage)
    });
    // 终端区航路点过点时间统计导航点击事件
    $('.nav-history-data-statistics').on('click', function () {
      // 清空警告
      clearAlert();
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //模块切换
      tabToggle(stateIndex, tabPage)
    });
    //航班航路点预测精度展示
    $('.precision-data-statistics').on('click', function () {
      // 清空警告
      clearAlert();
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //模块切换
      tabToggle(stateIndex, tabPage)
    })
    $('.uncorrect-flight').on('click',function () {
      // 清空警告
      clearAlert();
      UncorrectFlight.setDefaultDates()
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //模块切换
      tabToggle(stateIndex, tabPage)
    })
    //航段飞行起飞机场点击事件状态绑定
    initAirportState($('.fly_time .dep'), $('.fly_time .arr'))
    //终端区起飞机场点击事件状态绑定
    initAirportState($('.ter_time .dep'), $('.ter_time .arr'))
  }
  /*
   * tab页状态切换
   * */
  var tabToggle = function (tabIndex, tabPage) {
    $.each(tabPage, function (i, e) {
      if (i == tabIndex) {
        e.removeClass('module-hide')
        e.addClass('module-show active');
      } else {
        e.removeClass('module-show')
        e.addClass('module-hide active');
      }
    })
  }
  /*
   * 提示前清空数据
   * */
  var alertClearData = function (table) {
    if ($.isValidObject(table)) {
      if (stateArr[stateIndex] == 'fly'&&$.isValidObject(table.fly)) {

        table.fly.unloadGrid();
      } else if (stateArr[stateIndex] == 'ter'&&$.isValidObject(table.ter.top)) {

        table.ter.top.unloadGrid();
        table.ter.down.unloadGrid();
      } else if (stateArr[stateIndex] == 'pre'&&$.isValidObject(table.pre)) {
        table.pre.unloadGrid();
      }
    }
  }
  /*
   * 监控起飞降落机场状态
   * */
  var initAirportState = function (state1, state2) {
    state1.on('click', function () {
      if ($(this).hasClass('selected')) {
        state2.removeClass('selected')
      } else {
        $(this).addClass('selected')
        state2.removeClass('selected')
      }
    })
    state2.on('click', function () {
      if ($(this).hasClass('selected')) {
        state1.removeClass('selected')
      } else {
        $(this).addClass('selected')
        state1.removeClass('selected')
      }
    })
  }
  /**判断机场状态*/
  var airportStatus = function () {
    if (stateArr[stateIndex] == 'fly') {
      if ($('.fly_time .dep').hasClass('selected')) {
        return '起飞机场'
      } else {
        return '降落机场'
      }
    } else if (stateArr[stateIndex] == 'ter') {
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
    if (stateArr[stateIndex] == 'fly') {
      handelFormData('fly_time', formObj)
    } else if (stateArr[stateIndex] == 'ter') {
      handelFormData('ter_time', formObj)
    } else if (stateArr[stateIndex] == 'pre') {
      formObj.startDate = $(".pre-start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
      formObj.airportName = $(".pre_airport_Name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
    }
    return formObj;
  }
  /*
   * 获取表单数据处理
   * */
  var handelFormData = function (fatherDom, formObj) {
    formObj.startDate = $("." + fatherDom + " .start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
    formObj.endDate = $("." + fatherDom + " .flight-end-date").val().replace(/(^\s*)|(\s*$)/g, "");
    formObj.currentType = airportStatus().replace(/(^\s*)|(\s*$)/g, "");
    formObj.airportName = $("." + fatherDom + " .flight_name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
    if (formObj.currentType == '起飞机场') {
      formObj.currentStatus = 'D'
    } else {
      formObj.currentStatus = 'A'
    }
  }
  /**
   * 提交按钮事件
   * */
  var initSubmitEvent = function () {
    $('.fly-data-btn').on('click', function () {
      searchState = 'fly'
      $(".fly_time .no-datas-tip").hide();
      alertClearData(tableObject)
      //获取 表单数据
      getFormData(DataForm);
      // 处理表单提交
      handleSubmitForm(DataForm, 'fly_time');
    });
    $('.ter-data-btn').on('click', function () {
      searchState = 'ter'
      $(".ter_time .no-datas-tip").hide();
      alertClearData(tableObject)
      //获取 表单数据
      getFormData(DataForm);
      // 处理表单提交
      handleSubmitForm(DataForm, 'ter_time');

    });
    $('.pre-data-btn').on('click', function () {
      searchState = 'pre'
      $(".precision_show .no-datas-tip").hide();
      alertClearData(tableObject)
      //获取 表单数据
      getFormData(DataForm);
      // 处理表单提交
      handleSubmitForm(DataForm, 'precision_show');
    });
    $(document).keyup(function (event) {
      if (event.keyCode == 13) {
        if (stateArr[stateIndex] == 'fly') {
          searchState = 'fly'
          $(".fly_time .no-datas-tip").hide();
          alertClearData(tableObject)
          //获取 表单数据
          getFormData(DataForm);
          // 处理表单提交
          handleSubmitForm(DataForm, 'fly_time');
        } else if (stateArr[stateIndex] == 'ter') {
          searchState = 'ter'
          $(".ter_time .no-datas-tip").hide();
          alertClearData(tableObject)
          //获取 表单数据
          getFormData(DataForm);
          // 处理表单提交
          handleSubmitForm(DataForm, 'ter_time');
        } else if (stateArr[stateIndex] == 'pre') {
          searchState = 'pre'
          $(".precision_show .no-datas-tip").hide();
          alertClearData(tableObject)
          //获取 表单数据
          getFormData(DataForm);
          // 处理表单提交
          handleSubmitForm(DataForm, 'precision_show');
        }else if(stateArr[stateIndex] == 'uncor'){
          UncorrectFlight.searchData();
        }
      }
    });
  };

  /**
   * 校验起止日期范围是否有效，无效则弹出警告
   * */
  var validateDates = function (fatherDom) {
    // 清空警告
    clearAlert();
    // 清空提示
    clearTip(fatherDom);
    // 校验起止日期范围是否有效
    var bool = validateDatesDifference();
    // 若起止日期范围无效则弹出警告
    if (!bool) {
      // 弹出警告
      showAlear($('.alert-container'), {
        valid: false,
        mess: "起止时间跨度不能超过7天"
      })
    }
  };

  /**
   * 校验起止日期范围是否有效
   * @returns {boolean}
   */
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
   * @method setStartdDataRange 设置其实日期范围
   * @param fatherDom 父级容器
   */
  var setStartdDataRange = function (fatherDom) {
    // 起始时间值
    var start = $(fatherDom + '.start-date-input').val();
    var reg = /\-| |:/g;
    start =start.replace(reg,'');
    // 截止时间值
    var end = $(fatherDom + '.flight-end-date').val();
    end = end.replace(reg,'')
    // 截止时间前1天
    var preDay = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -1);
    // 截止时间前7天的日期值
    var day7 = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -7);
    // 求得起止时间相差天数
    var diff = Math.abs($.calculateStringTimeDiff(start + '0000', end + '0000') / (1000 * 60 * 60 * 24));
    // 设置起止日期的可选开始日期
    $(fatherDom + '.start-date-input').datetimepicker('setStartDate', $.parseFullTime(day7));
    // 设置起止日期的可选结束日期
    $(fatherDom + '.start-date-input').datetimepicker('setEndDate', $.parseFullTime(end + '0000'));
    // 若截止日期小于起止日期,设置起止日期的默认选中日期为截止日期的前1天
    if (end * 1 < start * 1) {
      // 设置起止日期的默认选中日期为截止日期的前1天
      $(fatherDom + '.start-date-input').datetimepicker('setDate', $.parseFullTime(preDay));
    } else if (diff > 7) { // 若起止时间相差天数大于7天
      // 设置起止日期的默认选中日期为截止日期的前1天
      $(fatherDom + '.start-date-input').datetimepicker('setDate', $.parseFullTime(preDay));
    } else {
      // 设置起止日期的默认选中日期为当前数值(用于解决输入框数值与日历默认选中日期数值不一致的问题)
      $(fatherDom + '.start-date-input').datetimepicker('setDate', $.parseFullTime(start + '0000'));
    }
  };

  /*
   * @method dataConvert 数据转换方法
   * @param data ajax返回数据对象
   * @param gridParam 表格参数配置
   * @param option 表格参数具体配置字符串
   * */
  var dataConvert = function (data,option) {
    if ($.isValidObject(data)) {
      if ($.isValidObject(data.map)) {
        $.each(data.map, function (i, e) {
          var obj = {}
          //航段飞行时间误差数据转换
          if (option == 'fly') {
            e.allName = i;
            var str = i.split('-');
            e.point = str[1]
            e.flyDepPointType = str[0];
          } else {
            //终端区航路点过点时间统计数据转换
            e.allName = i;
            var str = i.split('-')
            e.terPoint = str[1]
            e.depAirport = str[0]
          }
        })
        return data.map
      }
    }
  }
  /**
   * 初始化表格方法
   * @param config 表格参数配置
   * @param ids 表格内涉及id集合
   * @returns {FlightGridTable} 表格对象
   */
  var initGridTable = function (config, ids) {
    var pagerId = ids.pagerId;
    var tableId = ids.tableId;
    var canvasId = ids.canvasId;
    //判断默认排序字段
    var sortName = '';
    //导出文件名
    var fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName  + '航段飞行时间误差统计';
    if (stateArr[stateIndex] == 'fly' || stateArr[stateIndex] == 'ter') {
      sortName = ''
    } else if (stateArr[stateIndex] == 'pre') {
      sortName = 'rdeptime';
      fileName = DataForm.startDate + DataForm.airportName + '航班航路点预测精度';
    }
    //设置表头
    var captionName = '';
    if (pagerId == 'ter-top-table-pager') {
      captionName = '过点时间统计';
      fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName + '终端区航路点' +captionName
    }
    if (pagerId == 'ter-down-table-pager') {
      captionName = '过点高度统计'
      fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName + '终端区航路点' +captionName
    }
    var table = new FlightGridTable({
      canvasId:canvasId,
      tableId: tableId,
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
        caption:captionName,
        shrinkToFit: config.isShrinkToFit,
        rowNum: 999999,
        sortname: sortName,
        sortorder: 'asc',
        // sortname: 'SEQ',//排序列
        // 是否显示行号
        rownumbers: true,
        //是否显示快速过滤
        showQuickFilter: false,
        // scroll : true, //创建动态滚动表格。当设为启用时，pager被禁用，可使用垂直滚动条来装入数据。
        afterSearchCallBack: function () {

        },
        onCellSelect: function (rowid, index, contents, event) {
          var colName = table.gridTableObject.jqGrid('getGridParam')['colNames'][index];
          if (colName == '样本数'&&stateArr[stateIndex] == 'fly') {
            var flightName = table.gridTableObject.jqGrid('getGridParam')['data'][rowid - 1].allName;
            openDetailManageDialog(flightName,'fly',generateTimeObj.flyDataTime)
          }else if(colName == '样本数'&&stateArr[stateIndex] == 'ter'){
            var flightName = table.gridTableObject.jqGrid('getGridParam')['data'][rowid - 1].allName;
            openDetailManageDialog(flightName,'ter',generateTimeObj.terDataTime)
          }
          if (colName == '航班号' && stateArr[stateIndex] == 'pre') {
            var title = table.gridTableObject.jqGrid('getGridParam')['data'][rowid - 1].flightInOId;
            var flightName = table.gridTableObject.jqGrid('getGridParam')['data'][rowid - 1].flightId;
            openDetailManageDialog(title,'pre','',flightName)
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
          table.export(fileName);
        },
        position: "first"
      });
    // 显示pager
    $('#'+ pagerId).show();
    table.resizeToFitContainer();
    return table;
  };
  /**
   * 数据刷新方法
   * @param data
   * @param table
   */
  var fireTableDataChange = function (data,table) {
    table.tableDataMap = {};
    table.tableData = {};
    table.data = data;
    var tableData = [];
    var tableMap = {};
    var result = data;
    for (var index in result) {
      var d = result[index];
      //将id赋予表格的rowid
      // d['id'] = d.flightInOId;
      tableData.push(d);
      // tableMap[result[index].flightInOId] = d;
    }
    table.tableDataMap = tableMap;
    table.tableData = tableData;
    table.drawGridTableData();
  }
  /**
   * 打开详情窗口
   * @param title
   * @param contents
   * @param rowid
   */
  function openDetailManageDialog(title,type,time,flightName) {
    if($.isValidVariable(flightName)){
      var winTitle = flightName + '航班详情';
    }else{
      var winTitle = title + '航班详情';
    }
    var dialogId = 'grid_flight_talbe_data_' + new Date().getTime();
    var winUrl = 'detail.html?/'+type+'/'+title+'/'+time+'/'+flightName+ '/';
    var winParams = {
      id: dialogId,
      width: $(window).width()-50,
      height: $(window).height()-100,
      center: true,
      move: true
    };
    var winObj = DhxIframeDialog.create(winTitle, winUrl, winParams)
  }

  /**
   * @method handleSubmitForm 处理表单数据
   * @param obj 表单数据对象集合
   * @param state 当前选中的页面的Class名称
   * */
  var handleSubmitForm = function (obj, state) {
    // 清空警告
    clearAlert();
    // 清空提示
    clearTip(state);
    //校验表单;
    var validate = validateForm(obj);
    if (!validate.valid) {
      // 清空数据时间
      clearGeneratetime();
      //隐藏当前统计条件
      hideConditions();
      // 显示警告信息内容
      showAlear($('.alert-container'), validate);
      return;
    } else {
      //显示当前统计条件
      showConditions(obj, state);
      //数据查询
      searchData(DataForm, searchUrl[stateArr[stateIndex]]);
    }
  }
  /**
   * @method validateForm 校验表单数据
   * @param obj 表单数据对象集合
   * @return valid 校验结果Boolean
   * @return mess 校验结果信息
   * */
  var validateForm = function (obj) {
    var regexp = /[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))/;
    //起始时间格式校验
    var endDateValid = regexp.test(obj.startDate);
    if (!endDateValid) {
      alertClearData(tableObject);
      return {
        valid: false,
        mess: "请输入正确的起始时间,日期格式:YYYY-MM-DD"
      }
    }
    if (stateIndex != 2) {
      //截止时间格式校验
      var endDateValid = regexp.test(obj.endDate);
      if (!endDateValid) {
        alertClearData(tableObject);
        return {
          valid: false,
          mess: "请输入正确的截止时间,日期格式:YYYY-MM-DD"
        }
      }
      // 起止时间范围校验
      var valid = validateDatesDifference();
      if (!valid) {
        alertClearData(tableObject);
        return {
          valid: false,
          mess: "起止时间跨度不能超过7天"
        }
      }
    }
    // 机场名称校验
    if (obj.airportName == "") {
      alertClearData(tableObject);
      if (stateIndex != 2) {
        return {
          valid: false,
          mess: "请输入正确的机场名称"
        }
      } else {
        return {
          valid: false,
          mess: "请输入正确的航班号"
        }
      }
    }
    return {
      valid: true
    };
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
   * 清空警告
   *
   * */
  var clearAlert = function () {
    $('.alert-container').empty();
  };
  /**
   *
   * @param mess 提示信息
   */
  var showTip = function (domObj, mess) {
    mess = mess || '';
    domObj.text(mess).show();
    // $('.charts-wrap .no-datas-tip').text(mess).show();
  };

  /**
   * 清空提示
   * */
  var clearTip = function (fatherDom) {
    $(fatherDom + ' .no-datas-tip').text('').hide();
  };


  /**
   * @method showConditions 显示当前统计内容
   * @param obj 表单对象集合
   * @param state 当前页面状态
   * */
  var showConditions = function (obj, state) {
    //当前选中的类型
    if (state != 'precision_show') {
      $('.' + state + ' .conditions-start-data').text(obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $('.' + state + ' .conditions-end-data').text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $('.' + state + ' .conditions-type').text('机场状态:' + obj.currentType).attr('title', '机场状态: ' + obj.currentType);
      $('.' + state + ' .conditions-subtype').text('机场名称:' + obj.airportName).attr('title', '机场名称: ' + obj.airportName);
      $('.' + state + ' .conditions-content').removeClass('hidden');
    } else {
      $('.' + state + ' .conditions-start-data').text(obj.startDate).attr('title', '时间: ' + obj.startDate);
      $('.' + state + ' .conditions-subtype').text('航班号:' + obj.airportName).attr('title', '机场名称: ' + obj.airportName);
      $('.' + state + ' .conditions-content').removeClass('hidden');
    }
  };
  /**
   * 隐藏当前统计条件
   * */
  var hideConditions = function () {
    $('.conditions-content').addClass('hidden');
  };

  /**
   * @method searchData 搜索数据方法
   * @param formData 表单数据对象集合
   * @return searchUrl ajax请求地址
   * */
  var searchData = function (formData, searchUrl) {
    var loading = Ladda.create($('.loading-data')[stateIndex]);
    loading.start();
    $('.form-wrap').addClass('no-event');

    if (stateArr[stateIndex] == 'pre') {
      var url = searchUrl + formData.startDate.replace(/-/g,'') + '/' + formData.airportName;
    } else {
      var url = searchUrl + formData.startDate.replace(/-/g,'') + '/' + formData.endDate.replace(/-/g,'') + '/' + formData.airportName + '/' + formData.currentStatus + '';
    }
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data, status, xhr) {
        // 当前数据
        if ($.isValidObject(data)) {
          //处理表头
          if ($.isValidVariable(formData.currentStatus)) {
            if (formData.currentStatus == 'D') {
              tableDataConfig.flyErrorTableDataConfig.colName.flyDepPointType.cn = '起飞机场'
              tableDataConfig.terminalPointDataConfigTop.colName.depAirport.cn = '起飞机场'
              tableDataConfig.terminalPointDataConfigDown.colName.depAirport.cn = '起飞机场'
            } else if (formData.currentStatus == 'A') {
              tableDataConfig.flyErrorTableDataConfig.colName.flyDepPointType.cn = '降落机场'
              tableDataConfig.terminalPointDataConfigTop.colName.depAirport.cn = '降落机场'
              tableDataConfig.terminalPointDataConfigDown.colName.depAirport.cn = '降落机场'
            }
          }
          if (stateArr[stateIndex] == 'fly' && searchState == 'fly') {
            // 判断数据是否为空
            if ($.isEmptyObject(data.map) && stateIndex != 2) {
              alertClearData(tableObject)
              //显示提示
              showTip($('.fly_time .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
              loading.stop();
              $('.form-wrap').removeClass('no-event');
              return;
            } else {
              //保存数据生成时间
              generateTimeObj.flyDataTime = data.generateTime
              //初始化航段飞行时间统计表格
              tableDataConfig.inittableParams(tableDataConfig.flyErrorTableDataConfig);
              //将详情页数据赋值给sessionStorage
              // tableDataConfig.flyDetailDataConfig['originData'] = data.infoMap
              sessionStorage.removeItem('flyDetailObj');
              sessionStorage.setItem('flyDetailObj',JSON.stringify(data.infoMap));
              tableObject.fly = initGridTable(tableDataConfig.flyErrorTableDataConfig,idsObj.fly);
              var convertedData = dataConvert(data,'fly');
              fireTableDataChange(convertedData,tableObject.fly);
              // 更新数据时间
              if ($.isValidVariable(generateTimeObj.flyDataTime)) {
                // 更新数据时间
                updateGeneratetime('fly_time', generateTimeObj.flyDataTime);
              }
            }
          } else if (stateArr[stateIndex] == 'ter' && searchState == 'ter') {
            // 判断数据是否为空
            if ($.isEmptyObject(data.map) && stateIndex != 2) {
              alertClearData(tableObject)
              //显示提示
              showTip($('.ter_time .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
              loading.stop();
              $('.form-wrap').removeClass('no-event');
              return;
            } else {
              //保存数据生成时间
              generateTimeObj.terDataTime = data.generateTime
              //初始化终端区航路点表格
              tableDataConfig.inittableParams(tableDataConfig.terminalPointDataConfigTop);
              tableObject.ter.top = initGridTable(tableDataConfig.terminalPointDataConfigTop, idsObj.ter.top)
              var convertedData = dataConvert(data,'ter');
              //将详情页数据赋值给sessionStorage
              sessionStorage.removeItem('terDetailObj');
              sessionStorage.setItem('terDetailObj',JSON.stringify(data.infoMap));
              fireTableDataChange(convertedData,tableObject.ter.top);
              tableDataConfig.inittableParams(tableDataConfig.terminalPointDataConfigDown);
              tableObject.ter.down = initGridTable(tableDataConfig.terminalPointDataConfigDown, idsObj.ter.down)
              fireTableDataChange(convertedData,tableObject.ter.down);
              // 更新数据时间
              if ($.isValidVariable(generateTimeObj.terDataTime)) {
                // 更新数据时间
                updateGeneratetime('ter_time', generateTimeObj.terDataTime);
              }
            }
          } else if (stateArr[stateIndex] == 'pre' && searchState == 'pre') {
            // 判断数据是否为空
            if ($.isEmptyObject(data.flights) && stateArr[stateIndex] == 'pre') {
              alertClearData(tableObject)
              //显示提示
              showTip($('.precision_show .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
              loading.stop();
              $('.form-wrap').removeClass('no-event');
              return;
            } else {
              //航班航路点预测精度
              tableDataConfig.inittableParams(tableDataConfig.precisionTableDataConfig);
              tableObject.pre = initGridTable(tableDataConfig.precisionTableDataConfig, idsObj.pre)
              fireTableDataChange(data.flights,tableObject.pre)
              // 更新数据时间
              if ($.isValidVariable(data.generateTime)) {
                // 更新数据时间
                updateGeneratetime('precision_show', data.generateTime);
              }
            }
          }
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
          if (stateArr[stateIndex] == 'fly') {
            var err = "查询失败:" + data.error;
            showAlear($(' .fly_time .alert-container'), err);
          }
          if (stateArr[stateIndex] == 'ter') {
            var err = "查询失败:" + data.error;
            showAlear($('.ter_time .alert-container'), err);
          }
          if (stateArr[stateIndex] == 'pre') {
            var err = "查询失败:" + data.error;
            showAlear($('.precision_show .alert-container'), err);
          }
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        } else {
          showAlear($('.alert-container'), "查询失败");
          loading.stop();
          $('.form-wrap').removeClass('no-event');
        }

      },
      error: function (xhr, status, error) {
        console.error('Search data failed');
        console.error(error);
        loading.stop();
        if (stateArr[stateIndex] == 'fly') {
          showAlear($(' .fly_time .alert-container'), "查询失败");
        }
        if (stateArr[stateIndex] == 'ter') {
          showAlear($('.ter_time .alert-container'), "查询失败");
        }
        if (stateArr[stateIndex] == 'pre') {
          showAlear($('.precision_show .alert-container'), "查询失败");
        }
        $('.form-wrap').removeClass('no-event');
      }
    });
  };
  /**
   * @method updateGeneratetime 更新当前数据刷新时间
   * @param fatherDom 模块名称
   * @param time 刷新时间
   */
  var updateGeneratetime = function (fatherDom, time) {
    var timeFormatter = $.formateTime(time);
    $('.' + fatherDom + ' .generate-time').text('数据生成时间: ' + timeFormatter);
  };
  /**
   *  清空数据时间
   * */
  var clearGeneratetime = function () {
    $('.history-data-statistics .generate-time').empty();
  };
  /**
   * @method initDatepicker 初始化日期选择器
   * @param fatherDom 父级容器
   */
  var initDatepicker = function (fatherDom) {
    // 起始时间输入框
    $(fatherDom + '.start-date-input').datetimepicker({
      language:"zh-CN",
      weekStart:1,
      todayBtn:false,
      autoclose:1,
      startView:2,
      minView:2,
      forceParse:0,
      format:"yyyy-mm-dd",// 选择时间
      pickerPosition:'bottom-left'
    });
    // 截止时间输入框
    $(fatherDom + '.flight-end-date').datetimepicker({
      language:"zh-CN",
      weekStart:1,
      todayBtn:false,
      autoclose:1,
      startView:2,
      minView:2,
      forceParse:0,
      format:"yyyy-mm-dd",// 选择时间
      pickerPosition:'bottom-left'
    });
    //事件绑定
    $(fatherDom + '.start-date-input').on('changeDate', function () {
      // 校验起止日期范围是否有效，无效则弹出警告
      validateDates(fatherDom);
    });
    $(fatherDom + '.flight-end-date').on('changeDate', function () {
      // 设置起止时间输入框日历插件的可选范围及默认选中日期
      setStartdDataRange(fatherDom);
      // 校验起止日期范围是否有效，无效则弹出警告
      validateDates();
    });
  };

  var initPreDatapicker = function () {
    //时间输入栏
    $('.pre-start-date-input').datetimepicker({
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
  }

  /**
   * 设置默认日期
   * */
  var setDefaultDates = function () {
    //当前日期
    var now = $.getFullTime(new Date()).substring(0, 8);
    // 当前日期前1天
    var preDay = $.addStringTime(now + '0000', 3600 * 1000 * 24 * -1);
    //当前日期前7天
    var preSevenDay = $.addStringTime(now + '0000', 3600 * 1000 * 24 * -7);
    // 设置起始日期
    $('.start-date-input').datetimepicker('setDate', $.parseFullTime(preDay));
    $('.start-date-input').datetimepicker('setStartDate', $.parseFullTime(preSevenDay));
    $('.start-date-input').datetimepicker('setEndDate', $.parseFullTime(preDay));
    // 设置截止日期
    $('.flight-end-date').datetimepicker('setDate', $.parseFullTime(now + '0000'));
    $('.flight-end-date').datetimepicker('setEndDate', $.parseFullTime(now + '0000'));
    //设置默认时间
    $('.pre-start-date-input').datetimepicker('setDate', $.parseFullTime(now + '0000'));
    $('.pre-start-date-input').datetimepicker('setEndDate', $.parseFullTime(now + '0000'));
  };
  return {
    init: function () {
      // 初始化组件
      initComponent();
      // 初始化事件绑定
      initEvent();
    }
  }
}();

$(document).ready(function () {
  PredictionData.init();
});