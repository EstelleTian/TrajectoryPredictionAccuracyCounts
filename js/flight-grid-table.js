/**
 * 航班计划表格组件
 *
 * @param params
 * @constructor
 */
function FlightGridTable(params) {
    // 检查参数有效性
    if (!$.isValidObject(params)) {
        return;
    }

    /**
     * 表格所在容器ID
     */
    this.canvasId = params.canvasId;

    /**
     * 表格所在容器jQuery对象
     */
    this.canvas = {};

    /**
     * 表格元素ID
     */
    this.tableId = params.tableId;

    /**
     * 表格元素jQuery对象
     */
    this.table = {};

    /**
     * 表格元素PagerID
     */
    this.pagerId = params.pagerId;

    /**
     * 表格jqGrid对象
     */
    this.gridTableObject = {};

    /**
     * 列所有名称
     */
    this.colNames = params.colNames;

    /**
     * 列属性
     */
    this.colModel = params.colModel;

    /**
     * 列属性模板
     */
    this.cmTemplate = params.cmTemplate;

    /**
     * 列显示名称
     */
    this.colDisplay = params.colDisplay;

    /**
     * 列显示提示信息
     */
    this.colTitle = params.colTitle;

    /**
     * 列样式配置
     */
    this.colStyle = params.colStyle;

    /**
     * 列编辑开放配置
     */
    this.colEdit = params.colEdit;

    /**
     * 列操作权限
     */
    this.colAuthority = params.colAuthority;

    /**
     * 列操作url
     */
    this.colCollaborateUrl = params.colCollaborateUrl;

    /**
     * 列数据转换工具
     */
    this.colConverter = params.colConverter;

    /**
     * jqGrid表格原生配置项
     */
    this.params = params.params;

    /**
     * 数据-原始数据
     */
    this.data = {};

    /**
     * 数据-表格显示数据（Array）
     */
    this.tableData = [];

    /**
     * 数据-表格显示数据（Map）
     */
    this.tableDataMap = {};

    /**
     * 自动滚动
     */
    this.autoScroll = params.autoScroll;

    /**
     * 回调方法-选中单行
     */
    this.onSelectRow = params.onSelectRow;

    /**
     * 回调方法-更新单个数据
     */
    this.afterCollaborate = params.afterCollaborate;

    /**
     * 数据-基础数据：如列操作需要的数据
     */
    this.baseData = params.baseData;

    /**
     * 批量选择列,选中行的ID集合
     */
    this.multiOptSelectedIdsArr = [];

    /**
     * 高级搜索的重置和查找按钮是否绑定了事件，避免重复绑定
     */
    this.advanceFilterFlag = false;
    this.scrollObj = {
        lastTop: 0,
        lastLeft: 0,
        finish: false
    };
    /**
     * 冻结列高度（用以处理冻结列和滚动条中间缝隙）
     */
    this.frozenHeight = 0;
}

/**
 * 常量-当前选择单元格类名
 */
FlightGridTable.SELECTED_CELL_CLASS = 'flight-grid-table-current-select-cell';

/**
 * 常量-协调元素类名
 */
FlightGridTable.COLLABORATE_DOM_CLASS = 'flight-grid-table-collaborate-container';

/**
 * 表格初始化
 */
