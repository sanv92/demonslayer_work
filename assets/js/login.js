var login_url = "/p/ws/";
var login_error = "Ошибка входа в систему";
var miss_email = "Незаполнен адрес электронной почты";
var miss_pwd = "Незаполнен пароль";
var wrong_email = "Повторно введен неверный пароль";
var wrong_pwd = "Пароль неправильный или меньше 6 символов!";
var pwd_ne_cpwd = "Повторный ввод пароля неправильный";
var register_error = "Регистрация не удалась";
var account_exists = "Данный счет уже существует";
var no_check = "Вы не согласны с пользовательским соглашением";
var is_login = false;
var tips = {
    txr_email: "Введите адрес электронной почты",
    txr_password1: "Введите пароль (не менее 6 символов)",
    txr_cpassword1: "Введите пароль еще раз"
};

Request = {
    QueryString: function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
}
var isRegister = Request.QueryString("fn");
var redr = Request.QueryString("redr");
if (isRegister == "cu") {
    setTimeout(function() {
        showDialog('02');
    }, 300);
} else {
    showUserInfo();
}
function showName(name) {
    return '<a href="/p/login/logout?redr=/common/nav.html" style="color:white" title="' + name + '">' + name + '[выйти]</a>';
}

function showUserInfo(func)
{
    if (!is_login) {
        $.post("/v1/proxy/user.php?action=getuserinfo", null, showData, "json");
        is_login = true;
    }
}

function showData(data) {
    var cookie_key = '__infipaly_user_email';
    if (getCookie(cookie_key)) {
        $('#txt_email2').val(getCookie(cookie_key));
    }
    switch (data.result)
    {
        case 0:
            callOfferChat();
            var html = '<div class="user" style="padding-top:20px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info"  target="_parent">' + data.username + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
            if ($("#ifrm_nav").length) {
                $("#ifrm_nav").contents().find("#navUserInfo").html(html);
            } else if ($("#navUserInfo").length) {
                $("#navUserInfo").html(html);
            } else if ($('#loginDv').length) {
                html = '<div class="user" style="padding-top:10px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info"  target="_parent">' + data.username + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
                $("#loginDv").html(html);
            }
            if ($('#nav_userInfo').length) {
                $('#nav_userInfo').html('<a href="/p/user-info" target="_parent">Кабинет</a>');
            }

            return;
        default:
            if ((redr != null && redr.length > 3) || ($('#profileId').length && $('#profileId').val() == '0')) {
                showDialog('02');
            }
            if ($('#ifrm_nav').length) {
                $('#ifrm_nav').contents.find('#__user_info_href').attr('href', 'javascript:void(0)');
                $('#ifrm_nav').contents.find('#__user_info_href').click(function() {
                    $('#__exec_no').val(3);
                    showDialog('02');
                });
                return false;
            } else if ($('#__user_info_href').length) {
                $('#__user_info_href').attr('href', 'javascript:void(0)');
                $('#__user_info_href').click(function() {
                    parent.$('#__exec_no').val(3);
                    parent.showDialog('02');
                });
                return false;
            }
            break;
    }

}

