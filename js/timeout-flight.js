/**
 * Created by caowei on 2018/3/19.
 */
var TimeOutFlight = function () {
    /*
     * 表单查询对象
     * */
    var DataForm = {
        startDate: '',
        endDate: '',
        flightName: '',
        depap: '',
        arrap: '',
        state: '',
    }
    /**
     * 表格对象
     */
    var flightTableObj = '';
    var precentTableObj = '';
    //id集合
    var tiemoutFlihgt = {
        canvasId: 'out-flight-canvas',
        tableId: 'out-flight-grid-table',
        pagerId: 'out-flight-table-pager',
        fileName: '',
        generateTime: '',
    }
    var timeoutPrecent = {
        canvasId: 'out-precent-canvas',
        tableId: 'out-precent-grid-table',
        pagerId: 'out-precent-table-pager',
        fileName: '',
        generateTime: '',
    }
    /**
     * 初始化时间选择器
     */
    var initDatepicker = function () {
        PredictionData.initDatepicker($('.timeout_flight'));
        PredictionData.setDefaultDates($('.timeout_flight'))
    }
    /**
     * 初始化统计条件点击事件
     */
    var initConditionClick = function () {
        PredictionData.initAirportState($('.flight-count'), $('.precent-count'))
        //切换统计页面
        var pageArr = [$('.precent-table-container'), $('.flight-table-container')]
        $('.flight-count').on('click', function () {
            $('.out-airport-input').show()
            PredictionData.tabToggle(1, pageArr)
            PredictionData.clearAlert();
        })
        $('.precent-count').on('click', function () {
            $('.out-airport-input').hide()
            PredictionData.tabToggle(0, pageArr)
            PredictionData.clearAlert();

        })
        // 查询
        $(".timeout-data-btn").on('click', function () {
            beforeSearch()
        })
    }
    var beforeSearch = function () {
        //$(".fly_time .no-datas-tip").hide();
        //获取 表单数据
        var countState = getCaculateCondition()
        if (countState == 'flightCount') {
            handelFormData($('.timeout_flight'), DataForm);
            if (DataForm.flightName == '') {
                PredictionData.showAlear($('.flight-table-container'), {
                    valid: false,
                    mess: "请输入正确的航班号"
                })
            }
            DataForm.state = 'flightCount';
        } else {
            handelFormData($('.timeout_flight'), DataForm);
            DataForm.state = 'precentCount';
        }
        // 处理表单提交
        var isCanSearch = PredictionData.handleSubmitForm(DataForm, $('.timeout_flight'));
        //判断当前状态是否可查询
        if (isCanSearch) {
            if (countState == 'flightCount') {
                if(DataForm.flightName == ''){
                    DataForm.flightName = null;
                }
                if(DataForm.depap == ''){
                    DataForm.depap = null;
                }
                if(DataForm.arrap == ''){
                    DataForm.arrap = null;
                }
                showSearchCondition($('.flight-table-container'),DataForm)
                //按航班统计
                var searchUrl = ipHost + 'module-trajectoryCorrect-service/error/flights/statistics/'
                var url = searchUrl + DataForm.startDate.replace(/-/g, '') + '/' + DataForm.endDate.replace(/-/g, '') + '/' + DataForm.flightName + '/' + DataForm.depap + '/' + DataForm.arrap;
                searchData(url);
            } else {
                showSearchCondition($('.precent-table-container'),DataForm)
                //按比例统计
                var searchUrl = ipHost + 'module-trajectoryCorrect-service/proportion/flight/';
                var url = searchUrl + DataForm.startDate.replace(/-/g, '') + '/' + DataForm.endDate.replace(/-/g, '') 
                searchData(url);
            }
        } else {
            // 清除数据
            PredictionData.alertClearData(tableObj);
        }
    }
    /*
     * 获取表单数据处理
     * */
    var handelFormData = function (fatherDom, formObj) {
        formObj.startDate = $(" .start-date-input", fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
        formObj.endDate = $(" .end-date-input", fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
        if ($('.out-depap-airport-name').is(':visible')) {
            formObj.flightName = $(" .out-flight-name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
            formObj.depap = $('.out-depap-airport-name').val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
            formObj.arrap = $('.out-arrap-airport-name').val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    /**
     * 获取当前统计条件
     * @returns {*}
     */
    var getCaculateCondition = function () {
        if ($('.flight-count').hasClass('selected')) {
            return 'flightCount'
        } else {
            return 'precentCount'
        }
    };
    /**
     * 查询数据
     */
    var searchData = function (url) {
        var loading = Ladda.create($('.loading-data', $('.timeout_flight'))[0]);
        loading.start();
        $('.form-wrap').addClass('no-event');
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data)) {
                    // 判断数据是否为空
                    if ($.isValidObject(data.erFlights)||data.erFlights ==0) {
                        if ($.isEmptyObject(data.erFlights)||data.erFlights.length == 0) {
                            PredictionData.alertClearData(flightTableObj)
                            //显示提示
                            PredictionData.showTip($('.timeout_flight .flight-table-container .no-datas-tip'), '本次统计数据结果为空');
                            loading.stop();
                            $('.form-wrap').removeClass('no-event');
                            return;
                        } else {
                            tiemoutFlihgt.fileName = data.generateTime + '时间误差过大按航班统计'
                            PredictionData.alertClearData(flightTableObj)
                            setFlightTable(data)
                        }
                    } else {
                        //按比例统计
                        if ($.isEmptyObject(data.flights)) {
                            PredictionData.alertClearData(precentTableObj)
                            //显示提示
                            PredictionData.showTip($('.timeout_flight .precent-table-container .no-datas-tip'), '本次统计数据结果为空');
                            loading.stop();
                            $('.form-wrap').removeClass('no-event');
                        } else {
                            tiemoutFlihgt.fileName = data.generateTime + '时间误差过大按比例统计'
                            PredictionData.alertClearData(precentTableObj)
                            setPrecentTable(data)
                        }
                    }
                    //保存数据生成时间
                    tiemoutFlihgt.generateTime = data.generateTime;
                    // 更新数据时间
                    if ($.isValidVariable(data.generateTime)) {
                        // 更新数据时间
                        PredictionData.updateGeneratetime($('.timeout_flight'), tiemoutFlihgt.generateTime);
                    }
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    PredictionData.showAlear($(' .flight-table-container'), err);
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else {
                    PredictionData.showAlear($('.flight-table-container'), "查询失败");
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                }

            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
                loading.stop();
                PredictionData.hideConditions();
                PredictionData.showAlear($(' .precent-table-container'), "查询失败");
                $('.form-wrap').removeClass('no-event');
            }
        });
    };

    /***
     * 绘制按航班统计表格
     */
    var setFlightTable = function (data) {
        tableDataConfig.inittableParams(tableDataConfig.timeoutCountFlight);
        flightTableObj = PredictionData.initGridTable(tableDataConfig.timeoutCountFlight, tiemoutFlihgt)
        PredictionData.fireTableDataChange(data.erFlights, flightTableObj);
    }
    /**
     * 绘制按比例统计表格
     * @param data
     */
    var setPrecentTable = function (data) {
        tableDataConfig.inittableParams(tableDataConfig.timeoutCountPrecent);
        precentTableObj = PredictionData.initGridTable(tableDataConfig.timeoutCountPrecent, timeoutPrecent)
        precentTableObj.setGroupHead();
        precentTableObj.resizeToFitContainer();
        PredictionData.fireTableDataChange(data.flights, precentTableObj);
    }
    /**
     * 显示查询条件
     * @param state
     * @param obj
     */
    var showSearchCondition = function (state,obj) {
            //时间误差过大统计条件
            $(' .conditions-start-data',state).text(obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
            $( ' .conditions-end-data',state).text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
            $( ' .conditions-flight-name-value',state).text( obj.flightName).attr('title', '航班名称: ' + obj.flightName);
            $( ' .conditions-depap-value',state).text(  obj.depap).attr('title', '起飞机场: ' + obj.depap);
            $( ' .conditions-arrap-value',state).text(  obj.arrap).attr('title', '降落机场: ' + obj.arrap);
            $(' .conditions-content',state).removeClass('hidden');
    }
    return {
        init: function () {
            initDatepicker();
            initConditionClick();
        },
        beforeSearch:beforeSearch
    }
}()
$(document).ready(function () {
    TimeOutFlight.init();
})