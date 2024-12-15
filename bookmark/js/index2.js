var sitename = document.getElementById("SiteName")
var SiteURL = document.getElementById("SiteURL")
var button = document.getElementById("submitBtn")
var search = document.getElementById("search")

var proudactlist = [];
var mainindex = 0;


if (localStorage.getItem("proudact") != null) {

    proudactlist = JSON.parse(localStorage.getItem("proudact"))
    display()
}

var nameregex = /^[A-Za-z0-9]{1,}$/


function regexs() {

    if (nameregex.test(sitename.value)) {
        return true
    } else {
        return false
    }

}
var url = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3,}\/?$/



function urll() {

    if (url.test(SiteURL.value)) {
        return true
    } else {
        return false
    }

}



sitename.onkeyup = function () {

    if (regexs() && urll() == true) {

        button.removeAttribute("disabled")

    } else {
        button.disabled = "true"

    }
}


SiteURL.onkeyup = function () {

    if (regexs() && urll() == true) {

        button.removeAttribute("disabled")

    } else {
        button.disabled = "true"

    }


}

function addproudact() {
    if (button.innerHTML == "update") {
        button.innerHTML = "supmit";
        var proudact = {
            name: sitename.value,
            url: SiteURL.value

        }
        proudactlist.splice(mainindex, 1, proudact)

    } else {

        var proudact = {
            name: sitename.value,
            url: SiteURL.value

        }

        proudactlist.unshift(proudact)
    }



    localStorage.setItem("proudact", JSON.stringify(proudactlist)),
        display();
    clear()
    // button.disabled = "true"
}
function clear() {

    name: sitename.value = ""
    url: SiteURL.value = ""

}
function display() {

    var temp = ""

    for (var i = 0; i < proudactlist.length; i++) {

        temp = temp + `           <tr>
                        <td class=>${i}</td>
                        <td>${proudactlist[i].name}</td>
                        <td><a target="_blank" href="${proudactlist[i].url}"   <button  type="button" class="btn btn-info">
                        <i class="fa-solid fa-eye pe-2"></i>
                         visit 
                         </button></a></td>
                         <td><button onclick="update(${i})" class="btn btn-success">update</button> </td>
                        <td><button onclick="deleteproudact(${i})" class="btn btn-danger">
                                <i class="fa-solid fa-trash-can"></i>
                                delete
                            </button></td>
                    </tr>`

    }

    document.getElementById("mydata").innerHTML = temp


}

function update(x) {

    sitename.value = proudactlist[x].name
    SiteURL.value = proudactlist[x].url
    button.innerHTML = "update"
    mainindex = x


}
function deleteproudact(x) {

    proudactlist.splice(x, 1)
    localStorage.setItem("proudact", JSON.stringify(proudactlist))
    display()

}

function searchp() {

    var temp = ""
    var searchvalue = search.value.toLowerCase()
    for (var i = 0; i < proudactlist.length; i++) {

        if (proudactlist[i].name.toLowerCase().includes(searchvalue) == true) {
            temp = temp + `  <tr>
    <td>${i}</td>
    <td>${proudactlist[i].name.toLowerCase().replace(searchvalue, "<span class='bg-info'>" + searchvalue + "</span>")}</td>
    <td><a target="_blank" href="${proudactlist[i].url}"   <button  type="button" class="btn btn-info">
    <i class="fa-solid fa-eye pe-2"></i>
     visit 
     </button></a></td>
     <td><button onclick="update(${i})" class="btn btn-success">update</button> </td>
    <td><button onclick="deleteproudact(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
            delete
        </button></td>
</tr>`

        }
    }

    document.getElementById("mydata").innerHTML = temp


}