function doLogin(id)
{
    var emailObj = $("#txt_email" + id);
    var passwordObj = $("#txt_password" + id);

    var email = emailObj.val();
    var password = passwordObj.val();

    if (!email)
    {
        alert(miss_email);
        emailObj.focus();
        return;
    }
    else if (!password)
    {
        alert(miss_pwd);
        passwordObj.focus();
        return;
    }
    else
    {
        if (checkEmail(email) != 0) {
            alert(wrong_email);
            return;
        }

        var data1 = "email=" + email + "&password=" + password;
        jQuery.post(login_url + "elogin", data1, function(data) {
            switch (data.result.status)
            {
                case 1:
                    if ($('#remember').attr('checked')) {
                        setCookie("__infipaly_user_email", email, 'd30');
                    }
                    if (redr != null && redr.length > 3) {
                        window.location.href = decodeURIComponent(redr);
                        return;
                    }
                    /*
                     if(window.location.href="http://www.infiplay.ru"){
                     window.location.href = "http://ps.infiplay.ru";
                     return;
                     }*/

                    var html = '<div class="user" style="padding-top:20px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info"  target="_parent">' + data.nickName + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
                    if ($("#ifrm_nav").length) {
                        $("#ifrm_nav").contents().find("#navUserInfo").html(html);
                    } else if ($('#loginDv').length) {
                        html = '<div class="user" style="padding-top:10px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info"  target="_parent">' + data.nickName + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
                        $('#loginDv').html(html);
                    }
                    if ($('#nav_userInfo').length) {
                        $('#nav_userInfo').html('<a href="/p/user-info" target="_parent">Кабинет</a>');
                    }
                    closePop();
                    is_call_offerchat = true;
                    if ($('#__exec_no').length && $('#__exec_no').val() != '') {
                        var val = $('#__exec_no').val();
                        if (val == 1) {
                            BOX_show('messdiv');
                        } else if (val == 2) {
                            window.location.reload();
                        } else if (val == 3) {
                            top.location.href = "http://www.infiplay.ru/p/user-info";
                        }
                    }
                    return;
                default:
                    alert(login_error);
                    break;
            }
        }, "json");
    }
}

function showTips(obj, isOk) {
    var wrongImg = $('<img src="/v1/images/index/dialog/register/icon-error.png" alt="" />');
    var rightImg = $('<img src="/v1/images/index/dialog/register/icon-pass.png" alt="" />');
    obj.parent().find('img').remove();
    if (isOk) {
        rightImg.appendTo(obj.parent());
    } else {
        wrongImg.appendTo(obj.parent());
    }
}

function doRegister() {
    var emailObj = $("#txr_email");
    var passwordObj = $("#txr_password");
    var cpasswordObj = $("#txr_cpassword");

    var email = emailObj.val();
    var password = passwordObj.val();
    var cpassword = cpasswordObj.val();
    if (!email)
    {
        $('.error').empty().append(miss_email);
        emailObj.focus();
        showTips(emailObj);
        return;
    }
    if (!password)
    {
        $('.error').empty().append(miss_pwd);
        passwordObj.focus();
        showTips(passwordObj);
        return;
    }
    if (!cpassword)
    {
        $('.error').empty().append(miss_pwd);
        cpasswordObj.focus();
        showTips(cpasswordObj);
        return;
    }
    var patrn = /^(\w){6,14}$/;
    if (!patrn.exec(password.value)) {
        $('.error').empty().append(wrong_pwd);
        showTips(passwordObj);
        return;
    }

    if (cpassword != password) {
        $('.error').empty().append(pwd_ne_cpwd);
        cpasswordObj.focus();
        showTips(cpasswordObj);
        return;
    }

    if (checkEmail(email) != 0) {
        $('.error').empty().append(wrong_email);
        showTips(emailObj);
        return;
    }

    if ($('#agree').attr("checked") != "checked") {
        $('.error').empty().append(no_check);
        $('#dialog-account').find('img').remove();
        return;
    }
    var data1 = "email=" + email + "&password=" + password + "&cpassword=" + cpassword;
    jQuery.post(login_url + "eregister", data1, function(data) {
        switch (data.result.status)
        {
            case 1:
                if (window.location.href = "http://www.infiplay.ru") {
                    window.location.href = "http://ps.infiplay.ru";
                    return;
                }

                var html = '<div class="user" style="padding-top:20px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info" target="_parent">' + email + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
                if ($("#ifrm_nav").length) {
                    $("#ifrm_nav").contents().find("#navUserInfo").html(html);
                } else if ($('#loginDv').length) {
                    html = '<div class="user" style="padding-top:10px"><ul><a style="color:rgb(94,94,223);" href="/p/user-info" target="_parent">' + email + '</a>&nbsp;<a style="color:white" href="/p/login/logout" onclick="logout()" target="_parent">[выйти]</a></ul></div>';
                    $('#loginDv').html(html);
                }
                if ($('#nav_userInfo').length) {
                    $('#nav_userInfo').html('<a href="/p/user-info" target="_parent">Кабинет</a>');
                }
                is_call_offerchat = true;
                regSuccess(email);

                return;
            case -6:
            case -2:
                showTips(emailObj);
                $('.error').empty().append(account_exists);
                break;
            default:
                $('.error').empty().append(register_error);
                break;
        }
    }, "json");

}

