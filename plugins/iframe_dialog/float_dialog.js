/**
 * 浮动弹出提示信息框 
 */
var FloatDialog = {

	/**
	 * 通用对话框ID
	 */
	dialogIdPrefix : 'float_dialog',

	/**
	 * 创建对话框
	 */
	create : function(params) {

		// 创建div作为iframe容器
		var dialog = $('<div>', {
			'id' : FloatDialog.dialogIdPrefix + '_' + new Date().getTime(),
			'class' : FloatDialog.dialogIdPrefix,
			'style' : 'cursor:pointer;'
		});

		// 将对话框添加至页面底部
		dialog.appendTo('body');

		// 添加显示的内容
		dialog.append(params.content);

		// 绑定操作事件和函数
		dialog.bind(params.event, params.fun);

		// 将其转换为对话框
		dialog.dialog({
			title : params.title,
			height : params.height,
			width : params.width,
			resizable : false,
			position : [ 'right', 'bottom' ],

			close : function() {
				dialog.dialog('destroy');
				dialog.remove();
			},

			show : {
				effect : 'blind',
				duration : 300
			},

			hide : {
				effect : "blind",
				duration : 300
			},

			buttons : [{
				text : '关闭',
				click : function() {
					$(this).dialog('close');
				}
			}, {
				text : '关闭全部',
				click : function() {
					$('.' + FloatDialog.dialogIdPrefix).remove();
				}
			}]
		});
	}
};