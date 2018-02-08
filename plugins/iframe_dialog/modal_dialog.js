/**
 * 通用模式对话框
 */
var ModalDialog = {

	/**
	 * 通用对话框ID
	 */
	dialogIdPrefix : 'modal_dialog',


	/**
	 * 消息对话框,自定义多个按钮
	 *
	 * @param params
	 *   title : 标题 String
	 *   content: 内容 String
	 *   width: 宽 number
	 *   height: 高 number
	 *   modal: 默认是true
	 *   buttons: Array
	 *     name: 按钮名称
	 *     isClose: 是否点击后关闭对话框
	 *     callback: 回调方法
	 *
	 */

	openDialogWithCustomButton : function(params) {
		// 判断参数有效性
		if (!$.isValidVariable(params)) {
			return ;
		}
		//对话框标题
		var title = $.isValidVariable(params.title) ? params.title : "标题";
		//对话框内容
		var content = $.isValidVariable(params.content) ? params.content : "内容";
		// 创建对话框容器
		var dialog = $('<div>', {
			'id' : ModalDialog.dialogIdPrefix + '_' + new Date().getTime(),
			'class' : ModalDialog.dialogIdPrefix
		});
		// 追加内容
		dialog.appendTo('body');
		// 追加内容
		dialog.append(content);
		//按钮
		var buttons = [];
		if( $.isValidVariable(params.buttons) && params.buttons.length > 0){
			var clickFun = function( curCallback ){
				return function(){
					curCallback();
					if(isClose){
						dialog.dialog('close');
					}
				}

			}
			for (var index in params.buttons) {
				var curButton = params.buttons[index];
				//当前按钮的自定义名称
				var curName = $.isValidVariable(curButton.name) ? curButton.name : "按钮";

				//当前按钮的自定义名称
				var btnClass = $.isValidVariable(curButton.class) ? curButton.class : "";
				//当前按钮的自定义回调
				var curCallback = typeof curButton.callback == "function" ? curButton.callback : function(){};
				//按钮是否点击后关闭，如果不是布尔类型就为true
				var isClose = typeof curButton.isClose == "boolean" ? curButton.isClose : true;
				//添加到buttons按钮组中
				buttons.push({
					text : curName,
					class : btnClass,
					click : clickFun(curCallback)
				});
			}

		};

		// 将其转换为对话框
		dialog.dialog({
			title : title,
			width : $.isValidVariable(params.width) ? params.width : 400,
			height : $.isValidVariable(params.height) ? params.height : 200,
			modal : $.isValidVariable(params.modal) ? params.modal : true,
			resizable : false,
			position : 'center',
			show : 'fade',
			hide : 'fade',
			closeOnEscape : true,
			close : function() {
				dialog.dialog('destroy');
				dialog.remove();
			},
			buttons : buttons
		});
	},
	
	/**
	 * 消息对话框
	 * 
	 * @param title
	 *            对话框标题
	 * @param content
	 *            对话框内容
	 * @param confirmCallback
	 *            确认时的回调方法
	 * @param params
	 *            对话框参数，参数内容等同于jQuery UI的Dialog，用于覆盖默认配置
	 */
	openMessageDialog : function(title, content, confirmCallback, params) {
		// 判断参数有效性
		if (!$.isValidVariable(params)) {
			params = {};
		}

		// 创建对话框容器
		var dialog = $('<div>', {
			'id' : ModalDialog.dialogIdPrefix + '_' + new Date().getTime(),
			'class' : ModalDialog.dialogIdPrefix
		});
		dialog.appendTo('body');

		// 追加内容
		dialog.append(content);

		// 将其转换为对话框
		dialog.dialog({
			title : title,
			width : $.isValidVariable(params.width) ? params.width : 400,
			height : $.isValidVariable(params.height) ? params.height : 200,
			modal : $.isValidVariable(params.modal) ? params.modal : true,
			resizable : false,
			position : 'center',
			show : 'fade',
			hide : 'fade',
			closeOnEscape : true,
			close : function() {
				dialog.dialog('destroy');
				dialog.remove();
			},
			buttons : [ {
				text : '确定',
				click : function() {
					if ($.isValidVariable(confirmCallback)) {
						confirmCallback();
					}
					dialog.dialog('close');
				}
			} ]
		});
	},

	/**
	 * 确认对话框
	 * 
	 * @param title
	 *            对话框标题
	 * @param content
	 *            对话框内容
	 * @param confirmCallback
	 *            确认时的回调方法
	 * @param cancelCallback
	 *            取消时的回调方法
	 * @param params
	 *            对话框参数，参数内容等同于jQuery UI的Dialog，用于覆盖默认配置
	 */
	openConfirmDialog : function(title, content, confirmCallback,
			cancelCallback, params) {
		// 判断参数有效性
		if (!$.isValidVariable(params)) {
			params = {};
		}

		// 创建对话框容器
		var dialog = $('<div>', {
			'id' : ModalDialog.dialogIdPrefix + '_' + new Date().getTime(),
			'class' : ModalDialog.dialogIdPrefix
		});
		dialog.appendTo('body');

		// 追加内容
		dialog.append(content);

		// 将其转换为对话框
		dialog.dialog({
			title : title,
			width : $.isValidVariable(params.width) ? params.width : 400,
			height : $.isValidVariable(params.height) ? params.height : 200,
			modal : $.isValidVariable(params.modal) ? params.modal : true,
			resizable : false,
			position : 'center',
			show : 'fade',
			hide : 'fade',
			closeOnEscape : true,
			close : function() {
				dialog.dialog('destroy');
				dialog.remove();
			},
			buttons : [ {
				text : '确定',
				click : function() {
					if ($.isValidVariable(confirmCallback)) {
						confirmCallback();
					}
					dialog.dialog('close');
				}
			}, {
				text : '取消',
				click : function() {
					if ($.isValidVariable(cancelCallback)) {
						cancelCallback();
					}
					dialog.dialog('close');
				}
			} ]
		});

	}

};
