function confirmPage(obj, address, para) {
	var formId = para.formId;
	var replaceId = para.replaceId;
	$("#sidebar").find("li.active").removeClass("active");
	$("#sidebar").find(obj).parents("li:first").toggleClass("active");
	if (formId == null
			|| formId == ""
			|| ($('#' + formId).length > 0 && $('#' + formId).data(
					'bootstrapValidator').validate().isValid())) {
		var formData, contentType, processData = true, $formObj = $('#'
				+ formId);
		if ($("INPUT[type='file']", $formObj).length > 0) // 处理文件类型
		{
			formData = new FormData($formObj[0]);
			extendFormData(formData, para);
			processData = false;
			contentType = false;
		} else {
			formData = serializeJson($formObj);
			$.extend(formData, para);
			contentType = "application/x-www-form-urlencoded";
		}
		$.ajax({
			type : "POST",
			url : address,
			data : formData,
			processData : processData, // 告诉jQuery不要去处理发送的数据
			contentType : contentType, // 告诉jQuery不要去设置Content-Type请求头
			success : function(data, textStatus, jqXHR) {
				if ($.isEmptyObject(data))
					window.location = "/index.html";
				else if ($.isPlainObject(data) && !data.result) // 系统错误是处理
				{
					$.post(data.backAddress, data, function(data) {
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					});
				} else if (replaceId != null && replaceId != "") {
					if ($(data).filter("#" + replaceId).length > 0) {
						$("#" + replaceId).replaceWith(
								$(data).filter("#" + replaceId));
					} else if ($(data).find("#" + replaceId).length > 0) {
						var html = $(data).find("#" + replaceId).append(
								$(data).find("script"));
						$("#" + replaceId).replaceWith(html);
					} else if ($(data).filter("#pageContent").length > 0)// system
					// error
					// page
					{
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					}
				} else {
					replaceId = $(data).prop("id");
					$("#" + replaceId).replaceWith(data);
				}
			},
			statusCode : {
				404 : function() {
					$.post("/platform/commonSystem/pageException", {
						type : "404"
					}, function(data) {
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					});
				},
				500 : function() {
					$.post("/platform/commonSystem/pageException", {
						type : "500"
					}, function(data) {
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					});
				}
			}
		});
	}
}

function formCommit(obj, address, para, extendPara) {
	if (extendPara != null)
		$.extend(para, extendPara);
	var formId = para.formId;
	var isCloseForm = para.isCloseForm;
	if ((formId == null) || formId == ""
			|| $('#' + formId).data('bootstrapValidator').validate().isValid()) {
		var formData, contentType, processData = true, $formObj = $('#'
				+ formId);
		if ($("INPUT[type='file']", $formObj).length > 0) // 处理文件类型
		{
			formData = new FormData($formObj[0]);
			extendFormData(formData, para);
			processData = false;
			contentType = false;
		} else {
			formData = serializeJson($formObj);
			$.extend(formData, para);
			contentType = "application/x-www-form-urlencoded";
		}
		$.ajax({
			type : "POST",
			url : address,
			data : formData,
			dataType : "json",
			processData : processData, // 告诉jQuery不要去处理发送的数据
			contentType : contentType, // 告诉jQuery不要去设置Content-Type请求头
			success : function(data, textStatus, jqXHR) {
				if ($.isEmptyObject(data))
					window.location = "/index.html";
				else if (data.result) {
					if (isCloseForm) {
						$.each(BootstrapDialog.dialogs, function(id, dialog) {
							dialog.close();
						});
						widgetButtonDispose($('#' + formId));
					} else {
						$('#' + formId).data('bootstrapValidator').resetForm();
						$('#' + formId)[0].reset();
					}
					createTip(BootstrapDialog.TYPE_SUCCESS, data.backAddress,
							data);
				} else {
					createTip(BootstrapDialog.TYPE_DANGER, data.backAddress,
							data);
					$('#' + formId).data('bootstrapValidator').resetForm();
				}
			},
			statusCode : {
				404 : function() {
					$.post("/platform/commonSystem/pageException", {
						type : "404"
					}, function(data) {
						$("#" + replaceId).replaceWith(
								$(data).filter("#" + replaceId));
					});
				},
				500 : function() {
					$.post("/platform/commonSystem/pageException", {
						type : "500"
					}, function(data) {
						$("#" + replaceId).replaceWith(
								$(data).filter("#" + replaceId));
					});
				}
			}
		});
	}
}

function createTip(type, address, para) {
	var msg = para.message;
	var replaceId = para.replaceId;
	var isCloseForm = para.isCloseForm != null ? para.isCloseForm : false; // 关闭所有的弹出窗口

	if (address != null && address == "/platform/commonIndex/main") {
		window.location = address;
		return false;
	}
	BootstrapDialog.show({
		type : type,
		message : msg,
		data : {
			para : para
		},
		buttons : [ {
			icon : 'glyphicon glyphicon-remove',
			label : BootstrapDialog.DEFAULT_TEXTS['CLOSE'],
			action : function(dialog) {
				if (isCloseForm) {
					$.each(BootstrapDialog.dialogs, function(id, dialog1) {
						dialog1.close();
					});
				} else
					dialog.close();
				var data = dialog.getData("para");
				if (data != null && replaceId != null && replaceId != "") {
					data.replaceId = replaceId;
					confirmPage(this, address, data);
				}
			}
		} ]
	});
}

