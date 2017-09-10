//----Sets up eventListener for menu button.----//
function menuEventListen() {
    var getter = document.getElementById("Scont");
    getter.addEventListener('click', menuShower, false);
}

function hoverListen() {
    issues = [];
    var theParent = document.querySelector("#father");
    var theSon = document.querySelector("#son");
    var typeG = document.getElementById("chooseSam");
    var prob = document.getElementById("butCont");
    var cont = document.getElementById("botPrice");
    theParent.addEventListener("mouseover", hoverChange, false);
    theParent.addEventListener("mouseout", outChange, false);
    theParent.addEventListener('click', clickCheck, false);
    theSon.addEventListener('click', clickCheck2, false);
    typeG.addEventListener('click', clickCheck, false);
    prob.addEventListener('mouseover', hovStep2, false);
    prob.addEventListener('mouseout', outStep2, false);
    prob.addEventListener('click', clickStep2, false);
    cont.addEventListener('click', contClick, false);
}

function contClick(e) {
    var ID = e.target.id;
    if (document.getElementById(ID).classList.contains("PRESSED")) {
        var get = final();       
        var check = validateObj(get);
        if (check == "") {
            //sendToSpree();
            fillThanks(get);
        }
    } else {
        if (issues.length > 1) {
            document.getElementById("issue1").innerText = issues[0];
            document.getElementById("issue2").innerText = " + " + issues[1];
            document.getElementById("contin").innerText = "Schedule";
            document.getElementById("contin").classList.add("PRESSED");
        } else {
            document.getElementById("issue1").innerText = issues[0];
            document.getElementById("contin").innerText = "Schedule";
            document.getElementById("contin").classList.add("PRESSED");
        }
        doStep3();
    }
}

function dateWord(date) {

}

function fillThanks(obj) {
    document.getElementById("acDevice").innerText = obj.phoneType;
    document.getElementById("acRepair").innerText = obj.repair;
    document.getElementById("acName").innerText = obj.name;
    document.getElementById("acTotal").innerText = obj.total;
    document.getElementById("acDate").innerText = obj.date;
    document.getElementById("acTime").innerText = obj.time;
    document.getElementById("calle").innerText = obj.address;
    document.getElementById("ciudad").innerText = obj.city;
    document.getElementById("estado").innerText = obj.state;
    document.getElementById("codigo").innerText = obj.zCode;
    document.getElementById("acPhone").innerText = obj.phoneNum;

    document.getElementById("fourth-panel").style.backgroundImage = "url(wood.jpg)";
    document.getElementById("fourth-color").style.backgroundColor = "#f7f8db";
    document.getElementById("fourth-color").style.opacity = ".8";
    document.getElementById("contToHide").style.opacity = "0";
    document.getElementById("botPrice").style.bottom = "-150%";
    document.getElementById("forma").style.opacity = "0";
    document.getElementById("forma").style.zIndex = "-100";
    document.getElementById("message").style.zIndex = "1000";
    document.getElementById("message").style.opacity = "1";
}

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

function final() {
    var name = document.getElementById("fn").value;
    var address = document.getElementById("ad").value;
    var city = document.getElementById("ct").value;
    var time = document.getElementById("tm").value;
    var date = document.getElementById("sp").value;
    var zCode = document.getElementById("zp").value;
    var state = document.getElementById("st").value;
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
    }else {
        phoneType = text + " " + text2;
    }

    var personData = {
        name: name,
        address: address,
        phoneNum: phoneNum,
        city: city,
        time: time,
        date: date,
        zCode: zCode,
        state: state,
        phoneType: phoneType,
        repair: repair,
        total: total
    }

    return personData;
}

