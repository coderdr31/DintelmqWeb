//DOM Ready =======================================
/*
setTimeout(function(){
    $(document).ready(function(){
        //Add Conf button 提交事件;注意此处addConf不要加(),否则自动调用本身
        $("#addConf").submit(addConf);
    });
},100);  //延时100毫秒，也就是0.1秒.防止jquery还没加载上
*/
$(document).ready(function(){
    //Populate the user table on initial page load
    populateTable();
    //Add Conf button 提交事件;注意此处addConf不要加(),否则自动调用本身
    $("#addConf").submit(addConf);
    $("#sel2").on('click',wSequence);
    $("#txtSequence").on("change",cSequence);
});
//Functions ===========================================
var sequenceValue = "";
function populateTable() {
    //阻止链接默认行为
    // event.preventDefault();
    $.getJSON('/confs/eventkey',function (data) {
        $.each(data["event"],function (name,value) {
            $("#sel2").append("<option value=" + name + ">"+ name +"</option>");
        });
    });
    return false;

    
}

function addConf() {
    //阻止链接默认行为
    event.preventDefault();
    // var tt = {};
    // tt.c = new Array("Saab","Volvo","BMW");

    var id = $('#txtId').val();
    var newconf = {};
    newconf.file_type = $('#txtFile_type').val();
    newconf.ignore_line_starting = $('#txtIgnore_lines_starting').val();
    newconf.ignore_start_lines = $('#txtIgnore_start_lines').val();
    newconf.sequence = $('#txtSequence').val();
    newconf.fixed_field = $('#txtFixed_field').val();
    newconf.delimiter = $('#txtDelimiter').val();
    var data = '{"' + id + '":' + JSON.stringify(newconf) + '}';
    alert(data);

    //使用AJAX将对象post到addconf service.
        $.ajax({
        type: 'post',
        data: {Data: data},
        url: '/confs/addconf',
        dataType: 'json'
    }).done(function (response) {
        //检查successful (blank) response
        if (response.msg === '') {
            //清空表单中输入内容
            // $('#addConf').reset();
            // document.getElementById("addConf").reset();
            //更新表格
            // populateTable();
        } else {
            //如果出错,提示错误信息
            alert('Error: ' + response.msg);
        }
    });

}


function wSequence() {
    //阻止链接默认行为
    event.preventDefault();
    if(sequenceValue)
        sequenceValue = sequenceValue.concat(',' + $('#sel2').val());
    else
        sequenceValue = sequenceValue.concat($('#sel2').val());
    $('#txtSequence').val(sequenceValue);
}

function cSequence() {
    sequenceValue = $("#txtSequence").val();

}