FlightGridTable.prototype.initGridTableObject = function () {
    // 当前对象this代理
    var thisProxy = this;
    // 转换列名称配置
    var colNames = thisProxy.convertColNames();
    // 转换列属性配置
    var colModel = thisProxy.convertColModel();
    // 转换列标题配置
    var colTitle = thisProxy.convertColTitle();
    // 转换列样式配置
    thisProxy.convertColStyle();
    // 容器jQuery对象
    thisProxy.canvas = $('#' + thisProxy.canvasId);
    // 表格jQuery对象
    thisProxy.table = $('#' + thisProxy.tableId);
    // 初始化jqGrid默认参数
    var gridTableOptions = {
        // 单独使用bootstrap样式，或通过全局设置$.jgrid.defaults.styleUI = 'Bootstrap';
        styleUI: 'Bootstrap',
        // 列名称
        colNames: thisProxy.convertColNames(),
        // 列Model
        colModel: thisProxy.convertColModel(),
        // 列Model模板
        cmTemplate: thisProxy.cmTemplate,
        // 数据类型
        datatype: 'local',
        // 单次显示数据行数
        rowNum: 999999999,
        // 是否显示行号
        rownumbers: true,
        // 行号列宽(px)
        //rownumWidth: 25,
        // 是否显示表头信息
        headertitles: true,
        // 是否初始化时自适应容器宽度
        //autowidth: true,
        // 是否列宽根据所在容器宽度自适应
        shrinkToFit: false,
        // 定义工具栏，须是有效的html元素
        pager: this.pagerId ? '#' + this.pagerId : "",
        // 定义工具栏是否显示翻页键
        pgbuttons: false,
        // 定义工具栏是否显示页数输入框
        pginput: false,
        // 定义导航栏是否显示记录数
        viewrecords: true,
        gridview: true,
        // 是否支持通过checkbox进行行多选（支持多选，但默认不开启）此处不设置为true,默认为false，在实例参数中设置此参数
        //multiselect: true,
        // 是否限制仅通过checkbox进行行多选（在“伪”关闭多选模式时开启，默认“伪”关闭）
        multiboxonly: true,
        // 绑定左键单击事件
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            thisProxy.onCellSelect(rowid, iCol, cellcontent, e);
        },
        // 绑定左键选中行事件
        onSelectRow: function (rowid, status, e) {
            if (undefined != thisProxy.onSelectRow && typeof(thisProxy.onSelectRow) == 'function') {
                //若选中多选框，阻止冒泡
                if( $(e.target).hasClass("cbox") ){
                    e.stopPropagation();
                }else{
                    thisProxy.onSelectRow(rowid, status, e);
                }

            }
        },
        // 绑定右键单击事件
        onRightClickRow: function (rowid, iRow, iCol, e) {
            thisProxy.onRightClickRow(rowid, iRow, iCol, e);
        }
    };
    // 追加jqGrid自定义参数
    if (thisProxy.params != undefined && thisProxy.params != null) {
        for (var key in thisProxy.params) {
            gridTableOptions[key] = thisProxy.params[key];
        }
    }
    // 初始化jqGrid
    thisProxy.gridTableObject = thisProxy.table.jqGrid(gridTableOptions);

    // 初始化jqGrid Pager
    thisProxy.gridTableObject.jqGrid('navGrid', '#' + thisProxy.pagerId, {
        add: false,
        edit: false,
        view: false,
        del: false,
        search: false,
        refresh: false
    });


    // 初始化jqGrid Pager自定义按钮
    // this.gridTableObject.jqGrid('navGrid', '#' + this.pagerId).navButtonAdd('#' + this.pagerId, {
    //     // 批量锁定
    //     id: this.pagerId + '-multi-lock',
    //     caption: '',
    //     title: '批量指定',
    //     buttonicon: 'glyphicon glyphicon-lock',
    //     onClickButton: function () {
    //     },
    //     position: 'first'
    // });
    // // 初始化jqGrid Pager自定义按钮批量指定操作
    // $('#' + this.pagerId + '-multi-lock').popover({
    //     title: '批量指定',
    //     trigger: 'click',
    //     html: true,
    //     container: 'body',
    //     content: function () {
    //         return thisProxy.buildFlightMultiLockContent();
    //     }
    // });
    // $('#' + this.pagerId + '-multi-lock').on('shown.bs.popover', function () {
    //     thisProxy.buildFlightMultiLockEvent();
    // });
    // 隐藏jqGrid Pager中间翻页区域，释放空间给左侧工具栏
    this.canvas.find('.ui-paging-pager').parent().hide();


    // 初始化快速过滤工具栏
    thisProxy.gridTableObject.jqGrid('filterToolbar', {
        // 是否开启Enter后查询
        searchOnEnter: false,
        // 是否开启查询逻辑选择
        searchOperators: false,
        afterSearch: function () {
            if( thisProxy.params.hasOwnProperty("afterSearchCallBack") && undefined != thisProxy.params.afterSearchCallBack){
                thisProxy.params.afterSearchCallBack();
            }
            thisProxy.clearCollaborateContainer();
        }
    });
    // 隐藏过滤工具栏的X清空过滤条件按钮
    thisProxy.canvas.find('.ui-search-clear').hide();
    // 隐藏快速过滤（默认）
    if (!thisProxy.params.showQuickFilter) {
        thisProxy.gridTableObject[0].toggleToolbar();
    }

    // 初始化自定义标题提示
    thisProxy.fireHeaderTitleChange(colTitle);

    // 绑定Canvas事件，屏蔽表格区域内浏览器右键菜单
    thisProxy.canvas.bind('mouseenter', function () {
        document.oncontextmenu = function () {
            return false;
        };
    }).bind('mouseleave', function () {
        document.oncontextmenu = function () {
            return true;
        };
    }).bind('mouseover', function () {
        document.oncontextmenu = function () {
            return false;
        };
    });

    // 绑定Window事件，窗口变化时重新调整表格大小
    $(window).resize(function () {
        thisProxy.resizeToFitContainer();
        thisProxy.frozenHeight = $('#'+thisProxy.tableId+'_frozen').parent().height();
        thisProxy.resizeFrozenTable();
    });
    // 默认关闭开启支持多选模式(有multiselect参数且为true即为支持多选模式)
    if(thisProxy.params.multiselect == true){
        thisProxy.showMultiSelectModel(false);
    }

    ////清除冻结列
    //thisProxy.gridTableObject.jqGrid("destroyFrozenColumns");
    //thisProxy.gridTableObject.jqGrid("setFrozenColumns");
    //批量撤销--CDM独有 CRS无
    //thisProxy.addMultiSelectToHeader();
    //thisProxy.checkedMultiOperate();
    // 初始化完成时，使按照所在容器调整表格大小
    thisProxy.resizeToFitContainer();
};
//在批量操作列前添加全选checkbox按钮
FlightGridTable.prototype.addMultiSelectToHeader = function(){
    var thisProxy = this;
    //添加全选/取消全选复选框
    var str = '<input type="checkbox"  id="ckb-selectAll">';
    var idStr = '.frozen-div #jqgh_'+ thisProxy.tableId + '_MULTI_OPERATE';
    var ckbStr = '#'+thisProxy.tableId + '_MULTI_OPERATE'+' #ckb-selectAll';
    if($(ckbStr).length > 0){
        return ; //如果已经存在,则不追加
    }

    $(str).insertBefore( idStr );
    $(idStr).css({textAlign: 'left'});
    //全选/取消全选复选框点击事件
    $("#"+ thisProxy.tableId +"_MULTI_OPERATE #ckb-selectAll").attr('title','全选/取消全选').off("click").on('click',function(e){
        var bool = $(this).prop('checked');
        thisProxy.multiOptSelectedIdsArr = [];
        if(bool){//勾选
            //填充所有勾选的数据ID到批量选中数据id值集合
            $( "#" + thisProxy.tableId + "_frozen .clear-locked-time").each(function(){
                var $this = $(this);
                $this.prop('checked',true);
                thisProxy.multiOptSelectedIdsArr.push( $this.attr("id").substring(6) );
            });
        }else{//取消勾选
            $( "#" + thisProxy.tableId + "_frozen .clear-locked-time").prop('checked',false);
        }
        e.stopPropagation();
    });
};
//批量选中数据ID集合添加或删除数据
FlightGridTable.prototype.multiOptSelectedIdsArrChange = function(data){
    var id = data.attr("id").substring(6);//获取该数据的ID
    if (data.prop('checked') == true) {
        if (this.multiOptSelectedIdsArr.indexOf(id) == -1) {
            this.multiOptSelectedIdsArr.push(id);//如果是勾选,且数组multiOptSelectedIdsArr中无该ID,添加到数组中
            if( $("#" + this.tableId + "_frozen .clear-locked-time").length == this.multiOptSelectedIdsArr.length ){
                $("#ckb-selectAll").prop('checked', true);
            }else{
                $("#ckb-selectAll").prop('checked', false);
            };
        }
    } else {
        this.multiOptSelectedIdsArr.splice(this.multiOptSelectedIdsArr.indexOf(id), 1);//否则从数组multiOptSelectedIdsArr中删除该ID
        //取消全选复选框的勾选
        if($("#ckb-selectAll").prop('checked')){
            $("#ckb-selectAll").prop('checked',false);
        }
    }
};
//根据批量数组中的值选中表格的checkbox
FlightGridTable.prototype.checkedMultiOperate = function(){
    //若选中数组有值，根据选中值选中数据
    var len = this.multiOptSelectedIdsArr.length;
    if( len > 0 ){
        for(var i = 0; i < len; i++){
            var fid = this.multiOptSelectedIdsArr[i];
            $("#" + this.tableId + "_frozen #clear-" + fid ).prop("checked", true);
        }
        if( $("#" + this.tableId + "_frozen .clear-locked-time").length == len ){
            $("#ckb-selectAll").prop('checked', true);
        }else{
            $("#ckb-selectAll").prop('checked', false);
        };
    }
};
//批量撤销
FlightGridTable.prototype.multiClearSubmitFunc = function(){
    var thisProxy = this;
    //尚未选择航班对话框
    var openInvalidFlightModal = function(){
        var opt = {
            title: '尚未选择航班',
            content: '请在批量操作列中选择一条或多条航班',
            status: 2,
            showCancelBtn: false,
            pattern: "sm",
            mtop: 300,
            buttons: [
                {
                    name: "确定",
                }
            ]
        };
        BootstrapDialogFactory.dialog(opt);
    };

    //批量撤销提交回调方法
    var multiClearSubmitDataFunc = function(parameter){
        $.ajax({
            url: DialogUrlUtils.flowcontrol.flight_multi_cobt_clear_url,
            traditional: true,
            type: 'POST',
            data: parameter,
            dataType: 'json',
            success: function (data, status, xhr) {
                if(!$.isValidVariable(data)){
                    $("body").hideProgress( "批量撤销失败" );
                    //提示框
                    var opt = {
                        title: '失败',
                        content: '批量撤销失败',
                        status: 3,
                        showCancelBtn: false,
                        pattern: "sm",
                        mtop: 300,
                        buttons: [
                            {
                                name: "确定",
                            }
                        ]
                    };
                    BootstrapDialogFactory.dialog(opt);
                    $("body").hideProgress( "" );
                }else {
                    if(data.status == 200){
                        //更新批量撤销的数据
                        var flights = data.flights;
                        thisProxy.fireFlightGridTableMultiDataChange(flights);
                        $("body").hideProgress( "批量撤销成功" );
                        //取消全选复选框的勾选
                        if($("#ckb-selectAll").prop('checked')){
                            $("#ckb-selectAll").prop('checked',false);
                        }
                        //提示框
                        var opt = {
                            title: '成功',
                            content: '批量撤销成功',
                            status: 1,
                            showCancelBtn: false,
                            pattern: "sm",
                            mtop: 300,
                            buttons: [
                                {
                                    name: "确定",
                                }
                            ]
                        };
                        BootstrapDialogFactory.dialog(opt);
                    }else if(data.status == 400){//存在不符合条件的数据
                        $("body").hideProgress( "批量撤销失败" );
                        var err = data.error.message;
                        var invalid = parseInvalidDatas(data);
                        var contentStr = '<div class="multi-clear-fail">'+
                            '<p>'+err+'</p>'+invalid.info+
                            '<div class="checkbox auto-deselect-container"><label>' +
                            '<input type="checkbox" class="auto-deselect" name="autodDeselect" value="2">自动去除不符合的数据</label></div><div>' +
                            '</div>';
                        var params = {
                            title: '警告',
                            content: contentStr,
                            status: 2,
                            showCancelBtn: false,
                            mtop: 300,
                            buttons: [
                                {
                                    name: "再次提交",
                                    className: 'submit-again',
                                    callback: function () {
                                        var autoDeselect = $('.auto-deselect').prop('checked');
                                        if(autoDeselect){
                                            var invalidID = invalid.ids;
                                            var len = invalid.ids.length;
                                            for(var i=0; i<len; i++){
                                                var index = thisProxy.multiOptSelectedIdsArr.indexOf(invalidID[i]);
                                                if(index != -1){
                                                    thisProxy.multiOptSelectedIdsArr.splice(index,1);
                                                    $("#" + thisProxy.tableId + "_frozen #clear-" + invalidID[i] ).prop('checked',false);//取消勾选
                                                    //取消全选复选框的勾选
                                                    if($("#ckb-selectAll").prop('checked')){
                                                        $("#ckb-selectAll").prop('checked',false);
                                                    }
                                                }
                                            }
                                            if ( thisProxy.multiOptSelectedIdsArr.length <= 0) {
                                                //打开尚未选择航班对话框
                                                openInvalidFlightModal();
                                            }else {
                                                $("body").showProgress("批量撤销中...");
                                                var params = {
                                                    ids: thisProxy.multiOptSelectedIdsArr,
                                                    comment: parameter.comment
                                                };
                                                multiClearSubmitDataFunc(params);
                                            }
                                        };
                                    }
                                },
                                {
                                    name: "返回修改",
                                    status: -1
                                }
                            ]
                        };
                        BootstrapDialogFactory.dialog(params);
                        //再次提交不可用
                        var sub = $('.submit-again');
                        sub.attr('disabled','disabled').css({"background": "#eee","color": "#999","cursor": "not-allowed"});
                        //自动去除复选框点击事件
                        $('.auto-deselect').on('click',function(){
                            if($(this).prop('checked')){
                                sub.removeAttr('disabled').css({"background": "#26a69a","color": "#ffffff","cursor": "pointer"});
                            }else {
                                sub.attr('disabled','disabled').css({"background": "#eee","color": "#999","cursor": "not-allowed"});
                            }
                        })

                    }else if(data.status == 500){
                        $("body").hideProgress( "批量撤销失败" );
                        var error_message = data.error.message;
                        //提示框
                        var opt = {
                            title: '失败',
                            content: error_message,
                            status: 3,
                            showCancelBtn: false,
                            pattern: "sm",
                            mtop: 300,
                            buttons: [
                                {
                                    name: "确定",
                                }
                            ]
                        };
                        BootstrapDialogFactory.dialog(opt);
                        $("body").hideProgress( "" );
                    }
                }

            },
            error: function (xhr, status, error) {
                console.error('clear cobt data failed, state: ');
                console.error(error);
            },
            complete: function (xhr, status) {
                xhr = null
            }
        });


    };

    //解析错误信息
    var parseInvalidDatas = function(obj){
        /**
         * 无效航班集合
         * **/
        var invalidFlightObj = {
            en: ['invalidCRSFlights','invalidFMEFlights','invalidCNLFlights','invalidDEPFlights','invalidFPLFlights'],
            cn: ['CRS航班','不包含FME信息的航班','已取消航班','已起飞航班','未发报航班']
        };
        var result = {
            info : '',
            ids : []
        };
        var invalidObj = {};
        var str = '';
        //转为中文
        for(var k in obj){
            var index = invalidFlightObj.en.indexOf(k);
            if(index !=-1){
                var val = obj[k];
                var type = invalidFlightObj.cn[index];
                invalidObj[type] = [];
                for(var i in val){
                    if(i){
                        var id = val[i].flightId;
                        invalidObj[type].push(id);
                        result.ids.push(i);
                    }
                }
            }
        }

        for(var i in invalidObj){
            var len = invalidObj[i].length;
            if(len> 0){
                str +='<p>'+ i +':' + invalidObj[i].join(',')+'</p>';
            }
        }
        result.info = str;
        return result;
    };

    if ( thisProxy.multiOptSelectedIdsArr.length <= 0) {
        openInvalidFlightModal();
    } else {
        var contentStr = '<form class="row">'
            + '<span class="col-xs-12">备注</span>'
            + '<textarea class="col-xs-11 multi-clear-comment" name="comment" rows="3" cols="30" placeholder="不超过50个字" maxlength="50" ></textarea>'
            + '</div>'
            + '</form>';
        var params = {
            title: '批量撤销',
            content: contentStr,
            status: 1,
            showCancelBtn: false,
            pattern: "sm",
            mtop: 300,
            buttons: [
                {
                    name: "提交",
                    callback: function () {
                        $("body").showProgress("批量撤销中...");
                        var params = {
                            ids: thisProxy.multiOptSelectedIdsArr,
                            comment: $(".multi-clear-comment").val()
                        };
                        //提交
                        multiClearSubmitDataFunc(params);
                    }
                },
                {
                    name: "返回",
                    status: -1
                }
            ]
        };
        BootstrapDialogFactory.dialog(params);
    }

};
//批量操作上相关监听
FlightGridTable.prototype.handleMultiColCheckbox = function(){
    var thisProxy = this;
    //批量复选框监听事件
    $('#' + thisProxy.tableId).on('click', '.clear-locked-time', function (e) {//点击事件
        var $this = $(this);
        thisProxy.multiOptSelectedIdsArrChange($this);
    });
};
/**
 * 调整表格大小以适应所在容器
 */
