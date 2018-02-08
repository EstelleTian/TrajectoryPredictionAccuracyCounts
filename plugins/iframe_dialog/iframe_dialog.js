/**
 * 内嵌iframe的对话框组件
 */
var IframeDialog = {

	/**
	 * 对话框ID前缀
	 */
	dialogIdPrefix : 'iframe_dialog',

	/**
	 * 根据给定参数创建对话框
	 * 
	 * @param params
	 */
	create : function(params) {
		// 生成对话框ID
		var dialogId = IframeDialog.dialogIdPrefix + '_' + new Date().getTime();
		
		// 解析url参数
		var src = '';
		if ($.isValidVariable(params) && $.isValidVariable(params.src)) {
			if (params.src.indexOf('?') >= 0) {
				src = params.src + '&dialogId=' + dialogId;
			} else {
				src = params.src + '?dialogId=' + dialogId;
			}
		} else {
			return;
		}
		
		// 创建对话框容器
		var dialog = $('<div>', {
			'id' : dialogId,
			'class' : IframeDialog.dialogIdPrefix
		});

		// 创建内联框架
		var iframe = $('<iframe>', {
			'css' : {
				'margin' : '0',
				'padding' : '0',
				'border' : '0',
				'width' : '100%',
				'height' : '100%'
			}
		});
		iframe.appendTo(dialog);

		// 将对话框添加至页面最后
		dialog.appendTo('body');

		// 将其转换为对话框
		dialog.dialog({
			title : params.title,
			width : params.width,
			height : params.height,
			modal : params.modal,
			closeOnEscape : true,
			resizable : false,
			position : 'center',
//			show : 'fade',
			hide : 'fade',
			close : function() {
				dialog.dialog('destroy');
				dialog.remove();
			},
			open : function() {
				iframe.attr('src', src);
			}
		});
	},
	
	/**
	 * 根据给的DialogId关闭对话框
	 * 
	 * @param dialogId
	 */
	close : function(dialogId) {
		var dialog = $('#' + dialogId).dialog('close');
	}
};
