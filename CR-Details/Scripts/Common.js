var ERRORTYPE = "ERRORTYPE";
var SUCESSTYPE = "SUCESSTYPE";
var WARRNIGTYPE = "WARRNINGTYPE";
var LoginindexUrl = "/Account/Login";
var UnAuthorizationUrl = "/Error/AccessDenied";
var value_changed = false;
var currentPage = '';
var isRedBookOptionSelected = false;
var isStaicMenuItemSelected = false;
var isConfReportItemSelected = false;
var isDashboardSelected = false;

var formDataAddMorePersone = "";
var PersoneCount = 0;
jQuery.noConflict();
jQuery.live = function (selector, type, fn) {
    var r = jQuery(document);
    r.selector = selector;
    if (type && fn) {
        r.live(type, fn);
    }
    return r;
};

jQuery(document).ready(function () {
    
    //var config = {
    //    apiKey: "AIzaSyBxW9ZRaf3wb06xQdSrnnlllAiYiGW7Hc8",
    //    authDomain: "pushnoti-56c66.firebaseapp.com",
    //    databaseURL: "https://pushnoti-56c66.firebaseio.com",
    //    projectId: "pushnoti-56c66",
    //    storageBucket: "pushnoti-56c66.appspot.com",
    //    messagingSenderId: "865730452483"
    //};
    //firebase.initializeApp(config);

    //jQuery("#SignOut").on("click", function () {
    //    var SignoutUrl = BASEPATHURL + "/Login/Logout";
    //    AjaxCall({ url: SignoutUrl, postData: "", httpmethod: 'GET', calldatatype: 'JSON', sucesscallbackfunction: 'onSignoutSuccess' });
    //})
    jQuery(".sidebar-toggle").on("click", function () {
        if (jQuery("#MainSideBarDiv").hasClass("width0")) {
            jQuery("#MainSideBarDiv").removeClass("width0");
        }
        else {
            jQuery("#MainSideBarDiv").addClass("width0");
        }
        if (jQuery("#MainContentDiv").hasClass("width100Perc")) {
            jQuery("#MainContentDiv").removeClass("width100Perc");
        } else {
            jQuery("#MainContentDiv").addClass("width100Perc");
        }
    })
    jQuery(function () {
        jQuery(".datePicker").datepicker({
            dateFormat: 'dd/mm/yy'
        });
    });

    SetOpenMenu();

    //var isTableGrid = jQuery('.table-responsive').length > 0;
    //if (isTableGrid) {
    //    jQuery('body').removeClass('gradient-bg');
    //}

    NumericOnly();
    AlphaNumericOnly();
    //NumericAndDecimalOnly();
    CommaSeparatedOnly();
    //Get Number of online user
    window.setInterval(function () {
        GetOnlineAgents();
        GetLatestMessageCount()
    }, 5000);
    EnterDownOnID('SearchResult', 'btn-input');
    EnterDownOnID('SearchResult', 'btn-input-2');

    //messaging = firebase.messaging();
    //messaging.onTokenRefresh(function () {
    //    messaging.getToken()
    //    .then(function (refreshedToken) {
    //        console.log('Token refreshed.');
    //        setTokenSentToServer(false);
    //        // Send Instance ID token to app server.
    //        sendTokenToServer(refreshedToken);
    //        // [START_EXCLUDE]
    //        // Display new Instance ID token and clear UI of all previous messages.
    //        resetUI();
    //        // [END_EXCLUDE]
    //    })
    //    .catch(function (err) {
    //        console.log('Unable to retrieve refreshed token ', err);
    //        showToken('Unable to retrieve refreshed token ', err);
    //    });
    //});

    //messaging.onMessage(function (payload) {
    //    console.log("Message received. ", payload);
    //    //navigator.serviceWorker.getRegistration().then(function (reg) {
    //    //    reg.showNotification(payload.notification.body);
    //    //});
    //    // [START_EXCLUDE]
    //    // Update the UI to include the received message.
    //    // appendMessage(payload);
    //    // [END_EXCLUDE]
    //});

    //// [END get_token
    
    //navigator.serviceWorker.register('http://localhost/HdfcErgo.SalesPortal/firebase-messaging-sw.js').then(function (registration) {
    //    messaging.useServiceWorker(registration);
    //    firebase.auth().signInAnonymously().then(function (data) {
    //        //firebase.auth().onAuthStateChanged(onAuthStateChanged);
    //        if (Notification.permission !== "granted")
    //            Notification.requestPermission().then(function (d) {
    //                resetUI();
    //            });
    //    });
    //});
});

function notifyMe() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification('iMonitor GWP Feature', {
            icon: BASEPATHURL + '/Content/assets/images/imonitor.jpg',
            body: "Added new iMonitor Feature Kindly check!!!",
        });

        notification.onclick = function () {
            window.open("http://stackoverflow.com/a/13328397/1269037");
        };

    }

}

function GetOnlineAgents() {
    AjaxCallWithoutLoadingAndErrorMessage({ url: BASEPATHURL + "/Master/GetNumberOfOnlineAgent", postData: "", httpmethod: 'POST', calldatatype: 'JSON', sucesscallbackfunction: 'OnSuccessGetOnlineAgents' });
}

function OnSuccessGetOnlineAgents(data) {
    if (data > 0) {
        Notify("You have " + data + " Agents Online ", function () { window.location.href = BASEPATHURL + "/Messenger/MessageList/" }, null, "success");
    }
}

function GetLatestMessageCount() {
    AjaxCallWithoutLoadingAndErrorMessage({ url: BASEPATHURL + "/Messenger/GetLatestMessageCount", postData: "", httpmethod: 'POST', calldatatype: 'JSON', sucesscallbackfunction: 'OnSuccessGetLatestMessageCount' });
}

function OnSuccessGetLatestMessageCount(data) {
    var title = document.title;
    if (typeof (data) != "object") {
        jQuery('.badge1').removeAttr('data-badge').attr('data-badge', data);
        if (data > 0) {
            if (!(title.indexOf('(' + data + ') ') > -1)) {
                var newTitle = '(' + data + ') Oval';
                document.title = newTitle;

                if (window.Notification && Notification.permission !== "denied") {
                    var n = new Notification('Oval', {
                        body: 'You have ' + data + ' unread messages!',
                        icon: BASEPATHURL + '/Content/assets/images/iconnect.jpg',
                        tag: 'Demo'
                    });
                    setTimeout(n.close.bind(n), 3000);
                }
            }
        }
    }

}