FlightGridTable.prototype.resizeToFitContainer = function () {
    GridTableUtil.resizeToFitContainer(this.tableId);
};

/**
 * 判断是否启动多选模式
 *
 * @returns {boolean}
 */
FlightGridTable.prototype.isMultiSelectModel = function () {
    if ($.isValidObject(this.gridTableObject)) {
        // 判断多选模式下，数据选择模式
        return !this.gridTableObject.jqGrid('getGridParam', 'multiboxonly');
    }
};

/**
 * 启动或关闭多选模式
 *
 * @param isShow 是否显示
 */
FlightGridTable.prototype.showMultiSelectModel = function (isShow) {
    //清除冻结列
    this.gridTableObject.jqGrid("destroyFrozenColumns");
    // 判断是否传入显示控制值
    if (isShow == true) {
        // 要求开启
        this.gridTableObject.jqGrid('setGridParam', {multiboxonly: false}).jqGrid('showCol', 'cb');
        $('#' + this.pagerId).show();
    } else if (isShow == false) {
        // 要求关闭
        this.gridTableObject.jqGrid('setGridParam', {multiboxonly: true}).jqGrid('hideCol', 'cb').jqGrid('resetSelection');
        $('#' + this.pagerId).hide();
    } else {
        // 无要求根据当前状态进行切换
        // 判断当前表格是否进入了多选模式
        if (this.isMultiSelectModel()) {
            // 已进入，关闭多选
            this.gridTableObject.jqGrid('setGridParam', {multiboxonly: true}).jqGrid('hideCol', 'cb').jqGrid('resetSelection');
            $('#' + this.pagerId).hide();
        } else {
            // 未进入，开启多选
            this.gridTableObject.jqGrid('setGridParam', {multiboxonly: false}).jqGrid('showCol', 'cb');
            $('#' + this.pagerId).show();
        }
    }
    // 重新调整表格大小以使用所在容器
    this.resizeToFitContainer();
    //激活冻结列
    this.gridTableObject.jqGrid("setFrozenColumns");
    //重算高度
    this.frozenHeight = $('#'+this.tableId+'_frozen').parent().height() - 2;
    //滚动条到和主表同步位置
    var $bdiv = $('div.ui-jqgrid-bdiv', this.canvas);
    $bdiv.scrollTop($bdiv.scrollTop());
    this.resizeFrozenTable();
};