function logout()
{
    //$.cookie(cookieKey[0], null, {domain: '.infiplay.ru', path: '/'});
    delCookie("com_d2_SKEY");
    top.window.location = "/p/logout?redr=" + window.location;
}

function chngpwdTip() {
    $('#pwdboxid1').css("display", "none");
    $('#txt_pwd').css("display", "block").focus();
}

function char_test(chr)
{
    var i;
    var smallch = "abcdefghijklmnopqrstuvwxyz0123456789";
    var bigch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (i = 0; i < 36; i++)
        if (chr == smallch.charAt(i) || chr == bigch.charAt(i))
            return(1);
    return(0);
}

function spchar_test(chr)
{
    var i;
    var spch = "_-.0123456789";
    for (i = 0; i < 13; i++)
        if (chr == spch.charAt(i))
            return(1);
    return(0);
}

function checkEmail(str)
{
    var i, flag = 0;
    var at_symbol = 0;
    var dot_symbol = 0;
    if (char_test(str.charAt(0)) == 0)
        return (1);

    for (i = 1; i < str.length; i++)
        if (str.charAt(i) == '@')
        {
            at_symbol = i;
            break;
        }

    if (at_symbol == str.length - 1 || at_symbol == 0)
        return(2);

    if (at_symbol < 2)
        return(3);

    if (at_symbol > 19)
        return(4);

    for (i = 1; i < at_symbol; i++)
        if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
            return (5);
    for (i = at_symbol + 1; i < str.length; i++)
        if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
            return (5);

    for (i = at_symbol + 1; i < str.length; i++)
        if (str.charAt(i) == '.')
            dot_symbol = i;
    for (i = at_symbol + 1; i < str.length; i++)
        if (dot_symbol == 0 || dot_symbol == str.length - 1)
            return (6);

    return (0);
}

function chngpwdTip(c) {
    if (c == 1) {
        $('#txr_password1').css("display", "none");
        $('#txr_password').toggle().focus();
    } else if (c == 2) {
        $('#txr_cpassword1').css("display", "none");
        $('#txr_cpassword').toggle().focus();
    } else if (c == 3) {
        $('#txt_password22').css("display", "none");
        $('#txt_password2').toggle().focus();
    }
}

