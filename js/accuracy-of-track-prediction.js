var PredictionData = function () {
  // 当前nav索引
  var stateIndex = 0;
  //根据索引获取当前页面状态数组
  var stateArr = ['fly', 'ter', 'pre','uncor','out','incon']
  //搜索状态
  var searchState = '';
  // 初始化事件绑定
  var initEvent = function () {
    // 导航点击事件
    initNavTabEvent();
    //回车事件
    initSubmitEvent();
  };
  /**
   * 导航事件
   * */
  var initNavTabEvent = function () {
    //导航栏
    var tabPage = [$('.fly_time'), $('.ter_time'), $('.precision_show'),$('.uncorrect_flight'),$('.timeout_flight'),$('.inconherent_flight')]
    var nav = $('#nav');
    $('.nav li', nav).on('click', function () {
      // 更新当前nav索引
      stateIndex = $(this).index();
      // 清空警告
      clearAlert();
      $('li', nav).removeClass('active');
      $(this).addClass('active');
      //切换模块
      tabToggle(stateIndex, tabPage)
      //更新未修正航班表单时间
      if(tabPage[stateIndex] == "$('.uncorrect_flight')"){
        UncorrectFlight.setDefaultDates()
      }
    });
   
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
    if($.isValidObject(table)){
      table.unloadGrid();
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
   * 获取表单数据处理
   * */
  var handelFormData = function (fatherDom, formObj) {
    formObj.startDate = $(" .start-date-input",fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
    formObj.endDate = $(" .end-date-input",fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
    formObj.currentType = airportStatus().replace(/(^\s*)|(\s*$)/g, "");
    formObj.airportName = $( " .flight_name",fatherDom).val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
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
    $(document).keyup(function (event) {
      if (event.keyCode == 13) {
        if (stateArr[stateIndex] == 'fly') {
          FlyTimeFlight.searchBefore()
        } else if (stateArr[stateIndex] == 'ter') {
          TerminalAreaFlight.searchBefore()
        } else if (stateArr[stateIndex] == 'pre') {
          PredictionAccurancyFlight.searchBefore()
        }else if(stateArr[stateIndex] == 'uncor'){
          UncorrectFlight.searchData();
        }else if(stateArr[stateIndex] == 'out'){
          TimeOutFlight.beforeSearch()
        }else if(stateArr[stateIndex] == 'incon'){
          InconherentFlight.beforeSearch();
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
      showAlear(fatherDom, {
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
    var end = $('.end-date-input').val();
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

  /**设置开始时间
   * @method setStartdDataRange 设置其实日期范围
   * @param fatherDom 父级容器
   */
  var setStartdDataRange = function (fatherDom) {
    // 起始时间值
    var start = $(' .start-date-input',fatherDom).val();
    var reg = /\-| |:/g;
    start =start.replace(reg,'');
    // 截止时间值
    var end = $('.end-date-input',fatherDom ).val();
    end = end.replace(reg,'')
    // 截止时间前1天
    var preDay = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -1);
    // 截止时间前7天的日期值
    var day7 = $.addStringTime(end + '0000', 3600 * 1000 * 24 * -7);
    // 求得起止时间相差天数
    var diff = Math.abs($.calculateStringTimeDiff(start + '0000', end + '0000') / (1000 * 60 * 60 * 24));
    // 设置起止日期的可选开始日期
    $(' .start-date-input',fatherDom).datetimepicker('setStartDate', $.parseFullTime(day7));
    // 设置起止日期的可选结束日期
    $(' .start-date-input',fatherDom).datetimepicker('setEndDate', $.parseFullTime(end + '0000'));
    // 若截止日期小于起止日期,设置起止日期的默认选中日期为截止日期的前1天
    if (end * 1 < start * 1) {
      // 设置起止日期的默认选中日期为截止日期的前1天
      $(' .start-date-input',fatherDom).datetimepicker('setDate', $.parseFullTime(preDay));
    } else if (diff > 7) { // 若起止时间相差天数大于7天
      // 设置起止日期的默认选中日期为截止日期的前1天
      $(' .start-date-input',fatherDom).datetimepicker('setDate', $.parseFullTime(preDay));
    } else {
      // 设置起止日期的默认选中日期为当前数值(用于解决输入框数值与日历默认选中日期数值不一致的问题)
      $(' .start-date-input',fatherDom).datetimepicker('setDate', $.parseFullTime(start + '0000'));
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
      headerGroup:config.headerGroup,
      search: false,
      params: {
        caption:config.captionName,
        shrinkToFit: config.isShrinkToFit,
        rowNum: 999999,
        sortorder: config.sortorder,
        sortname: config.defaultSort,//排序列
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
            openDetailManageDialog(flightName,'fly',ids.generateTime)
          }else if(colName == '样本数'&&stateArr[stateIndex] == 'ter'){
            var flightName = table.gridTableObject.jqGrid('getGridParam')['data'][rowid - 1].allName;
            openDetailManageDialog(flightName,'ter',ids.generateTime)
          }
          if (colName == '航班号' && stateArr[stateIndex] == 'pre') {
            var data = table.gridTableObject.jqGrid('getGridParam')['data'];
            $.each(data,function (i,e) {
              if(e.flightInOId == rowid){
                var title = e.flightId;
                var flightName = e.flightInOId;
                openDetailManageDialog(title,'pre','',flightName)
              }
            })

          }
          if(colName == '航班号'&&stateArr[stateIndex] == 'out'){
            var data = table.gridTableObject.jqGrid('getGridParam')['data'];
            $.each(data,function (i,e) {
              if(e.flightInOId == rowid){
                var flightName = e.flightId;
                //按航班统计
                sessionStorage.removeItem('outDetailObj');
                sessionStorage.setItem('outDetailObj', JSON.stringify(e));
                openDetailManageDialog(flightName,'out',ids.generateTime,flightName)
              }
            })
          }
          if(colName == '航班号'&&stateArr[stateIndex] == 'incon'){
            var data = table.gridTableObject.jqGrid('getGridParam')['data'];
            $.each(data,function (i,e) {
              if(e.flightInOId == rowid){
                var flightName = e.flightId;
                sessionStorage.removeItem('inconDetailObj');
                sessionStorage.setItem('inconDetailObj', JSON.stringify(e));
                if(table.tableId == 'in-time-grid-table'){
                  openDetailManageDialog(flightName,'inconTime',ids.generateTime,flightName)
                }else{
                  openDetailManageDialog(flightName,'inconHeight',ids.generateTime,flightName)
                }
              }
            })
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
          table.export(ids.fileName);
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
      //用于解决导出是0为数值型时导出值为空
      $.each(d,function (i,e) {
        if(e == 0){
          d[i] = '0';
        }
      })
      // 将id赋予表格的rowid
      if($.isValidVariable(d.flightInOId)){
        d['id'] = d.flightInOId;
        tableMap[result[index].flightInOId] = d;
      }
      tableData.push(d);
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
      var winTitle = title + '航班详情';
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
   * @param fatherDom 当前选中的页面的Class名称
   * */
  var handleSubmitForm = function (obj, fatherDom) {
    // 清空警告
    clearAlert();
    // 清空提示
    clearTip(fatherDom);
    //校验表单;
    var validate = validateForm(obj);
    if (!validate.valid) {
      // 清空数据时间
      clearGeneratetime();
      //隐藏当前统计条件
      hideConditions();
      // 显示警告信息内容
      showAlear(fatherDom, validate);
      return false;
    } else {
      //显示当前统计条件
      if(fatherDom.selector !='.timeout_flight'){
        showConditions(obj, fatherDom);
      }
      return true;
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
      return {
        valid: false,
        mess: "请输入正确的起始时间,日期格式:YYYY-MM-DD"
      }
    }
    if (stateIndex != 2) {
      //截止时间格式校验
      var endDateValid = regexp.test(obj.endDate);
      if (!endDateValid) {
        return {
          valid: false,
          mess: "请输入正确的截止时间,日期格式:YYYY-MM-DD"
        }
      }
      // 起止时间范围校验
      var valid = validateDatesDifference();
      if (!valid) {
        return {
          valid: false,
          mess: "起止时间跨度不能超过7天"
        }
      }
    }
    // 机场名称校验
    if (obj.airportName == "") {
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
  var showAlear = function (fatherDom, validate) {
    var mess = '';
    if ($.isValidObject(validate)) {
      mess = validate.mess;
    } else if ($.isValidVariable(validate)) {
      mess = validate;
    }

    var str = '<div class="alert alert-danger alert-dismissible fade in" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
      '<p id="alert-mess">' + mess + ' </p>' +
      '</div>';
    $('.alert-container',fatherDom).empty().append(str);
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
    $(' .no-datas-tip',fatherDom ).text('').hide();
  };


  /**
   * @method showConditions 显示当前统计内容
   * @param obj 表单对象集合
   * @param state 当前页面状态
   * */
  var showConditions = function (obj, state) {
    //当前选中的类型
     if (state != $('.precision_show')&&state == $('.inconherent_flight')) {
      //航段飞行时间 终端区航路点
      $(' .conditions-start-data',state).text(obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $( ' .conditions-end-data',state).text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
      $( ' .conditions-type',state).text('机场状态:' + obj.currentType).attr('title', '机场状态: ' + obj.currentType);
      $( ' .conditions-subtype',state).text('机场名称:' + obj.airportName).attr('title', '机场名称: ' + obj.airportName);
      $(' .conditions-content',state).removeClass('hidden');
    } else if(state == $('.precision_show')) {
      // 航班航路点预测精度
      $( ' .conditions-start-data',state).text(obj.startDate).attr('title', '时间: ' + obj.startDate);
      $( ' .conditions-subtype',state).text('航班号:' + obj.airportName).attr('title', '机场名称: ' + obj.airportName);
      $( ' .conditions-content',state).removeClass('hidden');
    }
  };
  /**
   * 隐藏当前统计条件
   * */
  var hideConditions = function () {
    $('.conditions-content').addClass('hidden');
  };
  /**
   * @method updateGeneratetime 更新当前数据刷新时间
   * @param fatherDom 模块名称
   * @param time 刷新时间
   */
  var updateGeneratetime = function (fatherDom, time) {
    var timeFormatter = $.formateTime(time);
    $( ' .generate-time',fatherDom).text('数据生成时间: ' + timeFormatter);
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
    $(' .start-date-input',fatherDom).datetimepicker({
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
    $(' .end-date-input',fatherDom).datetimepicker({
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
    $(' .start-date-input',fatherDom).on('changeDate', function () {
      // 校验起止日期范围是否有效，无效则弹出警告
      validateDates(fatherDom);
    });
    $(' .end-date-input',fatherDom).on('changeDate', function () {
      // 设置起止时间输入框日历插件的可选范围及默认选中日期
      setStartdDataRange(fatherDom);
      // 校验起止日期范围是否有效，无效则弹出警告
      validateDates();
    });
  };
  /**
   * 初始化航班航路点预测精度时间选择器
   */
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
  var setDefaultDates = function (fatherDom) {
    //当前日期
    var now = $.getFullTime(new Date()).substring(0, 8);
    // 当前日期前1天
    var preDay = $.addStringTime(now + '0000', 3600 * 1000 * 24 * -1);
    //当前日期前7天
    var preSevenDay = $.addStringTime(now + '0000', 3600 * 1000 * 24 * -7);
    if($.isValidObject(fatherDom)){
      // 设置起始日期
      $('.start-date-input',fatherDom).datetimepicker('setDate', $.parseFullTime(preDay));
      $('.start-date-input',fatherDom).datetimepicker('setStartDate', $.parseFullTime(preSevenDay));
      $('.start-date-input',fatherDom).datetimepicker('setEndDate', $.parseFullTime(preDay));
      // 设置截止日期
      $('.end-date-input',fatherDom).datetimepicker('setDate', $.parseFullTime(now + '0000'));
      $('.end-date-input',fatherDom).datetimepicker('setEndDate', $.parseFullTime(now + '0000'));
    }else{
      //设置默认时间
      $('.pre-start-date-input').datetimepicker('setDate', $.parseFullTime(now + '0000'));
      $('.pre-start-date-input').datetimepicker('setEndDate', $.parseFullTime(now + '0000'));
    }
  };
  return {
    init: function () {
      // 初始化事件绑定
      initEvent();
    },
    initDatepicker:initDatepicker,//初始化时间选择器
    initAirportState:initAirportState,//按钮组状态切换
    setDefaultDates:setDefaultDates,//设置默认时间
    handelFormData:handelFormData,//获取表单内容
    alertClearData:alertClearData,//卸载表格
    handleSubmitForm:handleSubmitForm,//处理表单数据
    showTip:showTip,//展示提示
    initGridTable:initGridTable,//初始化表格
    dataConvert:dataConvert,//数据转换
    fireTableDataChange:fireTableDataChange,//绘制表格
    updateGeneratetime:updateGeneratetime,//更新当前数据时间
    showAlear:showAlear,//显示警告
    initPreDatapicker:initPreDatapicker,//初始化航班航路点预测时间选择器
    hideConditions:hideConditions,//隐藏当前查询条件
    tabToggle:tabToggle,
    clearAlert:clearAlert

  }
}();
$(document).ready(function () {
  PredictionData.init();
});