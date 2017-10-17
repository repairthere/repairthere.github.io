/*=================FIRST & SECTION (DEVICE CHOICE & ISSUE CHOICE)===================*/

/*-------SETS CAR'S FIRST POSITION ON INITIALIZATION OF PAGE(LEFT TOP)----------*/
function initiateCar() {
    setTimeout(function () {
        document.getElementById("car0").style.left = "13%";
    }, 100);
}

function phoneInputGoToNext(element) {
    if (element.id != "area3" && element.id == "area") {
        if (element.value.length == 3) {
            document.getElementById("area2").focus();
        }
    } else if (element.id != "area3" && element.id == "area2") {
        if (element.value.length == 3) {
            document.getElementById("area3").focus();
        }
    }
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('ad')),
        { types: ['geocode'] });
}

/*=====FIX EDIT BUTTONS ON TOP OF PAGE. ONLY CLICK ON NAME OR ICON CAN TAKE TO SECTION====*/
/*--------SETS EVENTLISTENERS FOR ELEMENTS IN 1 & 2 SECTION--------*/
function sectionOneTwoEventListen() {
    pageState = "Section1";
    issues = [];
    var deviceSelection = document.getElementById("father");      //1.First Section [A]. (Choose Type of Device)
    var deviceEditButton = document.getElementById("editDevice");
    var modelSelection = document.getElementById("son");        //1.First Section[B]. (Choose Model of Device)
    var issueEditButton = document.getElementById("editIssue");
    var galaxyNoteOrS = document.getElementById("chooseSam");       //1/2. When Samsung is selected, asks if it is Note or S.
    var issuesButtons = document.getElementById("butCont");      //2. Second Section[A] (Choose Issues with Device)
    var priceContainer = document.getElementById("contin");     //2. Second Section[B] (Price at Bottom of Page/Button to Continue)
    var finalPageDeviceChange = document.getElementById("deviceClickTY");
    var finalPageIssueChange = document.getElementById("issueClickTY");
    deviceSelection.addEventListener("mouseover", deviceMouseover, false);
    deviceSelection.addEventListener("mouseout", deviceMouseout, false);
    deviceSelection.addEventListener('click', deviceClick, false);
    deviceEditButton.addEventListener('click', editSelectedDevice, false);
    modelSelection.addEventListener('click', modelClick, false);
    issueEditButton.addEventListener('click', editSelectedIssues, false);
    galaxyNoteOrS.addEventListener('click', deviceClick, false);
    issuesButtons.addEventListener('mouseover', issuesMouseover, false);
    issuesButtons.addEventListener('mouseout', issuesMouseout, false);
    issuesButtons.addEventListener('click', issuesClick, false);
    priceContainer.addEventListener('click', priceContainerCheck, false);
    finalPageDeviceChange.addEventListener('click', editSelectedDevice, false);
    finalPageIssueChange.addEventListener('click', editSelectedIssues, false);
    document.getElementById("infoNClick").addEventListener('click', editForm, false);
    document.getElementById("infoDClick").addEventListener('click', editForm, false);
    document.getElementById("infoTClick").addEventListener('click', editForm, false);
    document.getElementById("infoPNClick").addEventListener('click', editForm, false);
    document.getElementById("infoEClick").addEventListener('click', editForm, false);
    document.getElementById("infoAClick").addEventListener('click', editForm, false);
}

/*----CHECKS TO SEE IF PRICE CONTAINER/BUTTON HAD BEEN PRESSED ALREAD-----*/
/*----IF NOT, IN SECOND SECTION & ADDS CLASS, ELSE IN THIRD SECTION,-------*/
/*----THEN SENDS FORM AFTER VALIDATION ----*/
function priceContainerCheck(e) {
    var ID = e.target.id;
    if (document.getElementById(ID).classList.contains("PRESSED")) {
        var repairInfo = getRepairInfo();
        var isFormValid = validateForm(repairInfo);
        if (isFormValid == true) {
            //sendToSpree();
            completeLastPage(repairInfo);
        }
    } else {
        if (issues.length > 1) {
            document.getElementById("issue1").innerText = issues[0];
            document.getElementById("issue2").innerText = " + " + (issues.length - 1);
            document.getElementById("contin").innerText = "Submit";
            document.getElementById("contin").classList.add("PRESSED");
            doStep3();
        } else if (issues.length == 1) {
            document.getElementById("issue1").innerText = document.getElementById(issues[0]).innerText;
            document.getElementById("contin").innerText = "Submit";
            document.getElementById("contin").classList.add("PRESSED");
            doStep3();
        } else {
            swal({
                title: '<i>MUST SELECT AN ISSUE</i>',
                showCloseButton: true,
            })
        }
    }
}