function checkV(obj) {
    switch (obj.id) {
        case "txr_email":
            if (checkEmail($(obj).val()) != 0) {
                $('.error').empty().append(wrong_email);
                if ($(obj).val() == '') {
                    $(obj).val(tips.txr_email);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break;
        case "txr_password":
            var patrn = /^(\w){6,14}$/;
            if (!patrn.exec($(obj).val())) {
                $('.error').empty().append(wrong_pwd);
                if ($('#txr_password').val() == '') {
                    $('#txr_password').css('display', 'none');
                    $('#txr_password1').css('display', '');
                    $('#txr_password1').val(tips.txr_password1);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break;
        case "txr_cpassword":
            if ($(obj).val() == '' || $(obj).val() != $('#txr_password').val()) {
                $('.error').empty().append(pwd_ne_cpwd);
                if ($('#txr_cpassword').val() == '') {
                    $('#txr_cpassword').css('display', 'none');
                    $('#txr_cpassword1').css('display', '');
                    $('#txr_cpassword1').val(tips.txr_cpassword1);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break
        default:
            break;
    }
}

function regSuccess(email) {
    var html = '<div class="Menubox"><ul>'
            + '<li style="float:right; width:46px;" onClick="closePop()"><img src="/v1/images/nav/btn_close.png" width="46" height="50" /></li>'
            + '</ul> '
            + '</div>'
            + '<div class="Contentbox">'
            + '<br/><br/>'
            + '<center><b>Вы успешно зарегистрировались！</b></center>'
            + '<br/>'
            + '<center><span stype="color:red;">' + email + '</span></center>'
            + '<br/>'
            + '<center><b>Поздравляем Вас с регистрацией</b></center>'
            + '<center><b>на нашем сайте infiplay.ru.</b></center>'
            + '<br/><br/>'
            + '<center>Собирается закрыть и вернуться на</center>'
            + '<center>главную (<span id="span_sec">5</span>)</center>'
            + '<br/><br/>'
            + '</div>';

    $('#Tab1').html(html);
    setTimeout(showTimes, 1000);
}
var xxSec = 4;
function showTimes() {
    $('#span_sec').empty().append(xxSec);
    if (xxSec > 0) {
        xxSec--;
        setTimeout(showTimes, 1000);
    } else {

        //var acct=window.parent.document;
        closePop();
        if ($('#__exec_no').length && $('#__exec_no').val() != '') {
            var val = $('#__exec_no').val();
            if (val == 1) {
                BOX_show('messdiv');
            } else if (val == 3) {
                top.location.href = "http://www.infiplay.ru/p/user-info";
            }
        }
    }
}

function changePwd() {
    var pwd = $('#ori_pwd').val();
    var npwd = $('#new_pwd').val();
    var cpwd = $('#new_cpwd').val();
    var patrn = /^(\w){6,14}$/;
    if (!patrn.exec(pwd)) {
        alert(wrong_pwd);
        $('#ori_pwd').focus();
        return;
    }
    if (!patrn.exec(npwd)) {
        alert(wrong_pwd);
        $('#new_pwd').focus();
        return;
    }
    if (cpwd != npwd) {
        alert(pwd_ne_cpwd);
        $('#new_cpwd').focus();
        return;
    }

    var data1 = "opassword=" + pwd + "&cpassword=" + cpwd + "&password=" + npwd;
    jQuery.post(login_url + "epwd", data1, function(data) {
        switch (data.result.status)
        {
            case 1:
                alert("success");
                return;
            default:
                alert(login_error);
                break;
        }
    }, "json");

}

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
    if (name == 'one' && cursel == 1) {
        $('.btn-submit').css('margin-left', '20px');
    } else if (name == 'one' && cursel == 2) {
        $('.btn-submit').css('margin-left', '87px');
    }
}
function closePop() {
    document.getElementById("Tab1").style.display = "none";
    document.getElementById("dialog-mask").style.display = "none";
}
function showDialog(type) {
    document.getElementById("Tab1").style.display = "block";
    document.getElementById("dialog-mask").style.display = "block";
    if (type == "01") {
        setTab('one', 1, 2);
    } else {
        setTab('one', 2, 2);
    }
}

function showAgree() {
    $('#__Agree').html('<iframe width="360" height="110" frameborder="no" scrolling="auto"  src="http://www.infiplay.ru/www_agree.html" style="height:110px; margin:0px; padding:0px;"></iframe>');
    $('#__Agree').toggle();
}

function callOfferChat() {
    $('#__exec_no').val('-2')
}


function setCookie(name, value, time)
{
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str)
{
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s")
    {
        return str1 * 1000;
    }
    else if (str2 == "h")
    {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d")
    {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

//读取cookies
function getCookie(name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    }
    return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}


$(function() {
    $.each(tips, function(key, value) {
        $('#' + key).val(value);
    });
    $('#con_one_1 input').live('keydown', function(e) {
        if (e.which == 13) {
            doLogin(2);
        }
    });
    $('#con_one_2 input').live('keydown', function(e) {
        if (e.which == 13) {
            doRegister();
        }
    });
});