function NumericOnly() {
    jQuery('.numbersOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
}

function AlphaNumericOnly() {
    jQuery('.alphaNumericOnly').keyup(function () {
        this.value = this.value.replace(/[^A-Za-z0-9\-\s.,]/g, '');
    });
}

function CommaSeparatedOnly() {
    jQuery('.commaSeparatedOnly').keyup(function () {
        this.value = this.value.replace(/(\d\d)(?=(\d\d)+(?!\d\d))/g, "$1,");
    });
}


function SetOpenMenu() {

    jQuery("#notificationLink").on("click", function () {
        jQuery("#notificationContainer").fadeToggle(300);
        jQuery("#usernotificationContainer").hide();
        return false;
    });

    jQuery("#ancUserInfo").on("click", function () {
        jQuery("#usernotificationContainer").fadeToggle(300);
        jQuery("#notificationContainer").hide();
        return false;
    });

    jQuery("#btn-input").focus();

    //Document Click
    jQuery(document).on("click", function () {
        jQuery("#notificationContainer").hide();
        jQuery("#usernotificationContainer").hide();
    });
    //Popup Click
    jQuery("#notificationContainer").on("click", function () {
        return false
    });

    jQuery(".homepage-icon").click(function () {
        currentPage = jQuery(this).attr('href');
        RedirectUserToNextPage()
    });

    jQuery(".morelink-menu").click(function () {
        currentPage = jQuery(this).attr('href');
        RedirectUserToNextPage();
    });
}

function RedirectUserToNextPage() {
    window.location.href = currentPage;
}

function locate(address, currentLAT, currentLNG) {
    var geocoder = new google.maps.Geocoder(),
        latlong = [];

    geocoder.geocode({
        address: address[0]
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            alert("LAT = " + currentLAT + " LNG =" + currentLNG + " And Location " + "lat  =" + results[0].geometry.location.lat() + " lng =" + results[0].geometry.location.lng());
            CheckDistance(currentLAT, currentLNG, results[0].geometry.location.lat(), results[0].geometry.location.lng(), "K");
        }
    });

}

function CheckDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
}


function onSignoutSuccess() {
    if (data.Status == "OK") {
        window.location = BASEPATHURL + data.RedirectTo;
    }
    else {
        AlertModal(getMessage("error"), data.Message, BootstrapDialog.TYPE_DANGER);
        return false;
    }
}

function testAnim(x) {
    jQuery('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        jQuery(this).removeClass();
    });
};
/**************************************************************Common Jquery Plugin Functions ***************************************************************/
function SelectMenuItem() {
    var controllerName = jQuery("#controllerName").val();
    jQuery("#menu-" + controllerName).addClass("selected");
    jQuery(".main-menu > li.selected .second-level-nav").css("display", "none");
}

/**************************************************************Common Jquery Plugin Functions ***************************************************************/
function BindMultiSelect(object) {
    jQuery(object).multiselect();
}

function BindCascade() {
    jQuery.live('select[hascascade="true"]', "change", function () {
        CascadeDropDown(jQuery(this));
    });
}

function BindAutoComplete(options) {
    jQuery(options.textObject).autocomplete({
        minLength: options.minLength == undefined ? 1 : options.minLength,
        source: function (request, response) {
            jQuery.ajax({
                type: 'POST',
                url: options.url,
                data: options.data == undefined ? { "term": jQuery(options.textObject).val() } : options.data,
                dataType: "json",
                cache: false,
                global: false,
                responseType: "json",
                success: function (data) {
                    eval(options.successCallBackFunction + '(data,response);');
                },
                error: function (xhr, textStatus, errorThrown) {
                    onAjaxError(xhr);
                }
            });
        },
        select: function (event, ui) {
            eval(options.selectCallBackFunction + '(ui);');
        }
    });
}


/***************************************************************Dialog Common Functions*********************************************************************/

//Confirmation Modal Dialog
function ConfirmModal(options) {
    var buttons = {};
    var okButtonText = (options.okButtonText) ? options.okButtonText : getMessage("Yes");
    var cancelButtonText = (options.cancelButtonText) ? options.cancelButtonText : getMessage("No");
    var dialogTitle = "";
    if (options.title) {
        dialogTitle = options.title;
    }

    buttons = [{
        label: okButtonText,
        cssClass: 'btn btn-primary',
        action: function (dialogRef) {
            dialogRef.close();
            options.okCallback();
        }
    },
        {
            label: cancelButtonText,
            action: function (dialogRef) {
                dialogRef.close();
                if (options.cancelCallback) {
                    options.cancelCallback();
                }
            }
        }];

    // set width: '500',
    BootstrapDialog.show({
        title: dialogTitle,
        message: options.question,
        //message: jQuery('<textarea class="form-control" placeholder=' + options.question + '></textarea>'),
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        //onhide: function (dialogRef) {
        //    HideShowIframe(true);
        //},
        //onshow: function (dialogRef) {
        //    HideShowIframe(false);
        //},
        buttons: buttons
    });
}

// Delete Confirmation Modal
function DeleteConfirm(options) {
    var deleteId = options.id;
    var title = options.title;
    if (options.type != undefined || options.type != null) {
        var msgType = options.type == "" ? "" : ": " + options.type;
    }
    else {
        var msgType = null;
    }

    ConfirmModal({
        title: getMessage("Delete") + title + '?',
        question: getMessage("deleteConfirm") + ' ' + title + "" + msgType + "?",
        okCallback: function () {
            ShowWaitDialog();
            jQuery.post(options.url, {
                Id: deleteId
            }, function (data) {
                HideWaitDialog();
                if (data.Status == "OK") {
                    if (options.callBackParam != undefined) {
                        eval(options.okCallback + "(" + options.callBackParam + ", data)");
                    }
                    AlertModalDialogWithButtonEvent(getMessage("success"), getMessage("deleteMessage"), BootstrapDialog.TYPE_SUCCESS, "OK", options.okCallback);
                }
                else if (data.Status == "ALREADY_EXIST") {
                    AlertModal(getMessage("error"), getMessage("deleteAlreadyExist"), BootstrapDialog.TYPE_DANGER);
                }
                else {
                    AlertModal(getMessage("error"), getMessage("errorMessage"), BootstrapDialog.TYPE_DANGER);
                }
            }).fail(function (xhr) {
                onAjaxError(xhr);
                HideWaitDialog();
            });
        }
    });
}