/*-------CHECKS WHICH TYPE OF DEVICE WAS CLICKED ON IN 1[A] SECTION------------*/
function deviceClick(e) {
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        changeFirstStep();
        document.getElementById("typePHO").innerText = "iPhone";
        document.getElementById("apple").style.left = "0px";
        document.getElementById("apple").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        document.getElementById("typePHO").innerText = "Galaxy";
        document.getElementById("father").style.bottom = "-150%";
        document.getElementById("father").style.top = "100%";
        document.getElementById("model").style.left = "0px";
        document.getElementById("model").style.right = "0px";
        document.getElementById("chooseSam").style.left = "0px";
        document.getElementById("chooseSam").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        changeFirstStep();
        document.getElementById("typePHO").style.display = "none";
        document.getElementById("typePHO").innerText = "Pixel";
        document.getElementById("pixel").style.left = "0px";
        document.getElementById("pixel").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        changeFirstStep();
        document.getElementById("typePHO").innerText = "iPad";
        document.getElementById("ipad2").style.left = "0px";
        document.getElementById("ipad2").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galChoice") || (e.target.id == "chG"))) {
        document.getElementById("chooseSam").style.bottom = "-150%";
        document.getElementById("chooseSam").style.top = "100%";
        document.getElementById("samsung").style.left = "0";
        document.getElementById("samsung").style.right = "0";
        document.getElementById("son").style.zIndex = "2000";
        setTimeout(function () {
            document.getElementById("chooseSam").style.bottom = "0";
            document.getElementById("chooseSam").style.top = "55.4%";
            document.getElementById("chooseSam").style.right = "-100%";
            document.getElementById("chooseSam").style.left = "100%";
        }, 1000);
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "noteChoice") || (e.target.id == "chN"))) {
        document.getElementById("chooseSam").style.bottom = "-150%";
        document.getElementById("chooseSam").style.top = "100%";
        document.getElementById("galNote").style.left = "0";
        document.getElementById("galNote").style.right = "0";
        document.getElementById("son").style.zIndex = "2000";
        setTimeout(function () {
            document.getElementById("chooseSam").style.bottom = "0";
            document.getElementById("chooseSam").style.top = "55.4%";
            document.getElementById("chooseSam").style.right = "-100%";
            document.getElementById("chooseSam").style.left = "100%";
        }, 1000);
    }
}

/*-------CHECKS WHICH MODEL WAS CLICKED ON IN 1[B] SECTION------------*/
function modelClick(e) {
    var phonePress = e.target;
    var classOf = phonePress.className;

    if (classOf == "iphTex2" || classOf == "iphMod") {
        document.getElementById("apple").style.bottom = "-150%";
        document.getElementById("apple").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        console.log("READ");
        doStep2();
        setTimeout(function () {
            document.getElementById("apple").style.bottom = "0";
            document.getElementById("apple").style.top = "37.8%";
            document.getElementById("apple").style.right = "-100%";
            document.getElementById("apple").style.left = "100%";
        }, 1000);
    }
    else if (classOf == "samTex2" || classOf == "sMod") {
        document.getElementById("samsung").style.bottom = "-250%";
        document.getElementById("samsung").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
        setTimeout(function () {
            document.getElementById("samsung").style.bottom = "0";
            document.getElementById("samsung").style.top = "37.8%";
            document.getElementById("samsung").style.right = "-100%";
            document.getElementById("samsung").style.left = "100%";
        }, 1000);
    }
    else if (classOf == "galTex2" || classOf == "gMod") {
        document.getElementById("galNote").style.bottom = "-250%";
        document.getElementById("galNote").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
        setTimeout(function () {
            document.getElementById("galNote").style.bottom = "0";
            document.getElementById("galNote").style.top = "37.8%";
            document.getElementById("galNote").style.right = "-100%";
            document.getElementById("galNote").style.left = "100%";
        }, 1000);
    }
    else if (classOf == "pixTex2" || classOf == "pMod") {
        document.getElementById("pixel").style.bottom = "-150%";
        document.getElementById("pixel").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
        setTimeout(function () {
            document.getElementById("pixel").style.bottom = "0";
            document.getElementById("pixel").style.top = "10%";
            document.getElementById("pixel").style.right = "-100%";
            document.getElementById("pixel").style.left = "100%";
        }, 1000);
    }
    else if (classOf == "ipadTex2" || classOf == "ipadMod") {
        document.getElementById("ipad2").style.bottom = "-150%";
        document.getElementById("ipad2").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
        setTimeout(function () {
            document.getElementById("ipad2").style.bottom = "0";
            document.getElementById("ipad2").style.top = "0";
            document.getElementById("ipad2").style.right = "-100%";
            document.getElementById("ipad2").style.left = "100%";
        }, 1000);
    }
}

function dateWord(date) {

}
/*=============THIRD SECTION (THANK YOU & UPDATE REQUESTS)===============*/

