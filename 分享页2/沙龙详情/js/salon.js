$(function() {
    $('.s-more-sec').on('click', function () {
        $('.s-more-sec').hide();
        $(".content").css("display", "block");
        $(".vote").css("display", 'block');
        $('.responseList').css("display", 'block');
    });
    var flag1=false;//只允许一次投票；
    var flag2=false;//表单验证
    $(".s-select-vote").on("click",function(){
        $(".question").children("ul").each(function(){
            if($(this).find("input:checked").length==0){
                alert("请先选择后投票");
                flag2=true;
                return false;
            };
        });
        if(flag2==true){
            flag2=false;
            return;
        }//表单验证
        if(flag1==true){return};
        $(this).css("color","#9b9b9b").val("您已投票")
        alert("投票已成功，谢谢您的参与");
        flag1=true;
    })
});