function createConfirmTip(obj, address, msg, para, okBtnMsg, cancelBtnMsg) {
	okBtnMsg = okBtnMsg != null && okBtnMsg != "" ? okBtnMsg
			: BootstrapDialog.DEFAULT_TEXTS['OK'];
	cancelBtnMsg = cancelBtnMsg != null && cancelBtnMsg != "" ? cancelBtnMsg
			: BootstrapDialog.DEFAULT_TEXTS['CANCEL'];
	BootstrapDialog
			.show({
				message : msg,
				type : BootstrapDialog.TYPE_WARNING,
				buttons : [
						{
							icon : 'glyphicon glyphicon-ok',
							label : okBtnMsg,
							cssClass : "btn btn-blue",
							action : function(dialogItself) {
								dialogItself.close();
								$
										.post(
												address,
												para,
												function(data) {
													if ($.isEmptyObject(data))
														window.location = "/index.html";
													else {
														var type = data.result ? BootstrapDialog.TYPE_SUCCESS
																: BootstrapDialog.TYPE_DANGER;
														createTip(
																type,
																data.backAddress,
																data);
													}

												}, "json");
							}
						}, {
							icon : 'glyphicon glyphicon-ban-circle',
							label : cancelBtnMsg,
							action : function(dialogItself) {
								dialogItself.close();
							}
						} ]
			});
}

function treeAction(obj, address, para) {
	var replaceId = para.replaceId;
	$.post(address, para,
			function(data) {
				if (data == "")
					window.location = "/index.html";
				else if ($.isPlainObject(data) && !data.result) // 系统错误是处理
				{
					$.post(data.backAddress, data, function(data) {
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					});
				} else if (replaceId != null && replaceId != "") {
					if ($(data).filter("#" + replaceId).length > 0) {
						$("#" + replaceId).replaceWith(
								$(data).filter("#" + replaceId));
					} else if ($(data).find("#" + replaceId).length > 0) {
						var html = $(data).find("#" + replaceId).append(
								$(data).find("script"));
						$("#" + replaceId).replaceWith(html);
					} else if ($(data).filter("#pageContent").length > 0)// system
					// error
					// page
					{
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					}
				} else {
					replaceId = $(data).prop("id");
					$("#" + replaceId).replaceWith(data);
				}
			});
}

function createActionPanel(obj, address, para) {
	var dialogTitle = para.dialogTitle;
	var dialogSize = para.dialogSize;
	dialogSize = dialogSize != null ? dialogSize : "size-normal";

	if (address != null && address != "") {
		$.post(address, para, function(data) {
			if ($.isEmptyObject(data))
				window.location = "/index.html";
			else if ($.isPlainObject(data) && !data.result) // 系统错误是处理
			{
				/*
				 * $.post(data.backAddress,data,function(data) {
				 * $("#pageContent").replaceWith($(data).filter("#pageContent"));
				 * });
				 */
				createTip(BootstrapDialog.TYPE_DANGER, data.backAddress, data);
			} else {
				BootstrapDialog.show({
					title : dialogTitle,
					size : dialogSize,
					closable : true,
					closeByBackdrop : false,
					closeByKeyboard : false,
					message : $('<div></div>').append(data),
					type : BootstrapDialog.TYPE_INFO
				});
			}
		});
	} else
		window.location = "/index.html";
}

function tableAction(obj, address, formId, para) {
	var jsonPara = serializeJson($('#' + formId));
	$.extend(jsonPara, para);

	/*
	 * var table=$(obj).parents("table:first").dataTable() var
	 * trObj=$(obj).parents("tr:first"); if (table.api().row({selected:
	 * true}).any()) { table.api().row({selected: true}).deselect();
	 * table.api().row(trObj).select(); } else table.api().row(trObj).select();
	 */// 标记颜色代码,在show_extend中异常
	if (para.type == "U" || para.type == "A")
		createActionPanel(obj, address, jsonPara);
	else if (para.type == "D")
		createConfirmTip(obj, address, para.dialogTitle, jsonPara);
}

function tableLinkAction(obj, address, formId, para) {
	var jsonPara = serializeJson($('#' + formId));
	$.extend(jsonPara, para);
	if (para.type == "ROP") {

	} else if (para.type == "CNP") {
		var dialogTitle = para.dialogTitle;
		var dialogSize = para.dialogSize;
		dialogSize = dialogSize != null ? dialogSize : "size-normal";

		if (address != null && address != "") {
			$.post(address, para, function(data) {
				if ($.isEmptyObject(data))
					window.location = "/index.html";
				else if ($.isPlainObject(data) && !data.result) // 系统错误是处理
				{
					$.post(data.backAddress, data, function(data) {
						$("#pageContent").replaceWith(
								$(data).filter("#pageContent"));
					});
				} else {
					BootstrapDialog.show({
						title : dialogTitle,
						size : dialogSize,
						closable : true,
						closeByBackdrop : false,
						closeByKeyboard : false,
						message : $('<div></div>').append(data),
						type : BootstrapDialog.TYPE_INFO
					});
				}
			});
		} else
			window.location = "/index.html";
	} else if (para.type == "RD") {

	}

}