// Alert Modal with button text
function AlertModalDialog(title, message, dialogType, buttonText, callback) {

    var dialogType = (dialogType) ? dialogType : BootstrapDialog.TYPE_PRIMARY;

    BootstrapDialog.show({
        title: title,
        message: message,
        type: dialogType,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        onhide: function (dialogRef) {
            if (callback) {
                callback();
            }
            //HideShowIframe(true);
        },
        //onshow: function (dialogRef) {
        //    HideShowIframe(false);
        //},
        buttons: [
        {
            label: buttonText,
            hotkey: 14,
            cssClass: 'btn btn-primary',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });
}

// Alert Modal with button text
function AlertModalDialogWithButtonEvent(title, message, dialogType1, buttonText, callback, IsInclude) {
    var objButton = [];
    var objCancelButton = {
        label: "Cancel",
        hotkey: 14,
        cssClass: 'btn btn-default',
        action: function (dialogItself) {
            dialogItself.close();
        }
    };
    var objCustomButton = {
        label: buttonText,
        hotkey: 13,
        cssClass: 'btn btn-primary',
        id: 'AlertModalDialogButtonOK',
        autospin: false,
        action: function (dialogItself) {
            if (callback) {
                eval(callback + "()");
            }
            dialogItself.close();
        }
    };

    if (IsInclude != undefined) {
        if (IsInclude) {
            objButton = [objCustomButton, objCancelButton];
        }
        else {
            objButton = [objCancelButton];
        }
    }
    else {
        objButton = [objCustomButton];
    }
    var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;
    BootstrapDialog.show({
        title: title,
        message: message,
        type: dialogType,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        buttons: objButton
    });

    jQuery("#AlertModalDialogButtonOK").focus();
}

// Alert Modal
function AlertModal(title, message, dialogType1, callback) {
    debugger
    var okButtonText = getMessage("Okay");
    var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;

    BootstrapDialog.show({
        title: title,
        message: message,
        type: dialogType,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        onhide: function (dialogRef) {
            if (callback) {
                callback();
            }
        },
        buttons: [{
            label: okButtonText,
            hotkey: 14,
            cssClass: 'btn btn-primary',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });
}

function AlertModalWIDE(title, message, dialogType1, callback, isIncluded) {
    if (isIncluded) {
        var okButtonText = getMessage("Okay");
        var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;

        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_WIDE,
            title: title,
            message: message,
            type: dialogType,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: true,
            onhide: function (dialogRef) {
                if (callback) {
                    callback();
                }
            },
            buttons: [{
                label: okButtonText,
                hotkey: 14,
                cssClass: 'btn btn-primary',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    }
    else {
        var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;

        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_WIDE,
            title: title,
            message: message,
            type: dialogType,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: true,
            onhide: function (dialogRef) {
                if (callback) {
                    callback();
                }
            }
        });
    }
}

function AlertModalWOMessage(title, message, dialogType1, callback,Class,buttonText,onClickEvent) {
    var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;

    BootstrapDialog.show({
        title: title,
        type: dialogType,
        message: message,
        closable: true,
        cssClass:Class,
        closeByBackdrop: false,
        closeByKeyboard: true,
        onhide: function (dialogRef) {
            if (callback) {
                callback();
            }
        },
        buttons: [{
            label: buttonText,
            hotkey: 14,
           id: "btn"+buttonText,
            cssClass: 'btn btn-primary',
            //action: function (dialogItself) {
            //    dialogItself.close();
            //}
        }]
    });
}

function AlertModalWOButton(title, message, dialogType1, callback) {

    var okButtonText = getMessage("Okay");
    var dialogType = (dialogType1) ? dialogType1 : BootstrapDialog.TYPE_PRIMARY;

    BootstrapDialog.show({
        title: title,        
        message: message,
        type: dialogType,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        onhide: function (dialogRef) {
            if (callback) {
                callback();
            }
        }
    });
}


// Open Dialog
function OpenDialog(options) {
    ShowWaitDialog();
    debugger
    var buttons = {};
    var divId = options.DivId != undefined ? options.DivId.toString() : "divDialog";
    var divDialog = jQuery("<div id='" + divId + "'></div>");
    var saveButton = options.SaveButtonTitle != undefined ? options.SaveButtonTitle.toString() : getMessage("Save");
    var cancelButton = options.CancelButtonTitle != undefined ? options.CancelButtonTitle.toString() : getMessage("Cancel");
    var HttpMethod = options.HttpMethod != undefined ? options.HttpMethod.toString() : "GET";
    var Data = options.Data != undefined ? options.Data : {};

    if (options.hideButtons == 'true') {
        buttons = {};
    }
    else {
        buttons = [{
            label: saveButton,
            hotkey: 13, // Enter.
            cssClass: 'btn btn-primary',
            action: function (dialogRef) {
                if (options.callBackParam == undefined)
                    eval(options.SaveCallback + "()");
                else
                    eval(options.SaveCallback + "(" + options.callBackParam + ")");
            }
        },
            {
                label: cancelButton,
                cssClass: 'btn btn-default',
                action: function (dialogRef) {
                    if (options.CancelCallback == undefined) {
                        dialogRef.close();
                    } else {
                        eval(options.CancelCallback + "()");
                    }
                }
            }];
    }

    if (options.url.indexOf("?") != -1) {
        options.url = options.url + '&r=' + Math.random();
    }
    else {
        options.url = options.url + '/?' + Math.random();
    }

    jQuery.ajax({
        url: options.url,
        cache: true,
        data: Data,
        type: HttpMethod,
        success: function (data) {
            divDialog.html(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            HideWaitDialog();
            onAjaxError(xhr);
        }
    });

    var dialog = new BootstrapDialog({
        title: options.title,
        message: divDialog,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: true,
        buttons: buttons,
        cssClass: options.cssClass,
        onshow: function (dialog) {
            //KeyPressNumericValidation();
            if (jQuery.validator.unobtrusive != undefined) {
                jQuery.validator.unobtrusive.parse(jQuery("#" + divId));
            }
            var firstFocusedElement = divDialog.children().find('input,select,textarea').filter(':enabled:visible:first');
            if (firstFocusedElement != null && firstFocusedElement.length > 0) {
                jQuery('#' + firstFocusedElement[0].id).focus();
            }
        }
    });
    HideWaitDialog();
    dialog.open();
}

// Open Model Dialog
function OpenModalDialog(options) {
    ShowWaitDialog();

    var divDialog = jQuery("<div id='divDialog'></div>");
    var ButtonText = options.ButtonTitle != undefined ? options.ButtonTitle.toString() : getMessage("Close");
    var HttpMethod = options.HttpMethod != undefined ? options.HttpMethod.toString() : "GET";
    var Data = options.Data != undefined ? options.Data : {};

    var buttons = {};
    if (options.hideButtons == 'true') {
        buttons = {};
    }
    else {
        buttons = [{
            label: ButtonText,
            cssClass: 'btn btn-default',
            action: function (dialogRef) {
                if (options.ClosecallBack != undefined) {
                    eval(options.ClosecallBack + "(divDialog)");
                }
                dialogRef.close();
            }
        }];
    }

    var dialog = new BootstrapDialog({
        title: options.title,
        cssClass: options.cssClass,
        message: function (dialog) {
            var jQuerymessage = divDialog;
            jQuery.ajax({
                url: options.url,
                cache: false,             
                success: function (data) {
                    jQuerymessage.html(data);
                    //divDialog.dialog('option', 'position', 'center');
                    if (jQuery.validator.unobtrusive != undefined) {
                        jQuery.validator.unobtrusive.parse(jQuery('#divDialog'));
                    }
                    HideWaitDialog();
                },
                error: function (xhr, textStatus, errorThrown) {
                    HideWaitDialog();
                    onAjaxError(xhr);
                }
            });
            return jQuerymessage;
        },
        closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
        buttons: buttons
    });
    //HideWaitDialog();

    dialog.open();
}

// Open Model Dialog with Width 100% 
function OpenModalDialogWidth(options) {
    ShowWaitDialog();
    debugger
    var divDialog = jQuery("<div id='divDialogMISReport' ></div>");
    var ButtonText = options.ButtonTitle != undefined ? options.ButtonTitle.toString() : getMessage("Close");
    var HttpMethod = options.HttpMethod != undefined ? options.HttpMethod.toString() : "GET";
    var Data = options.Data != undefined ? options.Data : {};

    var buttons = {};
    if (options.hideButtons == 'true') {
        buttons = {};
    }
    else {
        buttons = [{
            label: ButtonText,
            cssClass: 'btn btn-default',
            action: function (dialogRef) {
                if (options.ClosecallBack != undefined) {
                    eval(options.ClosecallBack + "(divDialog)");
                }
                dialogRef.close();
            }
        }];
    }

    var dialog = new BootstrapDialog({
        title: options.title,
        cssClass: options.cssClass,
        message: function (dialog) {
            var jQuerymessage = divDialog;
            jQuery.ajax({
                url: options.url,
                cache: false,
                data:Data,        
                success: function (data) {
                    jQuerymessage.html(data);
                    //divDialog.dialog('option', 'position', 'center');
                    if (jQuery.validator.unobtrusive != undefined) {
                        jQuery.validator.unobtrusive.parse(jQuery('#divDialog'));
                    }
                    HideWaitDialog();
                },
                error: function (xhr, textStatus, errorThrown) {
                     HideWaitDialog();
                    onAjaxError(xhr);
                }
            });
            return jQuerymessage;
        },
        closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
        buttons: buttons
    });
    //HideWaitDialog();

    dialog.open();
}
/***************************************************************Validation Common Functions*****************************************************************/

function CheckErrors(currentForm) {
    var validator = currentForm.validate({ onfocusout: false, onkeyup: false }).form();
    var messages = '';

    jQuery.each(currentForm.validate().errorList, function (index, value) {
        messages += "<li>" + value.message + "</li>";
    });

    if (!jQuery(currentForm).valid()) {
        messages = "<div><h5>" + getMessage("errorTitle") + "</h5><ul>" + messages + "</ul></div>";
        AlertModal(getMessage("error"), messages, BootstrapDialog.TYPE_DANGER, function () {
        });
        return false;
    }
    return true;
}

function CheckErrorsWithParameter(currentForm, validationMessage) {
    var messages = '';
    if (currentForm != null) {
        jQuery.each(currentForm.validate().errorList, function (index, value) {
            messages += "<li>" + value.message + "</li>";
        });
    }

    if (validationMessage.length > 0) {
        jQuery.each(validationMessage, function (index, value) {
            messages += "<li>" + value + "</li>";
        });
    }
    if (messages != '') {
        messages = "<div><h5>" + getMessage("errorTitle") + "</h5><ul>" + messages + "</ul></div>";
        AlertModal(getMessage("error"), messages, BootstrapDialog.TYPE_DANGER, function () {
        });
        return false;
    }
    return true;
}

function getMessage(key, placeHolders) {
    var languageCurrent = 'en'; //Default English
    if (localStorage) {
        if (localStorage.LanguageCurrent != undefined) {
            languageCurrent = localStorage.LanguageCurrent;
        }
    }
    return format(Languages[languageCurrent][key], placeHolders);
}


/***************************************************************Common Utilty Functions*****************************************************************/
//remove row from clientside table
function removerow(obj) {
    jQuery(obj).parent().parent().remove();
}

function AjaxCall(options) {
    var url = options.url;
    var postData = options.postData;
    var httpmethod = options.httpmethod;
    var calldatatype = options.calldatatype;
    var sucesscallbackfunction = options.sucesscallbackfunction;
    var contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
    var showLoading = options.showLoading == undefined ? true : options.showLoading;
    var isAsync = options.isAsync == undefined ? true : options.isAsync;
    var processData = options.processData == undefined ? true : options.processData;
    var isDashboardWait = options.isDashboard == 'true' ? true : false;
    ShowWaitDialog();
    jQuery.ajax({
        type: httpmethod,
        url: url,
        data: postData,
        global: showLoading,
        dataType: calldatatype,
        contentType: contentType,
        async: isAsync,
        //traditional:true,
        cache: false,
        processData: processData,
        success: function (data) {

            var flagForSession = true;
            if (typeof data != 'object') {
                var dataError;
                try {
                    dataError = jQuery.parseJSON(data);
                    if (dataError.Status == "ERROR") {
                        flagForSession = false;
                        window.location.href = BASEPATHURL + dataError.RedirectTo;
                    }
                } catch (e) {
                    flagForSession = true;
                }
            }
            if (data.Status != undefined && data.Status == "VALIDATION_ERROR" && flagForSession) {
                if (options.formId == undefined) {
                    ShowError(data.Data);
                }
                else {
                    ShowFormError(data.Data, options.formId);
                }
            }
            else {
                if (sucesscallbackfunction != '') {
                    value_changed = false;
                    eval(sucesscallbackfunction + '(data)');
                }
            }
            if (isDashboardWait) {
                setTimeout(function () { HideWaitDialog(); }, 40000);
            }
            else {
                HideWaitDialog();
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            debugger
            HideWaitDialog();
            onAjaxError(xhr);
        }
    });
}

function AjaxCallWithoutLoading(options) {
    var url = options.url;
    var postData = options.postData;
    var httpmethod = options.httpmethod;
    var calldatatype = options.calldatatype;
    var sucesscallbackfunction = options.sucesscallbackfunction;
    var contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
    var showLoading = options.showLoading == undefined ? true : options.showLoading;
    var isAsync = options.isAsync == undefined ? true : options.isAsync;
    jQuery.ajax({
        type: httpmethod,
        url: url,
        data: postData,
        global: showLoading,
        dataType: calldatatype,
        contentType: contentType,
        async: isAsync,
        cache: false,
        success: function (data) {
            var flagForSession = true;
            if (typeof data != 'object') {
                var dataError;
                try {
                    dataError = jQuery.parseJSON(data);
                    if (dataError.Status == "ERROR") {
                        flagForSession = false;
                        window.location.href = BASEPATHURL + dataError.RedirectTo;
                    }
                } catch (e) {
                    flagForSession = true;
                }
            }
            if (data.Status != undefined && data.Status == "VALIDATION_ERROR" && flagForSession) {
                if (options.formId == undefined) {
                    ShowError(data.Data);
                }
                else {
                    ShowFormError(data.Data, options.formId);
                }
            }
            else {
                if (sucesscallbackfunction != '') {
                    value_changed = false;
                    eval(sucesscallbackfunction + '(data)');
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            onAjaxError(xhr);
        }
    });
}

function onAjaxError(xhr) {
    if (!UserAborted(xhr)) {
        if (xhr.status == 403) {
            AlertModal(getMessage("error"), getMessage("error403Message"), BootstrapDialog.TYPE_DANGER, function () {
                window.location = LoginindexUrl;
            });
        }
        else {
            //This shortcut is not recommended way to track unauthorized action.
            if (xhr.responseText.indexOf("403.png") > 0) {
                window.location = UnAuthorizationUrl;
            }
            else {
                //AlertModal(getMessage("error"), getMessage("errorMessage"), BootstrapDialog.TYPE_DANGER);
                var isClass = jQuery('body').hasClass('modal-open');

                if (isClass != true) {
                    AlertModal(getMessage("error"), getMessage("errorMessage"), BootstrapDialog.TYPE_DANGER);
                }
            }
        }
    }
}

function UserAborted(xhr) {
    return !xhr.getAllResponseHeaders();
}

function ShowWaitDialog() {
    try {
        jQuery("#pageLoading").show();
    }
    catch (ex) {
        // blank catch to handle ie issue in case of CK editor
    }
}

function HideWaitDialog() {
    jQuery("#pageLoading").hide();
}

function Navigator(sourceUrl, linkType, dialogtitle, control, callfunctioname, type, height, width, hideButtons, Method, postData, cssClass) {
    if (linkType.toLowerCase() == "pageredirect") {
        window.location = sourceUrl;
    }
    else if (linkType.toLowerCase() == "popup") {
        OpenDialog({ url: sourceUrl, width: width, height: height, title: dialogtitle, SaveCallback: callfunctioname, Method: Method, postData: postData, hideButtons: hideButtons });
    }
    else if (linkType.toLowerCase() == "viewpopup") {
        OpenModalDialog({ url: sourceUrl, cssClass: cssClass, title: dialogtitle, ClosecallBack: callfunctioname, HttpMethod: Method, hideButtons: hideButtons, width: width, height: height });
    }
    else if (linkType.toLowerCase() == "newtabredirect") {
        window.open(sourceUrl, "_blank");
    }
    else if (linkType.toLowerCase() == "confirm") {
        var index = sourceUrl.lastIndexOf('/');
        var url = sourceUrl.substr(0, index);
        var primaryId = sourceUrl.substr(index + 1);
        var option = { id: primaryId, DeleteObj: control, url: url, okCallback: callfunctioname, title: dialogtitle, type: type };
        DeleteConfirm(option);
    }
    else if (linkType.toLowerCase() == "cancel") {
        var index = sourceUrl.lastIndexOf('/');
        var url = sourceUrl.substr(0, index);
        var primaryId = sourceUrl.substr(index + 1);
        var option = { id: primaryId, DeleteObj: control, url: url, okCallback: callfunctioname, title: dialogtitle, type: type };
        CancelConfirm(option);
    }
}

function RegisterEnterKeyForDialog(dialog, callback) {
    dialog.attr('tabIndex', -1).css('outline', 0).focus().keydown(function (ev) {
        if (ev.keyCode && ev.keyCode == jQuery.ui.keyCode.ENTER) {
            callback();
        }
    });
}

function RoundNumber(Expression, Precision) {
    var n = Math.pow(10, Precision);
    return parseFloat(Math.round(Expression * n) / n).toFixed(Precision);
}

function SearchOnEnter(callBackfunction) {
    jQuery(document).keypress(function (e) {
        if (e.which == 13) {
            eval(callBackfunction + '()');
        }
    });
}
function EnterPressOnID(callBackfunction, selector) {
    jQuery('#' + selector).keypress(function (e) {
        if (e.keyCode == 13) {
            eval(callBackfunction + '()');
            e.preventDefault();
        }
    });
}

function EnterDownOnID(callBackfunction, selector) {
    jQuery('#' + selector).keydown(function (e) {
        if (e.keyCode == 13) {
            var id = jQuery('.ui-corner-all.ui-state-focus').attr('id');
            if (id == 'aRedBook') {
                isRedBookOptionSelected = true;
                eval(callBackfunction + '()');
            }
            else if (id == 'aDashBoard') {
                isDashboardSelected = true;
                eval(callBackfunction + '()');
            }
            else if (id == '' || id == null || id == 'aNoRecord') {
                isRedBookOptionSelected = false;
                isDashboardSelected = false;
                eval(callBackfunction + '()');
            }
            else {
                //var url = jQuery('#' + id).attr('href');
                //jQuery('#urlToRedirect').val(url);
            }


            //e.preventDefault();
        }
    });
}

function EnterOnSearch() {
    if (jQuery('div.form-search.well  a > .icon-search').size() > 0) {
        jQuery.live('div.form-search.well  :input', 'keydown', function (event) {
            if (event.keyCode == 13) {
                jQuery('div.form-search.well  a.btn.btn-primary').click();
                jQuery(this).focus();
            }
        });
    }
}

function ShowError(ModelStateErrors) {
    jQuery('input,select,textarea').removeClass("input-validation-error");
    var messages = "";
    jQuery(ModelStateErrors).each(function (i, e) {
        jQuery('[name="' + e.Key + '"]').addClass("input-validation-error");
        messages += "<li>" + e.Value[0] + "</li>";
    });
    messages = "<div><h5>" + getMessage("errorTitle") + "</h5><ul>" + messages + "</ul></div>";

    AlertModal(getMessage("error"), messages, BootstrapDialog.TYPE_DANGER, function () {
    });
}

function ShowFormError(ModelStateErrors, formId) {
    jQuery("#" + formId + " input,#" + formId + " select,#" + formId + " textarea").removeClass("input-validation-error");
    var messages = "";
    jQuery(ModelStateErrors).each(function (i, e) {
        jQuery('#' + formId + ' [name="' + e.Key + '"]').addClass("input-validation-error");
        messages += "<li>" + e.Value[0] + "</li>";
    });
    messages = "<div><h5>" + getMessage("errorTitle") + "</h5><ul>" + messages + "</ul></div>";

    AlertModal(getMessage("error"), messages, BootstrapDialog.TYPE_DANGER, function () {
    });
}

function SetDropdownOptions(optionData, cascadeControlId, selectedValue, defaultText) {
    var record = eval(optionData);
    jQuery("#" + cascadeControlId).empty();
    jQuery("#" + cascadeControlId).append("<option value=''>" + defaultText + "</option>");

    jQuery(record).each(function (e, i) {
        var option;
        if (typeof i.DTOJson == "undefined")
            option = i;
        else
            option = eval('[' + i.DTOJson + ']')[0];

        if (option.Value.toString() == selectedValue.toString())
            jQuery("#" + cascadeControlId).append("<option value='" + option.Value + "' selected='selected'>" + option.Name + "</option>");
        else
            jQuery("#" + cascadeControlId).append("<option value='" + option.Value + "'>" + option.Name + "</option>");
    });
}

function validateEmailFormat(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?jQuery/;

    if (email != '') {
        if (!emailReg.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function format(string, placeHolders) {
    placeHolders = typeof placeHolders === 'object' ? placeHolders : Array.prototype.slice.call(arguments, 1);

    if (string != undefined) {
        return string.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return placeHolders[n];
        });
    }
    else {
        return "";
    }
};

function FirstCharCapital(strValue) {
    return strValue.substr(0, 1).toUpperCase() + strValue.substr(1).toLowerCase();
}

function SetFocusOnFirstField(objControl) {
    var firstElements = jQuery(objControl).children().find('input,select,textarea').filter(':enabled:visible:first');
    if (firstElements != null && firstElements.length > 0) {
        jQuery('#' + firstElements[0].id).focus();
    }
}

function IsDecimalData(value) {
    if (value == '') {
        return true;
    };

    var rgexp = /^[0-9.]+jQuery/;
    if (rgexp.test(value)) {
        return true;
    } else {
        return false;
    }
}

function IsDecimal(value) {
    if (value == '') {
        return true;
    };

    var rgexp = new RegExp("^[0-9]{0,8}([.][0-9]{1,2})?jQuery");
    if (rgexp.test(value)) {
        return true;
    } else {
        return false;
    }
}

function GetPageSize(objPageSize) {
    var pageSize = jQuery("#GlobalPageSize").val();
    if (jQuery("#" + objPageSize).val() != undefined) {
        if (jQuery("#" + objPageSize).val() == "") {
            pageSize = 0;
        }
        else {
            pageSize = jQuery("#" + objPageSize).val();
        }
    }
    return pageSize;
}

function ValidateTextbox() {
    var isValid = true;
    jQuery('input[type="text"]').each(function () {
        if (jQuery.trim(jQuery(this).val()) == '') {
            isValid = false;
            jQuery(this).css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
        }
        else {
            jQuery(this).css({
                "border": "",
                "background": ""
            });
        }
    });
    return isValid;
}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

var Languages =
{
    en:
    {
        error: "Message",
        errorMessage: "System error has occurred.",
        error403Message: 'Your session has been expired, please login again.',
        success: "Success",
        warning: "Warning",
        alert: "Alert",
        Delete: "Delete ",
        deleteConfirm: "Are you sure you want to delete ",
        deleteMessage: "Record deleted successfully.",
        Select: "--Select--",
        All: "All",
        Yes: "Yes",
        No: "No",
        Okay: "OK",
        Save: "Save",
        Close: "Close",
        Cancel: "Cancel",
        Browse: 'Browse',
        CancelConfirm: "Are you sure you want to cancel ?",
        cancelMessage: "Record canceled successfully.",
        errorTitle: "Correct following error(s).",
        FromDateRequiredMessage: "Please select From Date.",
        ToDateRequiredMessage: "Please select To Date.",
        resErrorFromToDate: "Please select From Date smaller or equal to To Date.",
        resErrorStartEnddate: "Please select Start Date smaller or equal to End Date.",
        InvalidEmail: 'Please enter a valid Email ID.',
        RequiredEmail: 'Please enter a Email ID.',
        RequiredUserName: 'Please enter a User Name.',
        ManageUser_RequiredEmail: 'Please enter an Email Id.',
        ManageUser_InvalidEmail: 'Please enter a valid Email Id.',
        EnterTwoDecimalPlaceOnly: "Please enter two decimal places only.",
        InvalidDateValidation: 'Please enter a valid Date.',
        NumberMaxLengthValidation: "Maximum {MAXLENGTH} digits can be allowed.",
        DecimalValidation: "Please enter a valid Amount.",
        MaxlengthFieldValidation: "Maximum {MAXLENGTH} characters can be allowed in {FIELD_NAME}.",
        NumberFieldMaxLengthValidation: "Maximum {MAXLENGTH} digits can be allowed in {FIELD_NAME}.",
        Login_ValidEmailAddress: "Please enter valid Email ID.",
        Login_RequiredPassword: "Please enter a Password.",
        RequiredRoleId: "Please select Role.",
        RequiredFirstName: 'Please enter a First Name.',
        RequiredLastName: 'Please enter a Last Name.',
        RequiredLevel: 'Please select Level.',
        ValidEmail: "Please enter a valid Email ID.",
        RequiredRole: "Please enter a Role.",
        OnlyNumericValidation: "Please enter only numeric values in {FIELD_NAME}.",
        RequiredAccountName: "Please enter Account Name.",
        RequiredName: "Please enter a Name.",
        RequiredRoleName: "Please select a Role.",
        RequiredTransactionTypeId: "Please select a Transaction Type.",
        RequiredAccountTypeId: "Please select an Account Type.",
        RequiredAmount: "Please enter an Amount.",
        RequiredSourceColumn: "Please enter a Source Column Name.",
        RequiredEffectiveDate: "Please select Effective From.",
        RequiredTransactionMode: "Please select Transaction Mode.",
        RequiredCalculationLogin: "Please enter a Calculation Logic.",
        ValidateAmount: "Please enter a valid Amount Percentage.",
        RequiredAccountCode: "Please enter an Account Code.",
        ActiveDirectoryUserNotFound: "Please enter User Name.",
        UserNotAvailableInActiveDirectory: "We could not found user in Active Directory.",
        ValidContactInformation: "Please Enter Valid Contact Information.",
        RequiredAccountIdentity: "Please enter Account ID.",
        deleteNotValid: "Can't Delete. This rule contains single accounting entry for transaction type.",
        insertNotValid: "Can't Insert. This rule not contain single entry of CR/DR for transaction type.",
        RollBack: "RollBack",
        rollBackConfirm: "Are you sure you want to rollback ",
        RequiredRMID: "Please Enter Manager's NT Id.",
        RequiredLeapId: "Please Enter FOS Leap Id.",
        RequiredDTCode: "Please Enter FOS DT Code."
    }
}


function ExportToExcel() {
    var tokenVal = new Date().getTime();
    var reportId = jQuery("#ReportId").val();
    var isValid = true;
    if (reportId != "29" && reportId != "30") {
        isValid = jQuery("form").valid();
        if (reportId == "0") {
            isValid = false;
            jQuery('#rptIdErr').show();
        }
    }
    if (isValid) {
        jQuery("#download_form").remove();
        var download_form = document.createElement('FORM');
        //jQuery(download_form).html(jQuery('form').html());

        download_form.setAttribute('style', 'display:none; visibility:hidden');
        download_form.name = 'download_form';
        download_form.id = 'download_form';
        download_form.method = 'POST';
        download_form.action = BASEPATHURL + "/Report/ExportToExcel";
        var btnSubmit = document.createElement('INPUT');
        btnSubmit.id = 'btnExportToExcel';
        btnSubmit.type = 'submit';
        download_form.appendChild(btnSubmit);

        var reportEle = document.createElement('INPUT');
        reportEle.id = 'reportId';
        reportEle.name = 'reportId';
        reportEle.type = 'hidden';
        reportEle.value = jQuery("#ReportId").val();
        download_form.appendChild(reportEle);

        var reportYear = document.createElement('INPUT');
        reportYear.id = 'reportYear';
        reportYear.name = 'reportYear';
        reportYear.type = 'hidden';
        reportYear.value = jQuery("#ReportYear").val();
        download_form.appendChild(reportYear);

        var reportMonth = document.createElement('INPUT');
        reportMonth.id = 'reportMonth';
        reportMonth.name = 'reportMonth';
        reportMonth.type = 'hidden';
        reportMonth.value = jQuery("#ReportMonth").val();
        download_form.appendChild(reportMonth);

        var sId = jQuery("#SSEId").val();
        if (sId == undefined) {
            sId = null;
        }
        var sseId = document.createElement('INPUT');
        sseId.id = 'sseId';
        sseId.name = 'sseId';
        sseId.type = 'hidden';
        sseId.value = sId;
        download_form.appendChild(sseId);

        var token = document.createElement('INPUT');
        token.id = 'token';
        token.name = 'token';
        token.type = 'hidden';
        token.value = tokenVal;
        download_form.appendChild(token);

        jQuery(download_form).appendTo('body');
        jQuery("#btnExportToExcel").click();
        jQuery("#download_form").remove();

        ShowWaitDialog();
        window.setInterval(function () {
            var cookieValue = getCookie('fileDownloadToken');
            if (cookieValue == tokenVal)
                HideWaitDialog();
        }, 1000);

    }

}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function LoadJsFileIfNotLoaded(filePathToJSScript) {
    var list = document.getElementsByTagName('script');
    var i = list.length, flag = false;
    while (i--) {
        if (list[i].src == filePathToJSScript) {
            flag = true;
        }
    }
    if (!flag) {
        var tag = document.createElement('script');
        tag.src = filePathToJSScript;
        tag.type = "text/javascript";
        document.getElementsByTagName('body')[0].appendChild(tag);
    }

}

function OnSuccess(data, status, xhr) {
    try {
        if (data.IsSucceed) {
            AlertModal('Success', ParseMessage(data.Messages), true);
        } else {
            AlertModal('Error', ParseMessage(data.Messages));
        }
    }
    catch (e) {
        window.location.reload();
    }
}
function OnFailure(xhr, status, error) {
    try {
        AlertModal('Error', ResourceManager.Message.Error);
    }
    catch (e) { window.location.reload(); }
}

function SetRedBookOptionSelected() {
    isRedBookOptionSelected = true;
    SearchResult();
}

function BindAutoCompleteList(autoCompleteList, otherId) {
    var txtId = 'btn-input';
    if (otherId != undefined) {
        txtId = otherId;
    }
    var NoResultsLabel = "No Results";
    var autoComplete = jQuery("#" + txtId).autocomplete({
        source: autoCompleteList,
        //autoFocus: true,
        messages: {
            noResults: 'No records available.',
            results: function (count) {
                return count + (count > 1 ? ' results' : ' result ') + ' found';
            }
        },
        response: function (event, ui) {
            isConfReportItemSelected = false;
            if (ui.content.length == 0) {
                ui.content.push({ label: "other", value: "option" });
                elemAutocomplete._renderItem = function (ul, item) {
                    jQuery('#urlToRedirect').val("");
                    var defaultText = jQuery("<li class='ui-state-disabled ui-menu-item' role='presentation'><a id='aNoRecord' class='ui-corner-all' href='/Error/PageNotFound'><span class='ui-state-highlight'>No records found!</span> </a></li>").appendTo(ul);
                    //var dashboardText = jQuery("<li class='ui-menu-item' role='presentation'><a id='aDashBoard' class='ui-corner-all' href='Dashboard/' onclick='SetDashboardOptionSelected();'>Do you want to visit Dashboard?</a></li>").appendTo(ul);
                    //var redBookText = jQuery("<li class='ui-menu-item' role='presentation'><a id='aRedBook' class='ui-corner-all' href='#' onclick='SetRedBookOptionSelected();' >Do you want to search in Red-Book?</a></li>").appendTo(ul);
                    return defaultText;
                    //return defaultText + dashboardText + redBookText;
                }
            }
            else {
                elemAutocomplete._renderItem = function (ul, item) {
                    jQuery('#urlToRedirect').val("");
                    if (ui.content.length == 1) {
                        jQuery.each(valueList, function (key, val) {
                            if (val["Name"] == item.value) {
                                var arrForWords = item.value.split(' ');
                                var isWordMatched = false;
                                var valOfInputBtn = jQuery('#' + txtId).val();
                                var arrForEnteredWords = valOfInputBtn.split(' ');
                                for (var i = 0; i < arrForWords.length; i++) {
                                    for (var j = 0; j < arrForEnteredWords.length; j++) {
                                        if (arrForEnteredWords[j].toLowerCase() == arrForWords[i].toLowerCase()) {
                                            isWordMatched = true;
                                            break;
                                        }
                                    }
                                }
                                if (isWordMatched) {
                                    if (val["Value"].indexOf('http') > -1) {
                                        jQuery('#urlToRedirect').val(val["Value"]);
                                        isStaicMenuItemSelected = true;
                                        isConfReportItemSelected = val["Description"] == "True";
                                    }
                                    else {
                                        jQuery('#urlToRedirect').val(BASEPATHURL + val["Value"]);
                                        isStaicMenuItemSelected = false;
                                    }
                                }
                            }
                        });
                    }
                    var newText = String(item.value).replace(
                            new RegExp(this.term, "gi"),
                            "<span class='ui-state-highlight'>$&</span>");

                    return jQuery("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + newText + "</a>")
                        .appendTo(ul);
                };
            }
        },
        close: function () {
            this.value = ''
        },
        select: function (event, ui) {
            //var isDashboardUrl = false;
            var id = 0;
            isConfReportItemSelected = false;
            jQuery.each(valueList, function (key, val) {
                if (ui["item"] != undefined && val["Name"] == ui["item"]["value"]) {
                    id = val["OtherValue"];
                    if (val["Value"].indexOf('http') > -1) {
                        jQuery('#urlToRedirect').val(val["Value"]);
                        isStaicMenuItemSelected = true;
                        isConfReportItemSelected = val["Description"] == "True";
                    }
                    else {
                        if (window.location.href == BASEPATHURL + val["Value"]) {
                            AlertModal(getMessage("error"), "You are on same page.", BootstrapDialog.TYPE_DANGER, function () {
                            });
                            return false;
                        }
                        jQuery('#urlToRedirect').val(BASEPATHURL + val["Value"]);
                        isStaicMenuItemSelected = false;
                    }
                    SearchResult(id);
                }
                else if (ui["item"] == undefined) {
                    id = val["OtherValue"];
                    isDashboardSelected = true;
                }
            });
            if (isDashboardSelected) {
                jQuery('#urlToRedirect').val(BASEPATHURL + '/Dashboard');
                SearchResult(id);
            }
        }
    });
    var elemAutocomplete = autoComplete.data("ui-autocomplete") || autoComplete.data("autocomplete");
    if (elemAutocomplete) {
        elemAutocomplete._renderItem = function (ul, item) {
            var newText = String(item.value).replace(
                    new RegExp(this.term, "gi"),
                    "<span class='ui-state-highlight'>$&</span>");

            return jQuery("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + newText + "</a>")
                .appendTo(ul);
        };
    }
}

function SearchResult(id) {
    var searchVal = jQuery('#btn-input').val();
    if (searchVal == undefined || searchVal == '' || searchVal == null) {
        searchVal = jQuery('#btn-input-2').val();
    }

    var isPolicyNo = Math.floor(searchVal) == searchVal && jQuery.isNumeric(searchVal);
    if (isPolicyNo) {
        jQuery('#urlToRedirect').val(BASEPATHURL + "/Report/SearchPolicy?policyNo=" + searchVal);
    }
    else if (isRedBookOptionSelected === true) {
        jQuery('#urlToRedirect').val(BASEPATHURL + "/Master/RedBook?userName=" + searchVal);
    }
    else if (isDashboardSelected == true) {
        jQuery('#urlToRedirect').val(BASEPATHURL + "/Dashboard");
    }

    var arr = ['policy', 'claim', 'lead', 'email', 'mobile', 'name'];
    var notAccepted = ['management', 'the'];
    var newArr = [];
    var isPLCRequest = false;
    var isAhead = false;
    var detailOf = '';
    var detailValue = '';
    var regx = /^[A-Za-z]+$/;
    if (searchVal != '' && searchVal != undefined && searchVal != null) {
        newArr = searchVal.toLowerCase().trim().split(' ').filter(function (v) { return v !== '' });
        if (newArr.length > 0 && newArr[0].length > 1) {

            isAhead = regx.test(newArr[1]);
            for (var i = 0; i < notAccepted.length; i++) {
                if (searchVal.toLowerCase().indexOf(notAccepted[i]) > -1) {
                    isAhead = true;
                    break;
                }
            }
        }
        else {
            isAhead = true;
        }
        if (!isAhead) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(newArr[0]) > -1) {
                    if (newArr.length == 2) {
                        detailValue = searchVal.toLowerCase().replace(newArr[0] + ' ', '');
                        detailOf = arr[i];
                        isPLCRequest = true;
                        break;
                    }
                }
            }
        }

    }

    if (isPLCRequest) {
        window.location.href = BASEPATHURL + '/Dashboard/PLCDetails?detailOf=' + detailOf + '&detailValue=' + detailValue;
    }
    else {
        var urlToRedirect = jQuery('#urlToRedirect').val();

        if ((urlToRedirect != undefined && urlToRedirect != '' && urlToRedirect != null) || (isRedBookOptionSelected || isDashboardSelected)) {
            if (isStaicMenuItemSelected) {
                if (isConfReportItemSelected && urlToRedirect.indexOf(".pdf") > -1 && urlToRedirect.indexOf("http") > -1) {
                    window.open(BASEPATHURL + '/Home/ValidateIncomingPdf?pdfPath=' + urlToRedirect + '&title=' + searchVal, '_blank');
                }
                else
                    window.open(urlToRedirect, '_blank');
            }
            else {
                var urlToRedirect = jQuery('#urlToRedirect').val();
                if (urlToRedirect == BASEPATHURL) {
                    jQuery('#urlToRedirect').val(BASEPATHURL + "/Master/Search?sourceId=" + searchVal);
                }
                window.location.href = jQuery('#urlToRedirect').val();
            }
        }
        else {
            window.location.href = BASEPATHURL + "/Master/Search?sourceId=" + searchVal;
        }
    }
}

function onSuccessSearchResult(data) {
    window.location.href = jQuery('#urlToRedirect').val();
}

function SetDashboardOptionSelected() {
    isDashboardSelected = true;
}

function AjaxCallWithoutLoadingAndErrorMessage(options) {
    var url = options.url;
    var postData = options.postData;
    var httpmethod = options.httpmethod;
    var calldatatype = options.calldatatype;
    var sucesscallbackfunction = options.sucesscallbackfunction;
    var contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
    var showLoading = options.showLoading == undefined ? true : options.showLoading;
    var isAsync = options.isAsync == undefined ? true : options.isAsync;
    jQuery.ajax({
        type: httpmethod,
        url: url,
        data: postData,
        global: showLoading,
        dataType: calldatatype,
        contentType: contentType,
        async: isAsync,
        cache: false,
        success: function (data) {
            var flagForSession = true;
            if (typeof data != 'object') {
                var dataError;
                try {
                    dataError = jQuery.parseJSON(data);
                    if (dataError.Status == "ERROR") {
                        flagForSession = false;
                        window.location.href = BASEPATHURL + dataError.RedirectTo;
                    }
                } catch (e) {
                    flagForSession = true;
                }
            }
            if (data.Status != undefined && data.Status == "VALIDATION_ERROR" && flagForSession) {
                if (options.formId == undefined) {
                    ShowError(data.Data);
                }
                else {
                    ShowFormError(data.Data, options.formId);
                }
            }
            else {
                if (sucesscallbackfunction != '') {
                    value_changed = false;
                    eval(sucesscallbackfunction + '(data)');
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
}

// Bind file upload control
function BindFileUploadControl(options) {

    var mutilple = false;
    if (typeof options.MultipleFiles !== "undefined" && options.MultipleFiles !== null) {
        mutilple = (options.MultipleFiles) ? options.MultipleFiles : false;
    }

    var buttonText = "ATTACH";
    if (typeof options.ButtonText !== "undefined" && options.ButtonText !== null) {
        buttonText = options.ButtonText;
    }

    var hideFileSummary = false;
    if (typeof options.HideFileSummary !== "undefined" && options.HideFileSummary !== null) {
        hideFileSummary = options.HideFileSummary;
    }
    var DuplicateCheck = true;
    if (typeof options.DuplicateCheck !== "undefined" && options.DuplicateCheck !== null) {
        DuplicateCheck = options.DuplicateCheck;
    }
    var actionURL = "";
    actionURL = options.Url;
    var uploader = uploader = new qq.FileUploader(
    {
        element: document.getElementById(options.ElementId),
        params: options.Params,
        action: actionURL,
        multiple: mutilple,
        debug: true,
        maxFiles: 10,
        uploadButtonText: buttonText,
        allowedExtensions: options.AllowedExtensions,
        duplicateCheck: DuplicateCheck,
        onProgress: function (id, fileName, loaded, total) {
            if (hideFileSummary) {
                jQuery(".qq-upload-list").hide()
            }
        },
        onComplete: function (id, fileName, responseJSON) {
            if (hideFileSummary) {
                jQuery(".qq-upload-list").hide()
            }
            if (responseJSON.IsSucceed || responseJSON.IsSucceed === undefined) {
                if (typeof (responseJSON.IndividualUpload) !== "undefined" && responseJSON.IndividualUpload) {
                    if (responseJSON.Status) {
                        if (typeof options.CallBack !== "undefined" && options.CallBack !== null) {
                            eval(options.CallBack + "(responseJSON)");
                        }
                    } else {
                        AlertModal("Error", responseJSON.Message);
                    }
                }
                else if (typeof (responseJSON.FileId) !== "undefined" && responseJSON.FileId != null && responseJSON.FileId != '') {
                    if (typeof options.CallBack !== "undefined" && options.CallBack !== null) {
                        eval(options.CallBack + "(responseJSON)");
                    }
                }
                else {
                    AlertModal("Error", responseJSON.Message);
                    if (typeof options.CallBack !== "undefined" && options.CallBack !== null) {
                        eval(options.CallBack + "(responseJSON)");
                    }
                }
            }
            else {
                AlertModal("Error", responseJSON.Message);
            }
        },
        onCancel: function (id, fileName) {
            if (hideFileSummary) {
                jQuery(".qq-upload-list").hide()
            }
        },

        maxConnections: 2,
        messages: {
            typeError: "{file} type of {extensions} not allowed.",
            sizeError: "You can not upload file of size more than {sizeLimit}.",
            minSizeError: "File size must be atleast {minSizeLimit}.",
            maxFilesError: "You cannot upload more than {maxFiles} files.",
            alreadyExistError: "{file} is already uploaded. You cannot upload file with same name.",
            emptyError: "file can not be empty.",
            onLeave: "",
            InvalidCharacter: "{file} filename is invalid, Please verify and try again.<ul> " +
                "<li>Filename should not contains (~ # % & * { } \ : < > ? / + | \" ; ..) character(s)</li>" +
                "<li>Filename should not start with period(.) character</li>" +
                "<li>Filename should not contain consecutive period(.) character</li>" +
                "<li>Filename should not end with period(.) character</li>" +
                "</ul>"
        },
        showMessage: function (message) {
            AlertModal("Error", message);
        }
    });
}

function showToken(currentToken) {
    // Show token in console and UI.
    var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
        AjaxCallWithoutLoadingAndErrorMessage({ url: BASEPATHURL + "/Master/SaveWebNotificationToken", postData: { Value: currentToken, Name: curUName }, httpmethod: 'POST', calldatatype: 'JSON', sucesscallbackfunction: '' });
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission()
    .then(function () {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // [START_EXCLUDE]
        // In many cases once an app has been granted notification permission, it
        // should update its UI reflecting this.
        resetUI();
        // [END_EXCLUDE]
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    });
    // [END request_permission]
}

function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken()
    .then(function (currentToken) {
        messaging.deleteToken(currentToken)
        .then(function () {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            // [START_EXCLUDE]
            // Once token is deleted update UI.
            resetUI();
            // [END_EXCLUDE]
        })
        .catch(function (err) {
            console.log('Unable to delete token. ', err);
        });
        // [END delete_token]
    })
    .catch(function (err) {
        console.log('Error retrieving Instance ID token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
    });
}

// Add a message to the messages element.
function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;'
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
}

// Clear the messages element of all children.
function clearMessages() {
    const messagesElement = document.querySelector('#messages');
    while (messagesElement.hasChildNodes()) {
        messagesElement.removeChild(messagesElement.lastChild);
    }
}

function resetUI() {
    messaging.getToken()
    .then(function (currentToken) {
        if (currentToken) {
            sendTokenToServer(currentToken);
            //updateUIForPushEnabled(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            //updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    })
    .catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });
}

function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
// [END write_fan_out]

function createNewComment(postId, username, uid, text) {
    firebase.database().ref('post-comments/' + postId).push({
        text: text,
        author: username,
        uid: uid
    });
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function onAuthStateChanged(user) {
    // We ignore token refresh events.
    if (user && currentUID === user.uid) {
        return;
    }

    if (user) {
        currentUID = user.uid;
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    } else {
        currentUID = null;
    }
}

function OpenUrl()
{
    clients.openWindow(valll)
}