/*-------FILLS IN THANK YOU PAGE--------*/
function completeLastPage(obj) {

    var dateSplit = obj.time.split(" - ");
    var phoneAreaCode = obj.phoneNum.substr(0, 3);
    var phoneFirst3 = obj.phoneNum.substr(3, 3);
    var phoneLast4 = obj.phoneNum.substr(6, 4);
    var phoneString = "(" + phoneAreaCode + ") " + phoneFirst3 + "-" + phoneLast4;
    console.log(phoneLast4);
    document.getElementById("acDevice").innerText = obj.phoneType;
    document.getElementById("acRepair").innerText = obj.repair;
    document.getElementById("acName").innerText = obj.name;
    document.getElementById("acTotal").innerText = obj.total;
    document.getElementById("acEmail").innerText = obj.email;
    document.getElementById("acDate").innerText = dateSplit[0];
    document.getElementById("acTime").innerText = dateSplit[1];
    document.getElementById("acPhone").innerText = phoneString;
    document.getElementById("acAddress").innerText = obj.address;

    //document.getElementById("fourth-panel").style.backgroundImage = "url(wood.jpg)";
    //document.getElementById("fourth-color").style.backgroundColor = "#f7f8db";
    //document.getElementById("fourth-color").style.opacity = ".8";
    //document.getElementById("contToHide").style.opacity = "0";
    //document.getElementById("botPrice").style.bottom = "-150%";
    //document.getElementById("forma").style.opacity = "0";
    ////setTimeout(function () { document.getElementById("forma").style.opacity = "1", 100 });
    //document.getElementById("forma").style.zIndex = "-100";
    document.getElementById("message").style.zIndex = "20000";
    document.getElementById("message").style.opacity = "1";
    pageState = "SectionThankYou";
}

/*------FUNCTION TO SEND FORM TO FormSpree------*/
function sendToSpree(data) {
    var newObj = param(data),
        xhr = new XMLHttpRequest();

    xhr.open('POST', '//formspree.io/vrchavez05@gmail.com');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseText !== newObj) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(newObj);
}

/*-------SETS PARAMETERS OF URI(URL) OF AJAX REQUEST-------*/
function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

/*-------RETURNS ALL CHOICES USER MADE IN SCHEDULING REPAIR------*/
function getRepairInfo() {
    var name = document.getElementById("fn").value;
    var address = document.getElementById("ad").value;
    var time = document.getElementById("dateTimeInput").value;
    var email = document.getElementById("ct").value;
    var total = document.getElementById("est2").innerText;
    var phoneType;
    var text = document.getElementById("typePHO").innerText;
    var text2 = document.getElementById("modelPHO").innerText;
    var repair = "";
    var phoneNum;
    var area = document.getElementById("area").value;
    var area2 = document.getElementById("area2").value;
    var area3 = document.getElementById("area3").value;

    phoneNum = area + area2 + area3;

    for (var x in issues) {
        if (repair == "") {
            repair += issues[x];
        } else {
            repair += " + " + issues[x];
        }
    }

    if (text == "Pixel") {
        phoneType = text2;
    } else {
        phoneType = text + " " + text2;
    }

    var personData = {
        name: name,
        address: address,
        phoneNum: phoneNum,
        time: time,
        email: email,
        phoneType: phoneType,
        repair: repair,
        total: total
    }

    return personData;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/*-----EACH ERROR ELEMENT IS NAMED AS info KEYS + "Empty" AND IF VALUE------*/
/*-----IS EMPTY SETS ERROR ELEMENT OPACITY TO 0 ELSE SETS OPACITY TO 1--------*/
function validateForm(info) {
    var isValid = true;
    for (var x in info) {
        if (x != "phoneType" && x != "repair" && x != "total") {
            if (info[x] == "") {
                document.getElementById(x + "Empty").style.opacity = "1";
                isValid = false;
            } else if (info[x] != "") {
                if (x == "phoneNum") {
                    if (isNaN(info[x])) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        isValid = false;
                    } else if (x == "phoneNum" && info[x].length != 10) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        isValid = false;
                    } else {
                        document.getElementById(x + "Empty").style.opacity = "0";
                    }
                } else if (x == "email") {
                    var validEmail = validateEmail(info[x]);
                    console.log(validEmail);
                    console.log(info[x]);
                    if (validEmail == false) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        isValid = false;
                    } else {
                        document.getElementById(x + "Empty").style.opacity = "0";
                    }
                } else {
                    document.getElementById(x + "Empty").style.opacity = "0";
                }
            }
        }
    }
    return isValid;
}

