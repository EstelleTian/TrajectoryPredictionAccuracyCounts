/**
 * Created by caowei on 2018/3/19.
 */
var FlyTimeFlight = function () {
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
    var tableObj = '';
    //id集合
    var fly = {
        canvasId: 'fly-canvas',
        tableId: 'fly-grid-table',
        pagerId: 'fly-grid-pager',
        fileName:'',
        generateTime:'',
    }
    /**
     * 初始化时间选择器
     */
    var initDatepicker = function () {
        //航段飞行起飞机场点击事件状态绑定
        PredictionData.initDatepicker($('.fly_time'))
        PredictionData.setDefaultDates($('.fly_time'))
    }
    var initConditionClick = function () {
        //航段飞行起飞机场点击事件状态绑定
        PredictionData.initAirportState($('.fly_time .dep'), $('.fly_time .arr'))
        //绑定点击提交
        $('.fly-data-btn').on('click', function () {
            searchBefore()
        });
    }
    //查询钱数据处理
    var searchBefore = function () {
        $(".fly_time .no-datas-tip").hide();
        PredictionData.alertClearData(tableObj)
        //获取 表单数据
        PredictionData.handelFormData($('.fly_time'), DataForm);
        // 处理表单提交
        var isCanSearch = PredictionData.handleSubmitForm(DataForm, $('.fly_time'));
        if (isCanSearch) {
            var searchUrl = ipHost + 'module-trajectoryCorrect-service/trajectory/correct/'
            searchData(DataForm, searchUrl);
        } else {
            PredictionData.alertClearData(tableObj);
        }
    }
    /**
     *查询数据
     */
    var searchData = function (formData, searchUrl) {
        var loading = Ladda.create($('.loading-data', $('.fly_time'))[0]);
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
                        PredictionData.alertClearData(tableObj)
                        //显示提示
                        PredictionData.showTip($('.fly_time .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
                        loading.stop();
                        $('.form-wrap').removeClass('no-event');
                        return;
                    } else {
                        //保存数据生成时间
                        fly.generateTime = data.generateTime
                        //初始化航段飞行时间统计表格
                        tableDataConfig.inittableParams(tableDataConfig.flyErrorTableDataConfig);
                        //将详情页数据赋值给sessionStorage
                        sessionStorage.removeItem('flyDetailObj');
                        sessionStorage.setItem('flyDetailObj', JSON.stringify(data.infoMap));
                        fly.fileName = DataForm.startDate + DataForm.endDate + DataForm.airportName  + '航段飞行时间误差统计';
                        tableObj = PredictionData.initGridTable(tableDataConfig.flyErrorTableDataConfig, fly);
                        var convertedData = PredictionData.dataConvert(data, 'fly');
                        PredictionData.fireTableDataChange(convertedData, tableObj);
                        // 更新数据时间
                        if ($.isValidVariable(data.generateTime)) {
                            // 更新数据时间
                            PredictionData.updateGeneratetime('fly_time', data.generateTime);
                        }
                        loading.stop();
                    }
                    $('.form-wrap').removeClass('no-event');
                } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    PredictionData.showAlear($(' .fly_time '), err);
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else {
                    PredictionData.showAlear($(' .fly_time '), "查询失败");
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                }

            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
                loading.stop();
                PredictionData.hideConditions();
                PredictionData.showAlear($(' .fly_time'), "查询失败");
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
    FlyTimeFlight.init();
})