function chooseAllItem(obj, tableId) {
	var tableObj = $("#" + tableId);
	if ($(obj).prop("checked"))
		tableObj.find("input[name='checkItem']").prop("checked", true);
	else
		tableObj.find("input[name='checkItem']").prop("checked", false);
}

function deleteBatch(obj, address, para) {
	var gridId = para.gridId;
	var gdDiv = $("#" + gridId);
	if (gdDiv.find("#delSelectBox:checked").length > 0) {
		var str = gdDiv.find("#delSelectBox:checked").map(function() {
			return $(this).val();
		}).get().join(",");
		str = '[' + str + ']';
		para.delPk = str;
		createConfirmTip(obj, address, para.dialogTitle, para);
	} else
		createTip(BootstrapDialog.TYPE_WARNING, "", para);
}

function tableExpendIcon(obj, address, para, extendPara) {
	var oTable = $(obj).parents("table:first").dataTable();
	var nTr = $(obj).parents('tr')[0];
	if (oTable.fnIsOpen(nTr)) {
		/* This row is already open - close it */
		$(obj).addClass("fa-plus-square-o").removeClass("fa-minus-square-o");
		oTable.fnClose(nTr);
	} else {
		/* Open this row */
		$(obj).addClass("fa-minus-square-o").removeClass("fa-plus-square-o");
		// var aData = oTable.fnGetData(nTr);
		$.extend(para, extendPara);
		$.post(address, para, function(data) {
			if ($.isPlainObject(data) && !data.result) // 系统错误是处理
			{
				$.post(data.backAddress, data, function(data) {
					$("#pageContent").replaceWith(
							$(data).filter("#pageContent"));
				});
			} else {
				oTable.fnOpen(nTr, data, 'details');
			}
		});
		// oTable.fnOpen(nTr, functionName(aData), 'details');
	}
}

function resetMutilSelect(obj) {
	$.each($(obj).find("select"), function(i, n) {
		var id = $(n).prop("id");
		$("#" + id).multiselect('deselectAll', false);
		$("#" + id).multiselect('rebuild');
	});
}

function divDisplay(showId, hiddenId) {
	if (showId != null)
		$(".row#" + showId).css("display", "block");
	if (hiddenId != null)
		$(".row#" + hiddenId).css("display", "none");
}

function serializeJson(formObj) {
	var serializeObj = {};
	var array = formObj.serializeArray();
	var str = formObj.serialize();
	$(array).each(
			function() {
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [ serializeObj[this.name],
								this.value ];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
	return serializeObj;
}

function extendFormData(oldFormData, jsonPara) {
	if (jsonPara != null) {
		for ( var key in jsonPara) {
			oldFormData.append(key, jsonPara[key]);
		}
	}
}

function extendJson(jsonPara, oldFormData) {
	jsonPara = jsonPara == null ? {} : jsonPara;
	var str = "";
	for ( var pair in oldFormData.entries()) {
		str = str + ',"' + pair[0] + '":"' + pair[1] + '"'
	}
	str = "{" + str.substring(1) + "}";
	var obj = $.parseJSON(str);
	jQuery.extend(jsonPara, obj);
}

function searchFunction(txt) // 菜单快速定位
{
	txt = $("#functionSearchText").val();
	var menuList = $("#sidebar #menuText");
	$.each(menuList, function(i, n) {
		var copTxt = $(n).text().trim();
		if (copTxt.toUpperCase().indexOf(txt.toUpperCase()) != -1) {
			$("#sidebar").find("li.active").removeClass("active");
			var liObj = $("#sidebar").find("li.open").removeClass("open");
			liObj.find("ul.submenu").css("display", "none");
			var $obj = $(n).parents("li:first").toggleClass("active");
			$obj.parents("li").toggleClass("open");
			return $obj;
		}
	});
}

function enterSearch(e, txt) {
	var keyNum = window.event ? e.keyCode : e.which;
	if (keyNum == 13) {
		searchFunction(txt);
	}
}

function formatDate(date, fmt) // yyyy-MM-dd hh:mm:ss.S
{
	var o = {
		"M+" : date.getMonth() + 1, // 月份   
		"d+" : date.getDate(), // 日   
		"h+" : date.getHours(), // 小时   
		"m+" : date.getMinutes(), // 分   
		"s+" : date.getSeconds(), // 秒   
		"q+" : Math.floor((date.getMonth() + 3) / 3), // 季度   
		"S" : date.getMilliseconds()
	// 毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;
}