function validateObj(info) {
    var errorCheck = "";

    for (var x in info) {
        if (x != "phoneType" && x != "repair" && x != "total") {
            if (info[x] == "") {
                document.getElementById(x + "Empty").style.opacity = "1";
                errorCheck += " " + x + ";";
            } else if (info[x] != "") {
                if (x == "phoneNum" || x == "zCode") {
                    if (isNaN(info[x])) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        errorCheck += " " + x + ";";
                    } else if (x == "phoneNum" && info[x].length != 10) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        errorCheck += " " + x + ";";
                    } else if (x == "zCode" && info[x].length != 5) {
                        document.getElementById(x + "Empty").style.opacity = "1";
                        errorCheck += " " + x + ";";
                    } else {
                        document.getElementById(x + "Empty").style.opacity = "0";
                    }
                } else {
                    document.getElementById(x + "Empty").style.opacity = "0";
                }
            }
        }
    }
    return errorCheck;
}

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
        "iPhone": {'5': 75, '5c': 75, '5s': 75, '6': 95, 
            '6Plus': 110, '6s': 120, '6sPlus': 125,
            'SE': 150, '7': 189, '7Plus': 209
        },
        "Galaxy": { 's3': 100, 's4': 100, 's5': 190, 
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
    document.getElementById("botPrice").style.bottom = "0";
}

function clickStep2(e) {
    var ID = e.target.id;
    var clas = e.target.classList;
    var text = document.getElementById("typePHO").innerText;
    var text2 = document.getElementById("modelPHO").innerText;
    var minus = 0;
    var plus = 1;

    if ((ID != "OTH") && (ID != "contin") && (e.target.classList.contains("butt"))) {
        if (document.getElementById(ID).classList.contains("PRESSED")) {
            document.getElementById(ID).style.backgroundColor = "#5b5b5b";
            document.getElementById(ID).style.textDecoration = "none";
            document.getElementById(ID).classList.remove("PRESSED");
            hasPrice(ID, text, text2, minus);
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
            hasPrice(ID, text, text2, plus);
        }
    } 
}

