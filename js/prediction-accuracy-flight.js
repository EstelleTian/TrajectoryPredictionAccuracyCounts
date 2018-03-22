/**
 * Created by caowei on 2018/3/19.
 */
var PredictionAccurancyFlight = function () {
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
    var pre = {
        canvasId: 'pre-canvas',
        tableId: 'pre-grid-table',
        pagerId: 'pre-table-pager',
        fileName:'',
        generateTime:'',
    }
    //初始化时间选择器
    var initDatePciker = function () {
        PredictionData.initPreDatapicker();
        PredictionData.setDefaultDates()
    }
    //初始化点击查询事件
    var initSearchClick = function () {
        $('.pre-data-btn').on('click', function () {
            searchBefore()
        });
    }
    //查询之前的数据处理
    var searchBefore = function () {
        $(".precision_show .no-datas-tip").hide();
        PredictionData.alertClearData(tableObj)
        //获取 表单数据
        getFormData(DataForm);
        // 处理表单提交
        var isCanSearch = PredictionData.handleSubmitForm(DataForm, $('.precision_show'));
        if (isCanSearch) {
            var searchUrl = ipHost + 'module-trajectoryCorrect-service/trajectory/flight/'
            searchData(DataForm, searchUrl);
        } else {
            PredictionData.alertClearData(tableObj);
        }
    }
    var searchData = function (formData,searchUrl) {
        var loading = Ladda.create($('.loading-data',$('.precision_show'))[0]);
        loading.start();
        var url =  searchUrl + formData.startDate.replace(/-/g,'') + '/' + formData.airportName;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, xhr) {
                if ($.isValidObject(data)) {
                    // 判断数据是否为空
                    if ($.isEmptyObject(data.flights)) {
                        PredictionData.alertClearData(tableObj)
                        //显示提示
                        PredictionData.showTip($('.precision_show .charts-wrap .no-datas-tip'), '本次统计数据结果为空');
                        loading.stop();
                        $('.form-wrap').removeClass('no-event');
                        return;
                    } else {
                        //航班航路点预测精度
                        tableDataConfig.inittableParams(tableDataConfig.precisionTableDataConfig);
                        pre.fileName = DataForm.startDate + DataForm.airportName + '航班航路点预测精度';
                        tableObj = PredictionData.initGridTable(tableDataConfig.precisionTableDataConfig, pre)
                        PredictionData.fireTableDataChange(data.flights, tableObj)
                        // 更新数据时间
                        if ($.isValidVariable(data.generateTime)) {
                            // 更新数据时间
                            PredictionData.updateGeneratetime('precision_show', data.generateTime);
                        }
                        loading.stop();
                    }
                    $('.form-wrap').removeClass('no-event');
                } else if ($.isValidObject(data) && $.isValidVariable(data.status) && '500' == data.status) {
                    var err = "查询失败:" + data.error;
                    PredictionData.showAlear($(' .precision_show '), err);
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                } else {
                    PredictionData.showAlear($(' .precision_show '), "查询失败");
                    loading.stop();
                    $('.form-wrap').removeClass('no-event');
                }
            },
            error: function (xhr, status, error) {
                console.error('Search data failed');
                console.error(error);
                loading.stop();
                PredictionData.hideConditions();
                PredictionData.showAlear($(' .precision_show '), "查询失败");
                $('.form-wrap').removeClass('no-event');
            }

        })
    }

    //获取表单参数
    var getFormData = function (formObj) {
        formObj.startDate = $(".pre-start-date-input").val().replace(/(^\s*)|(\s*$)/g, "");
        formObj.airportName = $(".pre_airport_Name").val().toUpperCase().replace(/(^\s*)|(\s*$)/g, "");
        return formObj;
    }
    return {
        init: function () {
            initDatePciker();
            initSearchClick();
        },
        searchBefore:searchBefore
    }
}()
$(document).ready(function () {
    PredictionAccurancyFlight.init()
})
