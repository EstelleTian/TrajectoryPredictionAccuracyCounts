$(document).ready(function () {
    //导航栏

   var nav = $('#nav');
    // 当日运行数据监控
    $('.nav_monitor').on('click',function () {

        $('li',nav).removeClass('active');
        $(this).addClass('active');
        $('.content-container .row').removeClass('active');
        $('#home').addClass('active');
        $(".data_time").show();
    });
    // 历史运行数据量统计
   $('.nav-history-data-statistics').on('click',function () {

      $('li',nav).removeClass('active');
      $(this).addClass('active');
      $('.content-container .row').removeClass('active');
      $('.pass_point').addClass('active');

   });
   //  // 运行数据查询
   // $('.nav-operating-data-query').on('click',function () {
   //     $('li',nav).removeClass('active');
   //     $(this).addClass('active');
   //     $('.content-container .row').removeClass('active');
   //     $('.operating-data-query').addClass('active');
   //     $(".data_time").hide();
   // });
    //登录时间
    // var generateTime = localStorage.getItem("loginTime");
    // if($.isValidVariable(generateTime)){
    //     var dataTime ="登录时间:"+
    //         generateTime.substring(0, 4) + '-' +
    //         generateTime.substring(4, 6) + '-' +
    //         generateTime.substring(6, 8) + '  ' +
    //         generateTime.substring(8, 10) + ':' +
    //         generateTime.substring(10, 12);
    //     $(".login-time").text(dataTime);
    // }

    // var userName = localStorage.getItem("userName");
    // $(".loginer_name").text(userName);
    // 登出

});