function keepPressed(ID) {
    if (ID == 'headphone') {
        document.getElementById("circle").style.opacity = "1";
    } else if (ID == "volume") {
        document.getElementById("circleDos").style.opacity = "1";
    } else if (ID == "screen") {
        document.getElementById("iPhRep").src = "iphoneNEW3.png";
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


function hovStep2(e) {
    var ID = e.target.id;
    if (!(e.target.classList.contains("PRESSED"))) {
        if (ID == 'headphone') {
            document.getElementById("circle").style.opacity = "1";
        } else if (ID == "volume") {
            document.getElementById("circleDos").style.opacity = "1";
        } else if (ID == "screen") {
            document.getElementById("iPhRep").src = "iphoneNEW3.png";
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

function outStep2(e) {
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

function clickCheck2(e) {
    var phonePress = e.target;
    var classOf = phonePress.className;

    if (classOf == "iphTex2" || classOf == "iphMod") {
        document.getElementById("apple").style.bottom = "-150%";
        document.getElementById("apple").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        console.log("READ");
        doStep2();
    }
    else if (classOf == "samTex2" || classOf == "sMod") {
        document.getElementById("samsung").style.bottom = "-250%";
        document.getElementById("samsung").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
    }
    else if (classOf == "galTex2" || classOf == "gMod") {
        document.getElementById("galNote").style.bottom = "-250%";
        document.getElementById("galNote").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
    }
    else if (classOf == "pixTex2" || classOf == "pMod") {
        document.getElementById("pixel").style.bottom = "-150%";
        document.getElementById("pixel").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
    }
    else if (classOf == "ipadTex2" || classOf == "ipadMod") {
        document.getElementById("ipad2").style.bottom = "-150%";
        document.getElementById("ipad2").style.top = "100%";
        document.getElementById("modelPHO").innerText = phonePress.textContent;
        doStep2();
    }

}

function doStep2() {

    setTimeout(function () {
        document.getElementById("son").style.zIndex = -200
    }, 900);
    document.getElementById("model").style.left = "100%";
    document.getElementById("model").style.right = "-100%";
    /*==========CHANGE COLOR AND SIZE OF STEP1============*/
    //document.getElementById("st1").style.fontSize = "29px";
    //document.getElementById("st1").style.width = "23%";
    //document.getElementById("st1").style.top = "20%";
    document.getElementById("st1").style.color = "#31312d";
    document.getElementById("hidONE").style.display = "inline";
    document.getElementById("ONE").innerText = "";
    document.getElementById("ONE").style.display = "none";
    document.getElementById("st1TX").style.top = "35%";

    setTimeout(function () { document.getElementById("car0").style.left = "46.5%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP2============*/
    setTimeout(function () {
        document.getElementById("st2").style.fontSize = "35px";
        document.getElementById("st2").style.width = "27%";
        document.getElementById("st2").style.top = "18%";
        document.getElementById("st2").style.color = "#723a44";
        document.getElementById("TWO").style.fontSize = "45px";
        document.getElementById("TWO").style.color = "#723a44";
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
}

function beginCar() {
    setTimeout(function () {
        document.getElementById("car0").style.left = "13%";
    }, 100);
}

function doStep3() {
   
    /*==========CHANGE COLOR AND SIZE OF STEP2============*/
    //document.getElementById("st2").style.fontSize = "29px";
    //document.getElementById("st2").style.width = "23%";
    //document.getElementById("st2").style.top = "20%";
    document.getElementById("st2").style.color = "#31312d";
    document.getElementById("hidTWO").style.display = "inline";
    document.getElementById("TWO").innerText = "";
    document.getElementById("TWO").style.display = "none";
    document.getElementById("st2TX").style.top = "35%";

    setTimeout(function () { document.getElementById("car0").style.left = "79.9%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP3============*/
    setTimeout(function () {
        document.getElementById("st3").style.fontSize = "35px";
        document.getElementById("st3").style.width = "27%";
        document.getElementById("st3").style.top = "18%";
        document.getElementById("st3").style.color = "#723a44";
        document.getElementById("THREE").style.fontSize = "45px";
        document.getElementById("THREE").style.color = "#723a44";
    }, 550);


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
}

function clickCheck(e) {
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
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "noteChoice") || (e.target.id == "chN"))) {
        document.getElementById("chooseSam").style.bottom = "-150%";
        document.getElementById("chooseSam").style.top = "100%";
        document.getElementById("galNote").style.left = "0";
        document.getElementById("galNote").style.right = "0";
        document.getElementById("son").style.zIndex = "2000";
    }
}

function changeFirstStep() {
    document.getElementById("father").style.bottom = "-150%";
    document.getElementById("father").style.top = "100%";
    document.getElementById("son").style.zIndex = "2000";
    document.getElementById("model").style.left = "0px";
    document.getElementById("model").style.right = "0px";
}

function hoverChange(e) {
    var x = "", w = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        x = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(iphoneNEW3.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        x = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(galaxyRed.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        x = "goo";
        document.getElementById("google").style.backgroundImage = "url(PixelRedNEW2.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        x = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(ipad4Red.png)";
    }

    if (x != '') {
        document.getElementById(x).style.color = "#723a44";
    }
    else {
        return;
    }
}

function outChange(e) {
    var y = "", z = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        y = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(iphoneNEW2.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        y = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(http://i.imgur.com/oxLx2XJ.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        y = "goo";
        document.getElementById("google").style.backgroundImage = "url(pixelNEW2.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        y = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(ipad4.png)";
    }

    if (y != '') {
        document.getElementById(y).style.color = "#31312d";
    }
    else {
        return;
    }
}

//-------Works with menuShower() function to hide and show menu content.------//
function menuHider() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
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

//------Triggers menu icon animation when icon is clicked.-------//
function menuShower() {
    this.classList.toggle("change");
    menuHider();
}

function startUp() {
    menuEventListen();
    hoverListen();
    beginCar();
}

startUp();