/*------SECTION 2 HANDLES CLICK OF ISSUE BUTTONS AND CONTINUE--------*/
/*-------PRICE CONTAINER/ BUTTON BOTTOM OF PAGE--------*/
function issuesClick(e) {
    var ID = e.target.id;
    var clas = e.target.classList;
    var phoneType = document.getElementById("typePHO").innerText;
    var phoneModel = document.getElementById("modelPHO").innerText;
    var subtract = 0;           //used with "hasPrice()" function to subtract from total
    var add = 1;                //used with "hasPrice()" function to add to total

    if ((ID != "OTH") && (ID != "contin") && (e.target.classList.contains("butt"))) {
        if (document.getElementById(ID).classList.contains("PRESSED")) {
            document.getElementById(ID).style.backgroundColor = "#5b5b5b";
            document.getElementById(ID).style.textDecoration = "none";
            document.getElementById(ID).classList.remove("PRESSED");
            hasPrice(ID, phoneType, phoneModel, subtract);
            for (var w = 0; w < issues.length; w++) {
                if (ID == issues[w]) {
                    for (var d = w; d < issues.length; d++) {
                        if (d != (issues.length - 1)) {
                            issues[d] = issues[d + 1];
                        } else {
                            issues.pop();
                        }
                    }
                }
            }
        } else {
            document.getElementById(ID).style.backgroundColor = "#804D56";
            document.getElementById(ID).style.textDecoration = "line-through";
            keepPressed(ID);
            document.getElementById(ID).classList.add("PRESSED");
            issues.push(ID);
            hasPrice(ID, phoneType, phoneModel, add);
        }
    }
}

/*--------SETS PRICE ON BOTTOM OF PAGE CONTAINER/BUTTON-------*/
function hasPrice(ID, INFO, INFO2, sign) {
    var total = parseInt(document.getElementById("est2").innerText);
    var prices = {
        headphone: 75
        , volume: 75
        , charger: 75
        , camera: 75
        , home: 75
        , lock: 75
    }
    var screen = {
        "iPhone": {
            '5': 75, '5c': 75, '5s': 75, '6': 95,
            '6Plus': 110, '6s': 120, '6sPlus': 125,
            'SE': 150, '7': 189, '7Plus': 209
        },
        "Galaxy": {
            's3': 100, 's4': 100, 's5': 190,
            's6': 190, 's7': 229, 'Note 3': 155, 'Note 4': 160,
            'Note 5': 200, 'Note 6': 200, 'Note 7': 225
        },
        "Pixel": {
            "Pixel": 129, "PixelXL": 149
        }
    }
    if (ID != "screen") {
        for (var key in prices) {
            if (ID == key) {
                if (sign == 0) {
                    total -= prices[key];
                } else {
                    total += prices[key];
                }
            }
        }
    } else {
        for (var key in screen) {
            if (INFO == key) {
                var obj = screen[key];
                for (var prop in obj) {
                    if (INFO2 == prop) {
                        if (sign == 0) {
                            total -= obj[prop];
                        } else {
                            total += obj[prop];
                        }
                    }
                }
            }
        }
    }
    document.getElementById("est2").innerText = total;
}

/*------SHOWS ELEMENT SHOWCASING REPAIR AREA ON CELL PHONE------*/
/*--------------WHEN BUTTON IS PRESSED---------------*/
function keepPressed(ID) {
    if (ID == 'headphone') {
        document.getElementById("circle").style.opacity = "1";
    } else if (ID == "volume") {
        document.getElementById("circleDos").style.opacity = "1";
    } else if (ID == "screen") {
        document.getElementById("iPhRep").src = "https://i.imgur.com/acPJTo5.png";
    } else if (ID == "charger") {
        document.getElementById("circleSiete").style.opacity = "1";
    } else if (ID == "camera") {
        document.getElementById("circleSeis").style.opacity = "1";
    } else if (ID == "home") {
        document.getElementById("circleQuatro").style.opacity = "1";
    } else if (ID == "lock") {
        document.getElementById("circleTres").style.opacity = "1";
    }
}

/*------SHOWS ELEMENT SHOWCASING REPAIR AREA ON CELL PHONE------*/
/*--------------WHEN BUTTON IS HOVERED OVER---------------*/
function issuesMouseover(e) {
    var ID = e.target.id;
    if (!(e.target.classList.contains("PRESSED"))) {
        if (ID == 'headphone') {
            document.getElementById("circle").style.opacity = "1";
        } else if (ID == "volume") {
            document.getElementById("circleDos").style.opacity = "1";
        } else if (ID == "screen") {
            document.getElementById("iPhRep").src = "https://i.imgur.com/acPJTo5.png";
        } else if (ID == "charger") {
            document.getElementById("circleSiete").style.opacity = "1";
        } else if (ID == "camera") {
            document.getElementById("circleSeis").style.opacity = "1";
        } else if (ID == "home") {
            document.getElementById("circleQuatro").style.opacity = "1";
        } else if (ID == "lock") {
            document.getElementById("circleTres").style.opacity = "1";
        }
    }
}