/**
 * 显示/隐藏快速过滤工具条
 */
FlightGridTable.prototype.showQuickFilter = function () {
    // 清空过滤条件
    this.gridTableObject[0].clearToolbar();
    // 切换显示
    this.gridTableObject[0].toggleToolbar();
    // 隐藏清空条件的x
    this.canvas.find('.ui-search-clear').hide();
    //清除冻结列
    this.gridTableObject.jqGrid("destroyFrozenColumns");
    //激活冻结列
    this.gridTableObject.jqGrid("setFrozenColumns");
    // 自适应
    this.resizeToFitContainer();
    this.frozenHeight = $('#'+this.tableId+'_frozen').parent().height();
    this.resizeFrozenTable();

};
//调整冻结列高度
FlightGridTable.prototype.resizeFrozenTable = function(){
    var frozenDom = $('#'+this.tableId+'_frozen').parent();
    frozenDom.height( this.frozenHeight + 6 + 'px');


};
/**
 * 显示高级查询对话框
 */
FlightGridTable.prototype.showAdvanceFilter = function () {
    // 代理
    var thisProxy = this;
    // 给表格对象绑定查询操作
    thisProxy.gridTableObject.jqGrid("searchGrid", {
        sopt: ['cn', 'nc', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en'],
        caption: "高级查询",
        multipleSearch: true,
        multipleGroup: true,
        searchOnEnter: true,
        closeOnEscape: true,
        resize: false,
        zIndex: 1004,
        width: 600
    });
    if (!thisProxy.advanceFilterFlag) {
        var callback = function () {
            thisProxy.gridTableObject.jqGrid('setGridParam', {data: thisProxy.tableData}).trigger('reloadGrid');

        }
        $("#fbox_" + thisProxy.tableId + "_reset").off("click", callback).on("click", callback);
        $("#fbox_" + thisProxy.tableId + "_search").off("click", callback).on("click", callback);
        thisProxy.advanceFilterFlag = true;
    }
};

/**
 * 左键单击事件
 *
 * @param rowid
 * @param iCol
 * @param cellcontent
 * @param e
 */
FlightGridTable.prototype.onCellSelect = function (rowid, iCol, cellcontent, e) {
    // 清除单元格样式
    this.clearCollaborateContainer();
};

/**
 * 右键单击事件
 *
 * @param rowid
 * @param iRow
 * @param iCol
 * @param e
 */
FlightGridTable.prototype.onRightClickRow = function (rowid, iRow, iCol, e) {
    // 代理
    var thisProxy = this;
    var opts = {
        rowid : rowid,
        iRow : iRow,
        iCol : iCol
    };
    // 清除单元格样式
    this.clearCollaborateContainer();
    // 获取单元格colModel对象
    var colModel = this.gridTableObject.jqGrid('getGridParam')['colModel'][iCol];
    // 获取触发事件的单元格对象
    var cellObj = $(e.target);
    // 记录当前选中的单元格对象
    cellObj.addClass(FlightGridTable.SELECTED_CELL_CLASS);

    //预留时隙协调
    var slotVal = cellObj.data("slot");
    if($.isValidVariable(slotVal)){
        thisProxy.reserveTimeSlotCoordination( cellObj, slotVal, opts );
    };
    // 获取航班计划
    var flight = this.data.result[rowid];
    if(!flight){
    	return null;
    }
    // 可交互标记
    var collaborateFlag = true;
    // 交互限制条件 0未起飞，1预起飞，2已起飞，3已落地，4延误，5返航备降，6CNL
    // 状态为空或不等于1或4或未发FPL,CHG,DLA 给出提示
    if (!$.isValidVariable(flight.fmeToday.status)
        || (flight.fmeToday.status != FmeToday.STATUS_SCH && flight.fmeToday.status != FmeToday.STATUS_FPL && flight.fmeToday.status != FmeToday.STATUS_DLA)
        || !FmeToday.hadFPL(flight.fmeToday)) {
        collaborateFlag = false;
        if (colModel.name == 'RUNWAY'
            || colModel.name == 'DEICE_POSITION'
            || colModel.name == 'DEICE_STATUS'
            || colModel.name == 'DEICE_GROUP'
            || colModel.name == 'AGCT'
            || colModel.name == 'ASBT'
            || colModel.name == 'AOBT'
            || colModel.name == 'POSITION'
            || colModel.name == 'TOBT'
            || colModel.name == 'HOBT'
            || colModel.name == 'COBT'
            || colModel.name == 'CTOT'
            || colModel.name == 'PRIORITY') {
            if (flight.fmeToday.status == FmeToday.STATUS_CNL || FmeToday.isPCancel(flight.fmeToday)) {
                thisProxy.showTableCellTipMessage(opts, 'WARN', '航班已经取消');
            } else if (flight.fmeToday.status == FmeToday.STATUS_ARR) {
                thisProxy.showTableCellTipMessage(opts, 'WARN', '航班已经落地');
            } else if (flight.fmeToday.status == FmeToday.STATUS_DEP) {
                thisProxy.showTableCellTipMessage(opts, 'WARN', '航班已经起飞');
            } else if (flight.fmeToday.status == FmeToday.STATUS_RTN_CPL) {
                thisProxy.showTableCellTipMessage(opts, 'WARN', '航班已经返航或备降');
            } else if (!FmeToday.hadFPL(flight.fmeToday) && colModel.name !== 'TOBT') {
                thisProxy.showTableCellTipMessage(opts, 'WARN', '航班尚未拍发FPL报');
            }
            return;
        }
    }
    // FLIGHTID协调
    if (colModel.name == 'FLIGHTID') {
        this.collaborateFlightid(rowid, iRow, iCol, cellObj, collaborateFlag);
    }
    // PRIORITY协调
    if (colModel.name == 'PRIORITY') {
        this.collaboratePriority(rowid, iRow, iCol, cellObj);
    }
    // TOBT协调
    if (colModel.name == 'TOBT') {
        this.collaborateTobt(rowid, iRow, iCol, cellObj);
    }
    // HOBT协调
    if (colModel.name == 'HOBT') {
        this.collaborateHobt(rowid, iRow, iCol, cellObj);
    }
    // 推出时间
    if (colModel.name == 'AOBT') {
        this.collaborateAobt(rowid, iRow, iCol, cellObj);
    }
    // ASBT协调
    if (colModel.name == 'ASBT') {
        this.collaborateAsbt(rowid, iRow, iCol, cellObj);
    }
    // AGCT协调
    if (colModel.name == 'AGCT') {
        this.collaborateAgct(rowid, iRow, iCol, cellObj);
    }
    // COBT协调
    if (colModel.name == 'COBT') {
        this.collaborateCobt(rowid, iRow, iCol, cellObj);
    }
    // CTD协调
    if (colModel.name == 'CTOT') {
        //如果有前段航班号且不为空 20170901 应需求注释掉该逻辑
        //if( flight.hasOwnProperty("formerFlightid") && "" != flight.formerFlightid ){
        //    //判断前段航班状态
        //    var flightStatus =  flight.status;
        //    switch( flightStatus ){
        //        case FlightCoordination.STATUS_FORMER_SCH: // 前段计划
        //        case FlightCoordination.STATUS_FORMER_CNL: // 前段取消
        //        case FlightCoordination.STATUS_FORMER_FPL: // 前段准备
        //        case FlightCoordination.STATUS_FORMER_BOARDING:  // 前段上客
        //        case FlightCoordination.STATUS_FORMER_CLOSE:  // 前段关门
        //        case FlightCoordination.STATUS_FORMER_OUT:  // 前段推出
        //        case FlightCoordination.STATUS_FORMER_DEP:  // 前段起飞
        //        case FlightCoordination.STATUS_FORMER_RTN:  // 前段返航
        //        case FlightCoordination.STATUS_FORMER_ALN:  // 前段备降
        //        case FlightCoordination.STATUS_FORMER_ARR_RTN:  // 前段返航降落
        //        case FlightCoordination.STATUS_FORMER_ARR_ALN:  // 前段备降降落
        //        {
        //            //命中 以上状态则提示
        //            thisProxy.showTableCellTipMessage(opts, 'WARN', '前序航班未落地');
        //            return;
        //        }
        //    }
        //}

        this.collaborateCtot(rowid, iRow, iCol, cellObj);
    }
    // POSITION协调
    if (colModel.name == 'POSITION') {
        this.collaboratePosition(rowid, iRow, iCol, cellObj);
    }
    // RUNWAY协调
    if (colModel.name == 'RUNWAY') {
        this.collaborateRunway(rowid, iRow, iCol, cellObj);
    }
    // DELAYREASON协调
    if (colModel.name == 'DELAY_REASON') {
        this.collaborateDelayReason(rowid, iRow, iCol, cellObj);
    }
    // FLOWCONTROL POINT PASSTIME协调
    if (colModel.name == 'FLOWCONTROL_POINT_PASSTIME') {
        this.collaborateFlowcontrolPointPasstime(rowid, iRow, iCol, cellObj);
    }
    // FLOWCONTROL_POINT_PASSTIME_CTO协调(CTO)
    //if (colModel.name == 'FLOWCONTROL_POINT_PASSTIME_CTO') {
    //    this.collaborateFlowcontrolPointPasstimeCTO(rowid, iRow, iCol, cellObj);
    //}
    // DEICESTATUS协调
    if (colModel.name == 'DEICE_STATUS') {
        this.collaborateDeiceStatus(rowid, iRow, iCol, cellObj);
    }
    // DEICEPOSITION协调
    if (colModel.name == 'DEICE_POSITION') {
        this.collaborateDeiceStatus(rowid, iRow, iCol, cellObj);
    }
    // DEICEGROUP协调
    if (colModel.name == 'DEICE_GROUP') {
        this.collaborateDeiceStatus(rowid, iRow, iCol, cellObj);
    }
    // 屏蔽协调窗口的右键操作
    if ($('.' + FlightGridTable.COLLABORATE_DOM_CLASS)[0] != null) {
        $('.' + FlightGridTable.COLLABORATE_DOM_CLASS)[0].oncontextmenu = function (e) {
            return false;
        };
    }
};

/**
 * 列名称转换
 */
FlightGridTable.prototype.convertColNames = function () {
    // 将显示列数据转换为表格需显示列名称的数组
    var displayNames = [

    ];
    // 遍历显示列
    for (var name in this.colDisplay) {
        var showNameValue = this.colDisplay[name];
        var nameValue = this.colNames[name];
        // 判断显示列
        if (showNameValue['display'] == 1) {
            // 添加对应中文字体
            displayNames.push(nameValue['cn']);
        }
    }
    return displayNames;
};

/**
 * 列属性转换
 */
FlightGridTable.prototype.convertColModel = function () {
    // 转换列属性
    var displayColModel = [
        //{name: 'cb', index: 'cb', width: 60, align: 'center', frozen : true},
    ];
    // 遍历显示列
    for (var name in this.colDisplay) {
        var nameValue = this.colDisplay[name];
        // 判断显示列，加入显示列的Model
        if (nameValue['display'] == 1) {
            displayColModel.push(this.colModel[name]);
        }
    }
    return displayColModel;
};

/**
 * 列标题转换
 */
FlightGridTable.prototype.convertColTitle = function () {
    // 转换列标题
    var displayTitle = {};
    // 遍历显示列
    for (var name in this.colDisplay) {
        var displayConf = this.colDisplay[name];
        // 判断显示列，加入显示列的Title
        if (displayConf['display'] == 1) {
            displayTitle[name] = this.colTitle[name];
        }
    }
    return displayTitle;
};

/**
 * 列样式转换
 */
FlightGridTable.prototype.convertColStyle = function () {
    // 样式
    var displayStyle = {};
    var displayStyleComment = {};
    // 转换数据
    for (var styleName in this.colStyle) {
        // 获取样式值
        var styleValues = this.colStyle[styleName];
        var singleStyle = '';
        var singleStyleComment = '';
        for (var styleKey in styleValues) {
            if (styleKey == 'comments') {
                singleStyleComment = styleValues[styleKey];
            } else {
                singleStyle += styleKey + ':' + styleValues[styleKey] + ';';
            }
        }
        displayStyle[styleName] = singleStyle;
        displayStyleComment[styleName] = singleStyleComment;
    }
    if ($.isValidVariable(this.colConverter)) {
        // 赋值样式及备注信息给Converter
        this.colConverter.displayStyle = displayStyle;
        this.colConverter.displayStyleComment = displayStyleComment;
    }
};

/**
 * 更新列标题
 * @param colTitle 列标题
 * type: {showName : title}
 */
FlightGridTable.prototype.fireHeaderTitleChange = function (colTitle) {
    // 根据显示列获取或转换标题title对应的文字
    var titles = '';
    var titlesFlag = true;
    if ($.isValidVariable(colTitle)) {
        titles = colTitle;
        titlesFlag = true;
    } else {
        titles = this.colNames;
        titlesFlag = false;
    }
    // 更新标题title的显示
    for (var name in this.colDisplay) {
        var showNameValue = this.colDisplay[name];
        //
        var title = titlesFlag ? titles[name] : titles[name]['cn'];
        // 判断显示列
        if (showNameValue['display'] == 1) {
            this.gridTableObject.jqGrid('setLabel', name, '', [], {'title': title});
        }
    }
};

/**
 * 触发列属性相关数据更新
 *
 * @param colNames 列名称
 * @param colStyle 列样式
 * @param colTitle 列标题
 * @param colEdit 列操作
 * @param colDisplay 列显示
 */
FlightGridTable.prototype.fireColNamesChange = function (colNames, colStyle, colTitle, colEdit, colDisplay) {
    // 更新列配置
    if ($.isValidVariable(colNames)) {
        this.colNames = colNames;
    }
    if ($.isValidVariable(colStyle)) {
        this.colStyle = colStyle;
    }
    if ($.isValidVariable(colTitle)) {
        this.colTitle = colTitle;
    }
    if ($.isValidVariable(colEdit)) {
        this.colEdit = colEdit;
    }
    if ($.isValidVariable(colDisplay)) {
        this.colDisplay = colDisplay;
    }
    // 重新加载表格
    this.unloadGrid();
};

/**
 * 触发表格全部数据更新
 *
 * @param data 数据格式{generateTime:yyyyMMddHHmm, result:{FlightCoordination.id:FlightCoordination}}
 */
FlightGridTable.prototype.fireDataChange = function (data) {
    //
    if (data == undefined || data == null) {
        return;
    }
    // 多选模式下不进行数据更新
    if (this.isMultiSelectModel()) {
        return;
    }
    // 更新数据
    //this.data = data;
    this.tableData = [];
    this.tableDataMap = {};
    // 转换数据
    var flights = data.result;
    for (var id in flights) {
        if (!flights.hasOwnProperty(id) || !$.isValidVariable(flights[id])) {
            continue;
        }
        //  默认受控航路点
        var controlPoints = null;
        var flowcontrols = flights[id].flowcontrols;
        if ($.isValidVariable(flowcontrols)) {
            for (var flowId in flowcontrols) {
                var flowcontrol = flowcontrols[flowId];
                if ($.isValidVariable(flowcontrol)
                    && $.isValidVariable(flowcontrol[9])) {
                    controlPoints = flowcontrol[9];
                }
            }
        }
        var rowData = this.colConverter.convertData(flights[id], data.generateTime, this.colAuthority, controlPoints);
        if ($.isValidVariable(rowData) && $.isValidVariable(rowData.id)) {
            this.tableData.push(rowData);
            this.tableDataMap[id] = rowData;
        }
    }

    this.drawGridTableData();
    this.resizeFrozenTable();

};

/**
 * 触发表格单个数据更新
 *
 * @param flight
 * @param dataTime
 */
FlightGridTable.prototype.fireSingleDataChange = function (flight, dataTime) {
    //清除协调窗口
    this.clearCollaborateContainer();
    // 转换数据
    var rowData = this.convertSingleData(flight, dataTime);
    // 更新数据
    this.data.result[flight.id] = flight;
    this.tableDataMap[flight.id] = rowData;
    // 删除原数据行，加入新的数据行
    // 表格数据ID集合
    var ids = this.gridTableObject.jqGrid('getDataIDs');
    // 当前所在行序列
    var index = this.gridTableObject.jqGrid('getInd', flight.id);
    //清除冻结列
    this.gridTableObject.jqGrid("destroyFrozenColumns");
    // 删除原数据
    var f = this.gridTableObject.jqGrid('delRowData', flight.id);
    if (f) {
        // 再原数据的前一位之后插入新数据
        if (index >= 2) {
            this.gridTableObject.jqGrid('addRowData', flight.id, rowData, 'after', ids[index - 2]);
        } else {
            this.gridTableObject.jqGrid('addRowData', flight.id, rowData, 'first');
        }
    }
    if("main_canvas_grid_table" == this.tableId || 'flowcontrol_impact_flights_dialog_table' == this.tableId ){
        $("#" + this.canvasId + " .ui-jqgrid-bdiv").not('.frozen-bdiv').trigger("scroll");
        if( typeof this.checkedMultiOperate == "function"){
            this.checkedMultiOperate();
        }
    }
    //激活冻结列
    this.gridTableObject.jqGrid("setFrozenColumns");
    //在批量操作列前添加全选checkbox按钮
    //this.addMultiSelectToHeader();
    this.resizeFrozenTable();
    this.scrollToRow(flight.id);
};

/**
 * 绘制表格数据
 */
FlightGridTable.prototype.drawGridTableData = function () {
    var thisProxy = this;
    // 判断是否正在协调操作 正在协调操作不滚动刷新
    var collaborator = $("#main").find('div.flight-grid-table-collaborate-container');
    if (collaborator.length > 0) {
        return;
    }
    // 清空popover弹出框信息
    $('.trajectory-for-popover').popover('destroy');
    // 记录滚动位置
    var scrollHeight = this.canvas.find('div.ui-jqgrid-bdiv').scrollTop();
    // 清空表格数据
    //this.gridTableObject.jqGrid('clearGridData');
    // 更新表格数据
    var params = {data: this.tableData, srcoll: 1};
    if (this.tableId == "flight-grid-table") {
        var num = this.tableData.length;
        params.rowNum = num > 35 ? 35 : num;
        params.scroll = 1;
    }
    this.gridTableObject.jqGrid('setGridParam', params).trigger('reloadGrid');
    var heightDom = $(this.table).siblings();
    if (heightDom.height() > 0) {
        heightDom.height(0);
    }
    // 添加popover
    if ($(".trajectory-for-popover").length > 0 && $(".trajectory-for-popover").text() != "") {
        $('#' + this.tableId).popover({
            container: 'body',
            selector: '.trajectory-for-popover',
            trigger: 'hover',
            placement: 'left',
            html: true,
            title: function () {
                var rowid = $(this).attr('rowid');
                return thisProxy.buildFlightTrajectorPopoverTitle(rowid);
            },
            content: function () {
                var rowid = $(this).attr('rowid');
                return thisProxy.buildFlightTrajectorPopoverContent(rowid, "FLOWCONTROL_POINT");
            }
        });
    }
    if ($(".ACCFIX-for-popover").length > 0 && $(".ACCFIX-for-popover").text() != "") {
        $('#' + this.tableId).popover({
            container: 'body',
            selector: '.ACCFIX-for-popover',
            trigger: 'hover',
            html: true,
            title: function () {
                var rowid = $(this).attr('rowid');
                return thisProxy.buildFlightTrajectorPopoverTitle(rowid);
            },
            content: function () {
                var rowid = $(this).attr('rowid');
                return thisProxy.buildFlightTrajectorPopoverContent(rowid, "ACCFIX");
            }
        });
    }
    // 判断是否需要滚动位置
    if (this.autoScroll) {
        // 需要自动滚动
        var scrollToRowid = null;
        // 排序数据
        var sortColNames = this.autoScroll.split(',');
        var sortedData = this.sortGridData(this.tableData, sortColNames);
        var dataTime = this.data.generateTime;
        for (var index in sortedData) {
            var time = sortedData[index][sortColNames[0]];
            if (time >= dataTime) {
                scrollToRowid = sortedData[index]['ID'];
                break;
            }
        }
        if (scrollToRowid) {
            // 自动滚动到指定行
            this.scrollToRow(scrollToRowid);
        } else {
            // 滚动到更新前的位置
            this.canvas.find("div.ui-jqgrid-bdiv").scrollTop(scrollHeight);
        }
    } else {
        // 滚动到更新前的位置
        this.canvas.find("div.ui-jqgrid-bdiv").scrollTop(scrollHeight);
    }
    //清除冻结列
    this.gridTableObject.jqGrid("destroyFrozenColumns");
    //激活冻结列

    this.gridTableObject.jqGrid("setFrozenColumns");
    this.frozenHeight = $('#'+this.tableId+'_frozen').parent().height();
    this.resizeFrozenTable();
};

/**
 * 表格数据转换单条数据
 *
 * @param flight
 * @param dataTime
 * @returns {*}
 */
FlightGridTable.prototype.convertSingleData = function (flight, dataTime) {
    var rowData = this.colConverter.convertData(flight, dataTime, this.colAuthority);
    if ($.isValidVariable(rowData) && $.isValidVariable(rowData.id)) {
        return rowData;
    }
};

/**
 * 清除协调窗口
 */
FlightGridTable.prototype.clearCollaborateContainer = function () {
    // 清理协调窗口
    $('.' + FlightGridTable.SELECTED_CELL_CLASS).removeClass(FlightGridTable.SELECTED_CELL_CLASS);
    $('.' + FlightGridTable.COLLABORATE_DOM_CLASS).remove();
    if ('auto' == this.canvas.css('overflow')) {
        this.canvas.css('overflow', 'hidden');
    }
    // 清理popover窗口
    $('.popover').popover("hide");
};



/**
 * 批量指定航班时隙
 *
 * @param params
 */
FlightGridTable.prototype.collaborateMultiFlightsLock = function (params) {
    var thisProxy = this;
    $.ajax({
        url: "flight_multi_lock.action",
        traditional: true,
        data: params,
        type: 'POST',
        dataType: 'json',
        success: function (data, status, xhr) {
            try {
                // 判断返回结果有效性
                if (data == undefined || data == null) {
                    BootstrapDialogFactory.dialog({
                        title: '航班批量锁定',
                        content: '航班批量锁定失败，返回无效数据',
                        status: 3
                    });
                    return;
                }
                // 判断返回结果状态，决定显示问题
                if (data.status != 200) {
                    BootstrapDialogFactory.dialog({
                        title: '航班批量锁定失败',
                        content: data.error.message,
                        status: 3
                    });
                    return;
                }
                // 触发数据更新
                ATFMAirport.firAreaFlightsMultiDataChange(data.flights);
            } catch (e) {
                console.error('multiple locked failed');
                console.error(e.stack);
            }
            thisProxy.clearCollaborateContainer();
        },
        error: function (xhr, status, error) {
            BootstrapDialogFactory.dialog({
                title: '航班批量锁定失败',
                content: '航班批量锁定失败，服务器端请求错误',
                status: 3
            });
            console.error(error);
        }
    });
};

/**
 * 判断是否包含指定rowid的航班
 *
 * @param rowid
 * @returns {boolean}
 */
FlightGridTable.prototype.contains = function (rowid) {
    return this.tableDataMap[rowid] != undefined || this.tableDataMap[rowid] != null;
};

/**
 * 高亮显示指定rowid的航班
 *
 * @param rowid
 */
FlightGridTable.prototype.highlight = function (rowid) {
    // 清空所有选中行
    this.gridTableObject.jqGrid('resetSelection');
    // 选中行
    //this.gridTableObject.jqGrid('setSelection', rowid, false);
    // 滚动到指定id对应的行
    //this.scrollToRow(rowid);
};

/**
 * 高亮显示指定rowid的航班并定位
 *
 * @param rowid
 */
FlightGridTable.prototype.highlightRow = function (rowid) {
    //清除协调窗口
    this.clearCollaborateContainer();
    // 清空所有选中行
    this.gridTableObject.jqGrid('resetSelection');
    // 选中行
    this.gridTableObject.jqGrid('setSelection', rowid, false);
    // 滚动到指定id对应的行
    this.scrollToRow(rowid);
};
/**
 * 滚动到指定行id
 *
 * @param rowid
 * @param num 可选
 */
FlightGridTable.prototype.scrollToRow = function (rowid, num) {
    var rowTr = this.gridTableObject.find('tr#' + rowid);
    var iCol = rowTr.find('td').first().text();
    if (!$.isValidVariable(num)) {
        num = 5;
    }
    var rowFirstTd = rowTr.find('td').first()[0];
    if ($.isValidVariable(rowFirstTd)) {
        var offsetHeight = rowFirstTd.offsetHeight;
        var offsetTop = rowFirstTd.offsetTop;
        var scrollHeight = 0;
        if ($.isValidVariable(iCol)) {
            if (iCol > 5) {
                // 留一定空间给相同时间的航班数据
                iCol = iCol - 5;
                scrollHeight = offsetTop - offsetHeight * num;
            } else {
                scrollHeight = offsetTop;
            }
            this.canvas.find("div.ui-jqgrid-bdiv").each(function(){
                $(this).scrollTop(scrollHeight);
            });
        }
    }
};

/**
 * 重新加载表格
 */
FlightGridTable.prototype.unloadGrid = function () {
    // 重新加载表格
    $.jgrid.gridUnload(this.tableId);
    // 清除协调窗口
    this.clearCollaborateContainer();
    // // 初始化
    // this.initGridTableObject();
    // // 加载数据
    // this.drawGridTableData();
    // this.resizeFrozenTable();
};

/**
 * 添加锁定popover
 */
FlightGridTable.prototype.addLockPopover = function (pos) {
    var _this = this;
    //加载监听框
    var contentHtml = '<div><span class="multi-content">移动<input value="0" type="text" class="multi-content-input" min="-999" max="999" />分钟</span><button class="btn btn-primary multi-lock-btn">锁定</button><div class="checkbox multi-checkbox"><label><input type="checkbox" checked="checked" name="lockedValue" value="2">禁止系统自动调整 </label></div><div>';
    $('#' + this.canvasId + ' .glyphicon-lock').popover({
        trigger: 'click',
        "title": "批量锁定",
        "placement": pos,
        "html": true,
        "content": contentHtml
    });
    $('#' + this.canvasId + ' .glyphicon-lock').on("click", function () {
        _this.openMultiFlightsLockDialog(_this);
    });
};

/**
 * 清空表格数据
 */
FlightGridTable.prototype.clearGridData = function () {
    // 清除协调窗口
    this.clearCollaborateContainer();
    // 清空表格数据
    this.gridTableObject.jqGrid('clearGridData');
    this.data = {};
    this.tableData = [];
    this.tableDataMap = {};
};

/**
 * 获取单元格对象
 *
 * @param rowid
 * @param iRow
 * @param iCol
 * @returns
 */
FlightGridTable.prototype.getCellObject = function (rowid, iRow, iCol) {
    if ($.type(iCol) === 'string') {
        // 字符类型，计算列名在表格中的列index值
        var colModel = this.gridTableObject.getGridParam('colModel');
        var colIndex = null;
        for (var index in colModel) {
            if (colModel[index].name == iCol) {
                colIndex = index;
                break;
            }
        }
        return this.gridTableObject.find('tr#' + rowid).find('td').eq(colIndex);
    } else {
        return this.gridTableObject.find('tr#' + rowid).find('td').eq(iCol);
    }
};


/**
 * 构建航班批量锁定popover内容
 */
FlightGridTable.prototype.buildFlightMultiLockContent = function () {
    var contentId = this.pagerId + '-multi-lock-content';
    return '<div id="' + contentId + '">' +
        '<span class="multi-content">移动<input value="0" type="text" class="multi-content-input" maxlength="3" />分钟</span>' +
        '<button class="btn btn-primary multi-lock-btn">锁定</button>' +
        '<div class="checkbox multi-checkbox">' +
        '<label><input type="checkbox" class="multi-lock-checkbox" name="lockedValue" value="2">禁止系统自动调整 </label>' +
        '</div>' +
        '<div>';
};

/**
 * 绑定航班批量锁定popover事件
 */
FlightGridTable.prototype.buildFlightMultiLockEvent = function () {
    var thisProxy = this;
    // 批量锁定内容框
    var contentDom = $('#' + this.pagerId + '-multi-lock-content');
    var contentInput = contentDom.find('input.multi-content-input');
    var contentChecbox = contentDom.find('.multi-lock-checkbox');
    var contentBtn = contentDom.find('.multi-lock-btn');
    // 绑定input验证逻辑
    contentInput.on("keyup", function (e) {
        var offset = $(this).val();
        var reg = /^\-?\d{0,4}$/;
        if (offset != "") {//不为空
            if ((reg.test(offset))) { //验证通过
                if (offset == "-") {
                    return;
                }
                offset = parseInt(offset);
                if (offset > 999) {
                    offset = 999;
                } else if (offset < -999) {
                    offset = -999;
                }
            } else if (offset.indexOf(".") >= 0) {
                offset = Math.floor(offset);
            } else {//验证不通过
                offset = 0;
            }
        }
        $(this).val(offset);
    }).on("blur", function () {
        var offset = $(this).val();
        if (offset == "-" || offset == "") {
            offset = "0";
        }
        $(this).val(offset);
    });
    // 绑定批量锁定提交按钮
    contentBtn.on("click", function (e) {
        // 获取选择行ID
        var selectedIDs = thisProxy.gridTableObject.jqGrid('getGridParam', 'selarrrow');
        // 获取offset值
        var offset = contentInput.val();
        // 获取locked值
        var lockedStatus = contentChecbox.is(':checked') ? 1 : 2;
        if (selectedIDs == undefined || selectedIDs == null || selectedIDs.length <= 0) {
            $(".popover").popover("hide");
            BootstrapDialogFactory.dialog({
                title: '航班批量锁定',
                content: '尚未选择批量操作的航班',
                status: 2
            });
        } else {
            thisProxy.collaborateMultiFlightsLock({
                'ids': selectedIDs,
                'offset': offset,
                'lockedStatus': lockedStatus
            });
        }

    });
};
/**
 * 触发航班计划表格-多个数据更新
 *
 * @param flights 多个航班计划数据(FlightCoordination格式)
 */
FlightGridTable.prototype.fireFlightGridTableMultiDataChange = function(flights) {
    for(var index in flights){
        var flight = flights[index];
        if($.isValidVariable(flight)){
            this.fireSingleDataChange(flight);
        }
    }
    this.checkedMultiOperate();
};
/**
 * 构建航迹信息popover标题
 *
 * @param rowid
 * @returns {string}
 */
FlightGridTable.prototype.buildFlightTrajectorPopoverTitle = function (rowid) {
    var flight = this.data.result[rowid];
    if(!$.isValidVariable(flight)){
        //flight = {};
        return;
    }
    var flightId = flight.id || ""
    var fmeFlightId = "";
    if($.isValidVariable(flight.fmeToday)){
        fmeFlightId = flight.fmeToday.flightid || "";
    }
    return 'ID:' + flightId + ' ' + fmeFlightId;
};

/**
 * 构建航迹信息popover内容
 *
 * @param rowid
 * @returns {*}
 */
FlightGridTable.prototype.buildFlightTrajectorPopoverContent = function (rowid, name) {
    var flight = this.data.result[rowid];
    if(!$.isValidVariable(flight)){
        return;
    }
    var trajectors = FlightCoordination.parseMonitorPointInfo(flight);
    var autoSlotTrajectors = null;
    if ($.isValidVariable(flight.autoSlot)) {
        autoSlotTrajectors = FlightCoordination.parseAutoSlotMonitorPointInfo(flight.autoSlot);
    }
    var popoverContentDiv = $('<div>');
    var popoverContent = $('<div>');
    popoverContentDiv.append(popoverContent);
    popoverContent.addClass('flight-trajector-popover-div');
    var tableTh = '<label></label>' +
        '<label class="flight-trajector-popover-label-header">预计(P)</label>' +
        '<label class="flight-trajector-popover-label-header">计算(C)</label>' +
        '<label class="flight-trajector-popover-label-header">实际/修正(E)</label>';
    popoverContent.append(tableTh);
    for (var index in trajectors) {
        var tra = trajectors[index];
        var autoSlotTra = null;
        if ($.isValidVariable(autoSlotTrajectors)) {
            autoSlotTra = autoSlotTrajectors[index];
        }
        var traC = tra.C;
        if (!$.isValidVariable(traC) && $.isValidVariable(autoSlotTra)) {
            traC = autoSlotTra.C;
        }
        var traE = tra.E;
        var traT = tra.T;
        var traP = tra.P;
        var traA = tra.A;
        if ($.isValidVariable(traA)) {
            traE = '';
        }
        var th = $('<label>', {
            text: tra.ID,
            'class': 'flight-trajector-popover-label-header'
        });
        var tdE = ($('<label>', {
            text: $.formatTimeDDHHMM(traE) + '(E)'
        }));
        var tdP = ($('<label>', {
            text: $.formatTimeDDHHMM(traP)
        }));
        var tdC = ($('<label>', {
            text: $.formatTimeDDHHMM(traC)
        }));
        var tdT = ($('<label>', {
            text: $.formatTimeDDHHMM(traT) + '(T)'
        }));
        var tdA = ($('<label>', {
            text: $.formatTimeDDHHMM(traA)
        }));
        var tdDefault = ($('<label>', {
            text: ''
        }));
        // 改变样式
        var rowData = this.tableDataMap[rowid];
        var compareName = rowData[name];
        if (index == compareName) {
            if ($.isValidVariable(flight.atd) || $.isValidVariable(flight.estInfo) || $.isValidVariable(flight.updateTime)) {
                tdA.addClass("popover-highlight-row");
                tdT.addClass("popover-highlight-row");
                tdE.addClass("popover-highlight-row");
            } else {
                if (flight.clearanceType == FlightCoordination.CLEARANCE_FLIGHTS) {
                    if ($.isValidVariable(traC)) {
                        tdC.addClass("popover-highlight-row");
                    }
                } else if (flight.clearanceType == FlightCoordination.CLEARANCE_OVERFLY) {
                    if ($.isValidVariable(traP)) {
                        tdP.addClass("popover-highlight-row");
                    }
                }
            }
        }
        popoverContent.append(th);
        popoverContent.append(tdP);
        popoverContent.append(tdC);
        if ($.isValidVariable(traA)) {
            popoverContent.append(tdA);
        } else if ($.isValidVariable(traT)) {
            popoverContent.append(tdT);
        } else if ($.isValidVariable(flight.atd)
            || $.isValidVariable(flight.estInfo)
            || $.isValidVariable(flight.updateTime)) {
            if ($.isValidVariable(tdE)) {
                popoverContent.append(tdE);
            }
        } else {
            popoverContent.append(tdDefault);
        }
        popoverContent.append(popoverContent);
    }
    popoverContent.find('label').addClass('flight-trajector-popover-label');
    return popoverContentDiv.html();
};

/**
 * 排序表格数据
 *
 * @param tableData 表格显示数据
 * @param sortColNames 表格显示列名
 * @returns {*}
 */
FlightGridTable.prototype.sortGridData = function (tableData, sortColNames) {
    tableData.sort(function (d1, d2) {
        for (var index in sortColNames) {
            if (!sortColNames.hasOwnProperty(index) || !$.isValidVariable(sortColNames[index])) {
                continue;
            }
            var sortName = sortColNames[index];
            if ($.isValidVariable(d1[sortName]) && $.isValidVariable(d2[sortName])) {
                return d1[sortName].localeCompare(d2[sortName]);
            } else if ($.isValidVariable(d1[sortName])) {
                return -1;
            } else if ($.isValidVariable(d2[sortName])) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    return tableData;
};
/**
 * 显示单元格qtip信息
 *
 * @param cellObject 单元格对象
 * @param type 信息类型
 * @param content 信息内容
 */
FlightGridTable.prototype.showTableCellTipMessage = function (opts, type, content) {
    var thisProxy = this;
    var cellObj =  thisProxy.getCellObject(opts.rowid, opts.iRow, opts.iCol);;
    // 确定样式设置
    var styleClasses = 'qtip-green';
    if (type == 'SUCCESS') {
        styleClasses = 'qtip-green-custom qtip-rounded';
    } else if (type == 'FAIL') {
        styleClasses = 'qtip-red-custom qtip-rounded';
    } else if (type == 'WARN') {
        styleClasses = 'qtip-default-custom qtip-rounded';
    }

    // 显示提示信息
    cellObj.qtip({
        // 内容
        content: {
            text: content // 显示的文本信息
        },
        // 显示配置
        show: {
            delay: 0,
            target: thisProxy.canvas,
            ready: true, // 初始化完成后马上显示
            effect: function () {
                $(this).fadeIn(); // 显示动画
            }
        },
        // 隐藏配置
        hide: {
            target: thisProxy.canvas, // 指定对象
            event: 'scroll unfocus click', // 失去焦点时隐藏
            effect: function () {
                $(this).fadeOut(); // 隐藏动画
            }
        },
        // 显示位置配置
        position: {
            my: 'bottom center', // 同jQueryUI Position
            at: 'top center',
            viewport: true, // 显示区域
            container: thisProxy.canvas, // 限制显示容器，以此容器为边界
            adjust: {
                resize: true, // 窗口改变时，重置位置
                method: 'shift shift'  //flipinvert/flip(页面变化时，任意位置翻转)  shift(转变) none(无)
            }
        },
        // 样式配置
        style: {
            classes: styleClasses //
        },
        // 事件配置
        events: {
            hide: function (event, api) {
                api.destroy(true); // 销毁提示信息
            }
        }
    });
};

/* 表格滚动时协调DOM位置跟随目标单元格 */
FlightGridTable.prototype.followTargetPosition = function (collaboratorDom, cellObj) {
    var thisProxy = this;

    function position() {
        collaboratorDom.position({
            of: cellObj,
            my: 'left top',
            at: 'right top',
            collision: 'flipfit',
        });
    }

    $("#" + thisProxy.tableId).parents(".ui-jqgrid-bdiv").off('scroll', position).on('scroll', position);
};
/**
 *
 * 表格导出Excel
 * */

FlightGridTable.prototype.export = function (name) {
    var thisProxy = this;
    var time = $.getFullTime(new Date());
    var fileName = name +'-'+ time;
    thisProxy.gridTableObject.jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: fileName,
        onBeforeExport : function( xlsx ) {
            var sheet = xlsx.xl.worksheets['sheet1.xml'];
            $('col', sheet).each( function () {
                $(this).attr( 'width', '15' );
            });
        },
    })
};


