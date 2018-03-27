/**
 * Created by caowei on 2018/3/26.
 */
var InconherentFlight = function () {
    /*
     * 表单查询对象
     * */
    var DataForm = {
        startDate: '',
        endDate: '',
        state: '',
    }
    /**
     * 表格对象
     */
    var timeTableObj = '';
    var heightTableObj = '';
    //id集合
    var timeFlihgt = {
        canvasId: 'in-time-canvas',
        tableId: 'in-time-grid-table',
        pagerId: 'in-time-table-pager',
        fileName: '',
        generateTime: '',
    }
    var heightFlight = {
        canvasId: 'in-height-canvas',
        tableId: 'in-height-grid-table',
        pagerId: 'in-height-table-pager',
        fileName: '',
        generateTime: '',
    }
    /**
     * 初始化时间选择器
     */
    var initTimepicker = function () {
        PredictionData.initDatepicker($('.inconherent_flight'));
        PredictionData.setDefaultDates($('.inconherent_flight'))
    }
    /**
     * 初始化统计条件点击事件
     */
    var initConditionClick = function () {
        PredictionData.initAirportState($('.in-time-btn'), $('.in-height-btn'))
        //切换统计页面
        var pageArr = [$('.in-time-table-container'), $('.in-height-table-container')]
        $('.in-time-btn').on('click', function () {
            PredictionData.tabToggle(0, pageArr)
            PredictionData.clearAlert();
            if(timeFlihgt.generateTime!=''){
                // 更新数据时间
                PredictionData.updateGeneratetime($('.inconherent_flight'), timeFlihgt.generateTime);
            }
        })
        $('.in-height-btn').on('click', function () {
            PredictionData.tabToggle(1, pageArr)
            PredictionData.clearAlert();
            if(heightFlight.generateTime!=''){
                // 更新数据时间
                PredictionData.updateGeneratetime($('.inconherent_flight'), heightFlight.generateTime);
            }
        })
        // 查询
        $(".in-search-data-btn").on('click', function () {
            beforeSearch()
        })
    }
    /**
     * 查询前操作
     */
    var beforeSearch = function () {
        //获取 表单数据
        DataForm.state = getCaculateCondition()
        handelFormData($('.inconherent_flight'), DataForm)
        // 处理表单提交
        var isCanSearch = PredictionData.handleSubmitForm(DataForm, $('.inconherent_flight'));
        //判断当前状态是否可查询
        if (isCanSearch) {
            if (DataForm.state == 'time') {
                showSearchCondition($('.in-time-table-container'), DataForm)
                //按时间统计
                var searchUrl = ipHost + 'module-trajectoryCorrect-service/incoherent/time/'
                var url = searchUrl + DataForm.startDate.replace(/-/g, '') + '/' + DataForm.endDate.replace(/-/g, '');
                searchData(url);
            } else {
                showSearchCondition($('.in-height-table-container'), DataForm)
                //按高度统计
                var searchUrl = ipHost + 'module-trajectoryCorrect-service/incoherent/hlevel/';
                var url = searchUrl + DataForm.startDate.replace(/-/g, '') + '/' + DataForm.endDate.replace(/-/g, '');
                searchData(url);
            }
        } else {
            // 清除数据
            if ($('.in-height-table-container').hasClass('module-show')) {
                PredictionData.alertClearData(heightTableObj);
            }
            if ($('.in-time-table-container').hasClass('module-show')) {
                PredictionData.alertClearData(timeTableObj);
            }
        }
    }


    /**
     * 查询数据
     */
    var searchData = function (url) {
        var loading = Ladda.create($('.loading-data', $('.inconherent_flight'))[0]);
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
                    if ($.isValidObject(data.incFlights) || data.incFlights == 0) {
                        if ($.isEmptyObject(data.incFlights) || data.incFlights.length == 0) {
                            PredictionData.alertClearData(timeTableObj)
                            //显示提示
                            PredictionData.showTip($('.inconherent_flight .in-time-table-container .no-datas-tip'), '本次统计数据结果为空');
                            loading.stop();
                            $('.form-wrap').removeClass('no-event');
                            return;
                        } else {
                            //按时间统计
                            timeFlihgt.fileName = data.generateTime + '不连贯航班按时间统计'
                            PredictionData.alertClearData(timeTableObj)
                            setTimeTable(data)
                            //保存数据生成时间
                            timeFlihgt.generateTime = data.generateTime;
                        }
                    } else {
                        //按高度统计
                        if ($.isEmptyObject(data.incHFlights)) {
                            PredictionData.alertClearData(heightTableObj)
                            //显示提示
                            PredictionData.showTip($('.inconherent_flight .in-height-table-container .no-datas-tip'), '本次统计数据结果为空');
                            loading.stop();
                            $('.form-wrap').removeClass('no-event');
                        } else {
                            heightFlight.fileName = data.generateTime + '不连贯航班按高度统计'
                            PredictionData.alertClearData(heightTableObj)
                            setHeightTable(data)
                            //保存数据生成时间
                            heightFlight.generateTime = data.generateTime;
                        }
                    }

                    // 更新数据时间
                    if ($.isValidVariable(data.generateTime)) {
                        // 更新数据时间
                        PredictionData.updateGeneratetime($('.inconherent_flight'), data.generateTime);
                    }
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    PredictionData.showAlear($(' .in-time-table-container'), err);
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else {
                    PredictionData.showAlear($('.in-time-table-container'), "查询失败");
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                }

            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
                loading.stop();
                PredictionData.hideConditions();
                PredictionData.showAlear($(' .in-height-table-container'), "查询失败");
                $('.form-wrap').removeClass('no-event');
            }
        });
    };
    /**
     * 初始化时间表格
     * @param data
     */
    var setTimeTable = function (data) {
        tableDataConfig.inittableParams(tableDataConfig.inconherentFlight);
        timeTableObj = PredictionData.initGridTable(tableDataConfig.inconherentFlight, timeFlihgt)
        PredictionData.fireTableDataChange(data.incFlights, timeTableObj);
    }
    /**
     * 初始化高度统计表格
     * @param data
     */
    var setHeightTable = function (data) {
        tableDataConfig.inittableParams(tableDataConfig.inconherentFlight);
        heightTableObj = PredictionData.initGridTable(tableDataConfig.inconherentFlight, heightFlight)
        PredictionData.fireTableDataChange(data.incHFlights, heightTableObj);
    }
    /**
     * 获取当前统计条件
     * @returns {*}
     */
    var getCaculateCondition = function () {
        if ($('.in-time-btn').hasClass('selected')) {
            return 'time'
        } else {
            return 'height'
        }
    };

    /**
     * 显示查询条件
     * @param state
     * @param obj
     */
    var showSearchCondition = function (state, obj) {
        //时间误差过大统计条件
        if (obj.state == 'time') {
            $(' .conditions-subtype', state).text('时间').attr('title', '时间');
        } else {
            $(' .conditions-subtype', state).text('高度').attr('title', '高度');
        }
        $(' .conditions-start-data', state).text(obj.startDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
        $(' .conditions-end-data', state).text(obj.endDate).attr('title', '时间: ' + obj.startDate + '-' + obj.endDate);
        $(' .conditions-content', state).removeClass('hidden');
    }

    /*
     * 获取表单数据处理
     * */
    var handelFormData = function (fatherDom, formObj) {
        formObj.startDate = $(" .start-date-input", fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
        formObj.endDate = $(" .end-date-input", fatherDom).val().replace(/(^\s*)|(\s*$)/g, "");
    };


    return {
        init: function () {
            initTimepicker();
            initConditionClick();
        },
        beforeSearch: beforeSearch
    }
}();
$(document).ready(function () {
    InconherentFlight.init();
})