/*------HIDES ELEMENT SHOWCASING REPAIR AREA ON CELL PHONE------*/
/*--------------WHEN MOUSEOUT OF BUTTON---------------*/
function issuesMouseout(e) {
    var ID = e.target.id;
    if (!(e.target.classList.contains("PRESSED"))) {
        if (ID == 'headphone') {
            document.getElementById("circle").style.opacity = "0";
        } else if (ID == "volume") {
            document.getElementById("circleDos").style.opacity = "0";
        } else if (ID == "screen") {
            document.getElementById("iPhRep").src = "http://i.imgur.com/URpk0b5.png";
        } else if (ID == "charger") {
            document.getElementById("circleSiete").style.opacity = "0";
        } else if (ID == "camera") {
            document.getElementById("circleSeis").style.opacity = "0";
        } else if (ID == "home") {
            document.getElementById("circleQuatro").style.opacity = "0";
        } else if (ID == "lock") {
            document.getElementById("circleTres").style.opacity = "0";
        }
    }
}

/*-------CHANGES PAGE STATE WHEN EDIT DEVICE BUTTON IS PRESSED-------*/
function editSelectedDevice(e) {
    if (pageState == "Section2") {
        undoSection2();
    } else if (pageState == "Section3") {
        undoSection2();
        undoSection3();
    } else if (pageState == "SectionThankYou") {
        undoSection2();
        undoSection3();
        setTimeout(function () { document.getElementById("forma").style.opacity = "1" }, 1400);
        setTimeout(function () { document.getElementById("forma").style.zIndex = "auto" }, 1400);
        document.getElementById("message").style.zIndex = "-1000";
        document.getElementById("fourth-panel").style.backgroundImage = "url(https://i.imgur.com/mPaWXt6.jpg)";
        document.getElementById("fourth-color").style.backgroundColor = "#c0dfd9";
        document.getElementById("fourth-color").style.opacity = ".93";
        document.getElementById("contToHide").style.opacity = "1";
    }
    setTimeout(function () { document.getElementById("car0").style.left = "13%" }, 45);
    setTimeout(function () { document.getElementById("typePHO").style.display = "inline" }, 500);
    document.getElementById("father").style.bottom = "0";
    document.getElementById("father").style.top = "50%";
    document.getElementById("st1").style.color = "#723a44";         //SETS COLOR OF STEP1 ON TOP OF PAGE (RED TO BLACK)
    document.getElementById("hidONE").style.display = "none";     //SHOWS CHECKMARK INSTEAD OF #1
    document.getElementById("ONE").innerText = "1.";                  //REMOVES # 1 TO PUT A CHECKMARK THERE
    document.getElementById("ONE").style.display = "inline";         //  ^^^^^^^^^^
    document.getElementById("st1").style.boxSizing = "border-box";
    document.getElementById("st1").style.boxShadow = "inset 0px 0px 0px 2px #31312d";
    document.getElementById("st1").style.backgroundColor = "#f7f8db";
    document.getElementById("st1TX").style.top = "-100%";
    document.getElementById("contin").style.width = "11%";
    document.getElementById("contin").style.height = "6.3%";
    document.getElementById("contin").style.backgroundColor = "#31312d";
}

/*-------CHANGES PAGE STATE WHEN EDIT DEVICE BUTTON IS PRESSED-------*/
function editSelectedIssues(e) {
    if (pageState == "Section3") {
        undoSection3();
        goBackToSection2();
        doStep2();
    } else if (pageState == "SectionThankYou") {
        setTimeout(function () { document.getElementById("forma").style.opacity = "1" }, 1400);
        setTimeout(function () { document.getElementById("forma").style.zIndex = "auto" }, 1400);
        document.getElementById("message").style.zIndex = "-1000";
        document.getElementById("fourth-panel").style.backgroundImage = "url(https://i.imgur.com/mPaWXt6.jpg)";
        document.getElementById("fourth-color").style.backgroundColor = "#c0dfd9";
        document.getElementById("fourth-color").style.opacity = ".93";
        document.getElementById("contToHide").style.opacity = "1";
        undoSection3();
        goBackToSection2();
    }
}

function editForm() {
    setTimeout(function () { document.getElementById("forma").style.opacity = "1" }, 1400);
    setTimeout(function () { document.getElementById("forma").style.zIndex = "auto" }, 1400);
    document.getElementById("message").style.zIndex = "-1000";
    document.getElementById("fourth-panel").style.backgroundImage = "url(https://i.imgur.com/mPaWXt6.jpg)";
    document.getElementById("fourth-color").style.backgroundColor = "#c0dfd9";
    document.getElementById("fourth-color").style.opacity = ".93";
    document.getElementById("contToHide").style.opacity = "1";
}

