/**
 * 确认框
 */
//confirm({
// 	title: '提示',
// 	content: '更换车型将清空定损单，确认要更换吗？',
//  showCancel: true,
//  cancelText: '取消',
//  confirmText: '确认',
// 	confirm: (e) =>{
		
// 	},
// 	cancel: (e) =>{
		
// 	}
// });
function $confirm(opts) {
	let showCancel = opts.hasOwnProperty('showCancel') ? opts.showCancel : true; // 默认显示取消按钮
	let cancelText = opts.cancelText || '取消';
	let confirmText = opts.confirmText || '确认';
	let buttons = [confirmText];
	showCancel ? buttons.push(cancelText) : '';
	// buttons.push(confirmText);
	
	// #ifdef APP-PLUS
	if (uni.getSystemInfoSync().platform == "android") {
		plus.nativeUI.confirm(opts.content,(e)=>{
			if(e.index == 0) { // 确定
				opts.confirm();
			}
			else if(showCancel && e.index == 1){ // 取消
				opts.cancel();
			}
		}, {
			title: opts.title || '提示',
			buttons
		})
	}
	else{
		uni.showModal({
			title: opts.title || '提示',
			content: opts.content,
			showCancel,
			cancelText,
			confirmText,
			success: function (res) {
				if (res.confirm) {
					opts.confirm();
				} else if (res.cancel) {
					opts.cancel();
				}
			}
		});
	};
	// #endif 
	
	// #ifdef H5
		uni.showModal({
			title: opts.title || '提示',
			content: opts.content,
			showCancel,
			cancelText,
			confirmText,
			success: function (res) {
				if (res.confirm) {
					opts.confirm();
				} else if (res.cancel) {
					opts.cancel();
				}
			}
		});
	// #endif
}

export default $confirm;