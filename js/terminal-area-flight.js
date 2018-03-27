/**
 * Created by caowei on 2018/3/19.
 */
var TerminalAreaFlight = function () {
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
    /**
     * 表格对象
     */
    var tableObj = {
        top: '',
        down: ''
    };
    //id集合
    var ter = {
        top: {
            canvasId: 'ter-top-canvas',
            tableId: 'ter-top-grid-table',
            pagerId: 'ter-top-table-pager',
            captionName:'过点时间统计',
            fileName:'',
            generateTime:'',
        },
        down: {
            canvasId: 'ter-down-canvas',
            tableId: 'ter-down-grid-table',
            pagerId: 'ter-down-table-pager',
            captionName:'过点高度统计',
            fileName:'',
            generateTime:'',
        }
    };
    var initDatepicker = function () {
        PredictionData.initDatepicker($('.ter_time'));
        PredictionData.setDefaultDates($('.ter_time'))
    }
    /**
     * 初始化统计条件点击事件
     */
    var initConditionClick = function () {
        //终端区起飞机场点击事件状态绑定
        PredictionData.initAirportState($('.ter_time .dep'), $('.ter_time .arr'))
        $('.ter-data-btn').on('click', function () {
            searchBefore()

        });
    }
    //查询前数据处理
    var searchBefore = function () {
        $(".ter_time .no-datas-tip").hide();
        PredictionData.alertClearData(tableObj.top)
        PredictionData.alertClearData(tableObj.down)
        //获取 表单数据
        PredictionData.handelFormData($('.ter_time'), DataForm);
        // 处理表单提交
        var isCanSearch = PredictionData.handleSubmitForm(DataForm, $('.ter_time'));
        //
        if (isCanSearch) {
            var searchUrl = ipHost + 'module-trajectoryCorrect-service/trajectory/correct/point/'
            searchData(DataForm, searchUrl);
        } else {
            PredictionData.alertClearData(tableObj.top)
            PredictionData.alertClearData(tableObj.down)
        }
    }

    /**
     *查询数据
     */
    var searchData = function (formData, searchUrl) {
        var loading = Ladda.create($('.loading-data', $('.ter_time'))[0]);
        loading.start();
        $('.form-wrap').addClass('no-event');
        //航段飞行时间 终端区航路点 url
        var url = searchUrl + formData.startDate.replace(/-/g, '') + '/' + formData.endDate.replace(/-/g, '') + '/' + formData.airportName + '/' + formData.currentStatus + '';
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
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                // 当前数据
                if ($.isValidObject(data)) {
                    // 判断数据是否为空
                    if ($.isEmptyObject(data.map)) {
                        PredictionData.alertClearData(tableObj.top)
                        PredictionData.alertClearData(tableObj.down)
                        //显示提示
                        PredictionData.showTip($('.ter_time .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
                        loading.stop();
                        $('.form-wrap').removeClass('no-event');
                        return;
                    } else {
                        //保存数据生成时间
                        ter.top.generateTime = data.generateTime
                        ter.down.generateTime = data.generateTime
                        //初始化终端区航路点表格
                        tableDataConfig.inittableParams(tableDataConfig.terminalPointDataConfigTop);

                        ter.top.fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName + '终端区航路点' +ter.top.captionName
                        tableObj.top = PredictionData.initGridTable(tableDataConfig.terminalPointDataConfigTop, ter.top)
                        var convertedData = PredictionData.dataConvert(data, 'ter');
                        //将详情页数据赋值给sessionStorage
                        sessionStorage.removeItem('terDetailObj');
                        sessionStorage.setItem('terDetailObj', JSON.stringify(data.infoMap));
                        PredictionData.fireTableDataChange(convertedData, tableObj.top);
                        
                        tableDataConfig.inittableParams(tableDataConfig.terminalPointDataConfigDown);
                        ter.down.fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName + '终端区航路点' +ter.down.captionName
                        tableObj.down = PredictionData.initGridTable(tableDataConfig.terminalPointDataConfigDown, ter.down)
                        PredictionData.fireTableDataChange(convertedData, tableObj.down);
                        // 更新数据时间
                        if ($.isValidVariable(data.generateTime)) {
                            // 更新数据时间
                            PredictionData.updateGeneratetime($('.ter_time'), data.generateTime);
                        }
                        loading.stop();
                    }
                    $('.form-wrap').removeClass('no-event');
                } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    PredictionData.showAlear($(' .ter_time'), err);
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else {
                    PredictionData.showAlear($(' .ter_time'), "查询失败");
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                }

            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
                loading.stop();
                PredictionData.hideConditions();
                PredictionData.showAlear($(' .ter_time'), "查询失败");
                $('.form-wrap').removeClass('no-event');
            }
        });
    }

    return {
        init: function () {
            initDatepicker();
            initConditionClick();
        },
        searchBefore: searchBefore
    }
}()
$(document).ready(function () {
    TerminalAreaFlight.init();
})