function goBackToSection2() {
    document.getElementById("contin").style.width = "11%";
    document.getElementById("contin").style.height = "6.3%";
    document.getElementById("contin").style.backgroundColor = "#31312d";
    var issueButtons = document.querySelectorAll(".butt");
    document.getElementById("issue2").innerText = "";
    issues.length = 0;
    console.log(issues);
    for (i = 0; i < issueButtons.length; i++) {
        if (issueButtons[i].style.backgroundColor != "#5b5b5b") {
            issueButtons[i].style.backgroundColor = "#5b5b5b";
            issueButtons[i].style.textDecoration = "none";
            var ID = issueButtons[i].id;
            if (issueButtons[i].classList.contains("PRESSED")) {
                if (ID == 'headphone') {
                    document.getElementById("circle").style.opacity = "0";
                } else if (ID == "volume") {
                    document.getElementById("circleDos").style.opacity = "0";
                } else if (ID == "screen") {
                    document.getElementById("iPhRep").src = "http://i.imgur.com/URpk0b5.png";
                } else if (ID == "charger") {
                    document.getElementById("circleSiete").style.opacity = "0";
                } else if (ID == "camera") {
                    document.getElementById("circleSeis").style.opacity = "0";
                } else if (ID == "home") {
                    document.getElementById("circleQuatro").style.opacity = "0";
                } else if (ID == "lock") {
                    document.getElementById("circleTres").style.opacity = "0";
                }
                issueButtons[i].classList.remove("PRESSED");
            }
        }
    }
    doStep2();
}

/*-------UNDOES ALL OF SECTION 2--------*/
function undoSection2() {
    issues.length = 0;
    setTimeout(function () {
        document.getElementById("st2").style.width = "27%";
        document.getElementById("st2").style.top = "18%";
        document.getElementById("st2").style.color = "#31312d";
        document.getElementById("TWO").style.fontSize = "45px";
        document.getElementById("TWO").style.color = "#31312d";
    }, 500);
    var issueButtons = document.querySelectorAll(".butt");
    for (i = 0; i < issueButtons.length; i++) {
        if (issueButtons[i].style.backgroundColor != "#5b5b5b") {
            issueButtons[i].style.backgroundColor = "#5b5b5b";
            issueButtons[i].style.textDecoration = "none";
            var ID = issueButtons[i].id;
            if (issueButtons[i].classList.contains("PRESSED")) {
                if (ID == 'headphone') {
                    document.getElementById("circle").style.opacity = "0";
                } else if (ID == "volume") {
                    document.getElementById("circleDos").style.opacity = "0";
                } else if (ID == "screen") {
                    document.getElementById("iPhRep").src = "http://i.imgur.com/URpk0b5.png";
                } else if (ID == "charger") {
                    document.getElementById("circleSiete").style.opacity = "0";
                } else if (ID == "camera") {
                    document.getElementById("circleSeis").style.opacity = "0";
                } else if (ID == "home") {
                    document.getElementById("circleQuatro").style.opacity = "0";
                } else if (ID == "lock") {
                    document.getElementById("circleTres").style.opacity = "0";
                }
                issueButtons[i].classList.remove("PRESSED");
            }
        }
    }
    document.getElementById("est2").innerText = '0';
    document.getElementById("botPrice").style.bottom = "-40%";
    document.getElementById("contin").style.display = "none";
    document.getElementById("st2").style.boxShadow = "none";
    document.getElementById("st2").style.backgroundColor = "transparent";
    document.getElementById("VP").style.zIndex = "-200";
    document.getElementById("iPhRep").style.top = "-100%";        //55% initial
    document.getElementById("locT").style.right = "-100%";
    document.getElementById("jBCon").style.left = "-100%";
    document.getElementById("volT").style.left = "-100%";
    document.getElementById("scrT").style.left = "-100%";
    document.getElementById("charT").style.left = "-100%";
    document.getElementById("camT").style.right = "-100%";
    document.getElementById("oth").style.right = "-100%";
    document.getElementById("homT").style.right = "-100%";
    document.getElementById("circle").style.bottom = "-100%";     //JACK
    document.getElementById("circleDos").style.bottom = "-100%";    //*VOL
    document.getElementById("circleSiete").style.bottom = "-100%";   //*CHARGEPORT
    document.getElementById("circleSeis").style.bottom = "-100%"; //CAM/SPEAKER
    document.getElementById("circleTres").style.bottom = "-100%"; //*LOCK
    document.getElementById("circleQuatro").style.bottom = "-100%";
}

function undoSection3() {
    document.getElementById("formuLation").style.opacity = "0";
    setTimeout(function () { document.getElementById("formuLation").style.opacity = "1" }, 1400);
    document.getElementById("contin").classList.remove("PRESSED");
    document.getElementById("contin").innerText = "Continue";
    document.getElementById("contin").style.backgroundColor = "#31312d";
    document.getElementById("st3").style.boxShadow = "none";
    document.getElementById("st3").style.backgroundColor = "transparent";
    document.getElementById("st3").style.color = "#31312d";
    document.getElementById("hidTWO").style.display = "none";
    document.getElementById("TWO").innerText = "2";
    document.getElementById("TWO").style.display = "inline";
    document.getElementById("st2TX").style.top = "-100%";
    setTimeout(function () {
        document.getElementById("st3").style.width = "27%";
        document.getElementById("st3").style.top = "18%";
        document.getElementById("st3").style.color = "#31312d";
        document.getElementById("THREE").style.fontSize = "45px";
        document.getElementById("THREE").style.color = "#31312d";
    }, 500);
    document.getElementById("forma").style.left = "-100%";
    document.getElementById("forma").style.right = "100%";
    document.getElementById("est2").innerText = '0';
    document.getElementById("botPrice").style.bottom = "-40%";
    document.getElementById("st2").style.boxShadow = "none";
    document.getElementById("st2").style.backgroundColor = "transparent";
}

