/**
 * 客户管理管理初始化
 */
var OfCustomer = {
    id: "OfCustomerTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
OfCustomer.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '', field: 'Id', visible: true, align: 'center', valign: 'middle'},
            {title: '客户姓名', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '邮箱地址', field: 'email', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'phone', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'detailedDescription', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
OfCustomer.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        OfCustomer.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加客户管理
 */
OfCustomer.openAddOfCustomer = function () {
    var index = layer.open({
        type: 2,
        title: '添加客户管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/ofCustomer/ofCustomer_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看客户管理详情
 */
OfCustomer.openOfCustomerDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '客户管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/ofCustomer/ofCustomer_update/' + OfCustomer.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除客户管理
 */
OfCustomer.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/ofCustomer/delete", function (data) {
            Feng.success("删除成功!");
            OfCustomer.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("ofCustomerId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询客户管理列表
 */
OfCustomer.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    OfCustomer.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = OfCustomer.initColumn();
    var table = new BSTable(OfCustomer.id, "/ofCustomer/list", defaultColunms);
    table.setPaginationType("client");
    OfCustomer.table = table.init();
});