/*-----------TRANSITIONS FROM SECTION1 TO SECTION2-----------*/
function doStep2() {
    setTimeout(function () {
        document.getElementById("son").style.zIndex = -200
    }, 900);                                                                //  << HIDES MODEL SELECTION SECTION (1[B])
    document.getElementById("model").style.left = "100%";
    document.getElementById("model").style.right = "-100%";
    document.getElementById("st1").style.border = "none";
    document.getElementById("st1").style.boxShadow = "none";
    document.getElementById("st1").style.backgroundColor = "transparent";
    /*==========CHANGE COLOR AND SIZE OF STEP1============*/
    //document.getElementById("st1").style.fontSize = "29px";
    //document.getElementById("st1").style.width = "23%";
    //document.getElementById("st1").style.top = "20%";
    document.getElementById("st1").style.color = "#31312d";         //SETS COLOR OF STEP1 ON TOP OF PAGE (RED TO BLACK)
    document.getElementById("hidONE").style.display = "inline";     //SHOWS CHECKMARK INSTEAD OF #1
    document.getElementById("ONE").innerText = "";                  //REMOVES # 1 TO PUT A CHECKMARK THERE
    document.getElementById("ONE").style.display = "none";          //  ^^^^^^^^^^
    document.getElementById("st1TX").style.top = "28%";             //STEP ONE EDIT BUTTON HERE

    setTimeout(function () { document.getElementById("car0").style.left = "47.4%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP2 TEXT CENTER TOP OF PAGE============*/
    setTimeout(function () {
        document.getElementById("st2").style.color = "#723a44";
        document.getElementById("TWO").style.fontSize = "45px";
        document.getElementById("TWO").style.color = "#723a44";
        document.getElementById("st2").style.boxSizing = "border-box";
        document.getElementById("st2").style.boxShadow = "inset 0px 0px 0px 2px #31312d";
        document.getElementById("st2").style.backgroundColor = "#f7f8db";
    }, 550);

    document.getElementById("VP").style.zIndex = "200";
    document.getElementById("iPhRep").style.top = "44%";        //55% initial
    document.getElementById("locT").style.right = "9%";
    document.getElementById("jBCon").style.left = "9%";
    document.getElementById("volT").style.left = "9%";
    document.getElementById("scrT").style.left = "9%";
    document.getElementById("charT").style.left = "9%";
    document.getElementById("camT").style.right = "9%";
    document.getElementById("oth").style.right = "9%";
    document.getElementById("homT").style.right = "9%";
    document.getElementById("circle").style.bottom = "53%";     //JACK
    document.getElementById("circleDos").style.bottom = "41%";    //*VOL
    document.getElementById("circleSiete").style.bottom = "12%";   //*CHARGEPORT
    document.getElementById("circleSeis").style.bottom = "52.2%"; //CAM/SPEAKER
    document.getElementById("circleTres").style.bottom = "43%"; //*LOCK
    document.getElementById("circleQuatro").style.bottom = "16.4%";    //*HOME
    document.getElementById("botPrice").style.bottom = "0";
    document.getElementById("contin").style.display = "inline";
    pageState = "Section2";
}


/*---------TRANSITIONS FROM SECTION2 TO SECTION3-----------*/
function doStep3() {
    /*==========CHANGE COLOR AND SIZE OF STEP2============*/
    //document.getElementById("st2").style.fontSize = "29px";
    //document.getElementById("st2").style.width = "23%";
    //document.getElementById("st2").style.top = "20%";
    document.getElementById("botPrice").style.bottom = "-40%";
    document.getElementById("contin").style.width = "14%";
    document.getElementById("contin").style.height = "9%";
    document.getElementById("st2").style.boxShadow = "none";
    document.getElementById("st2").style.backgroundColor = "transparent";
    document.getElementById("st2").style.color = "#31312d";
    document.getElementById("hidTWO").style.display = "inline";
    document.getElementById("TWO").innerText = "";
    document.getElementById("TWO").style.display = "none";
    document.getElementById("st2TX").style.top = "28%";

    setTimeout(function () { document.getElementById("car0").style.left = "80.5%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP3============*/
    setTimeout(function () {
        document.getElementById("st3").style.boxShadow = "inset 0px 0px 0px 2px #31312d";
        document.getElementById("st3").style.backgroundColor = "#f7f8db";
        document.getElementById("st3").style.width = "27%";
        document.getElementById("st3").style.color = "#723a44";
        document.getElementById("THREE").style.fontSize = "45px";
        document.getElementById("THREE").style.color = "#723a44";
    }, 550);

    /*=========FINISHES UP TAKING OUT STEP2==========*/
    document.getElementById("VP").style.right = "100%";
    document.getElementById("VP").style.left = "-100%";
    document.getElementById("iPhRep").style.top = "-100%";        //55% initial
    document.getElementById("locT").style.right = "-100%";
    document.getElementById("jBCon").style.left = "-100%";
    document.getElementById("volT").style.left = "-100%";
    document.getElementById("scrT").style.left = "-100%";
    document.getElementById("charT").style.left = "-100%";
    document.getElementById("camT").style.right = "-100%";
    document.getElementById("oth").style.right = "-100%";
    //document.getElementById("tinue").style.right = "14%";
    document.getElementById("homT").style.right = "-100%";
    document.getElementById("circle").style.bottom = "-100%";     //JACK
    //document.getElementById("jackL").style.bottom = "44.2%";
    document.getElementById("circleDos").style.bottom = "-100%";    //*VOL
    //document.getElementById("volL").style.bottom = "31.7%";
    //document.getElementById("scrL").style.bottom = "21%";
    //document.getElementById("circleCinco").style.bottom = "19%";  //*SCREEN
    //document.getElementById("charL").style.bottom = "6.3%";
    document.getElementById("circleSiete").style.bottom = "-100%";   //*CHARGEPORT
    //document.getElementById("camL").style.bottom = "43%";
    document.getElementById("circleSeis").style.bottom = "-100%"; //CAM/SPEAKER
    //document.getElementById("locL").style.bottom = "31%";
    document.getElementById("circleTres").style.bottom = "-100%"; //*LOCK
    //document.getElementById("homL").style.bottom = "18%";
    document.getElementById("circleQuatro").style.bottom = "-100%";    //*HOME
    //document.getElementById("pressCont").style.left = "0px";
    //document.getElementById("pressCont").style.right = "0px";
    document.getElementById("forma").style.left = 0;
    document.getElementById("forma").style.right = 0;
    setTimeout(function () {
        document.getElementById("VP").style.right = "0";
        document.getElementById("VP").style.left = "0";
        document.getElementById("VP").style.zIndex = "-1";
    }, 550);

    document.getElementById("contin").style.backgroundColor = "#723a44";
    pageState = "Section3";
}

/*------REMOVES "father" DIV BY PUSHING IT TO BOTTOM AND--------*/
/*------ALSO PUTS "model" CHOICES INTO VIEW -------*/
function changeFirstStep() {
    document.getElementById("father").style.bottom = "-150%";
    document.getElementById("father").style.top = "100%";
    document.getElementById("son").style.zIndex = "2000";
    document.getElementById("model").style.left = "0px";
    document.getElementById("model").style.right = "0px";
}

/*------CHANGES BACKGROUND IMAGE OF CELL PHONE IN FIRST SECTION--------*/
/*------(CELL PHONE TYPE) ON MOUSEON-------*/
function deviceMouseover(e) {
    var x = "", w = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        x = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(https://i.imgur.com/acPJTo5.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        x = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(https://i.imgur.com/C8kGuhs.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        x = "goo";
        document.getElementById("google").style.backgroundImage = "url(https://i.imgur.com/QhWx0KT.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        x = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(https://i.imgur.com/DpoPP9g.png)";
    }

    if (x != '') {
        document.getElementById(x).style.color = "#723a44";
    }
    else {
        return;
    }
}

/*------CHANGES BACKGROUND IMAGE BACK TO ORIGINAL IMAGE--------*/
/*------ OF CELL PHONE IN FIRST SECTION ON MOUSEOUT-------*/
function deviceMouseout(e) {
    var y = "", z = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        y = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(https://i.imgur.com/HR7ooMX.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        y = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(http://i.imgur.com/oxLx2XJ.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        y = "goo";
        document.getElementById("google").style.backgroundImage = "url(https://i.imgur.com/cXeIxAx.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        y = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(https://i.imgur.com/rP2K9Fh.png)";
    }

    if (y != '') {
        document.getElementById(y).style.color = "#31312d";
    }
    else {
        return;
    }
}

/*-------WORKS WITH menuShower() FUNCTION TO HIDE AND SHOW MENU CONTENT.------*/
function menuHider() {
    var dropdowns = document.getElementsByClassName("dropper");
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
        else if (!openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    }
}

/*---------SETS UP EVENTLISTENER FOR MENU BUTTON---------*/
function menuEventListen() {
    var getter = document.getElementById("Scont");
    getter.addEventListener('click', menuShower, false);
}

/*------TRIGGERS MENU ICON ANIMATION WHEN HAMBURGER ICON IS CLICKED--------*/
function menuShower() {
    this.classList.toggle("change");
    menuHider();
}


function startUp() {
    menuEventListen();
    sectionOneTwoEventListen();
    initiateCar();
}

startUp();