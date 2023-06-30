save("name");

document.getElementById("bcode").value = -1;

document.getElementById("name").addEventListener("change", () => {
    save("name");

});

// ==============================================================================
// ===============================Button Disabled===============================
setInterval(() => {
    if (document.getElementById("cmnt").value.trim() != "") {

        document.getElementById("submit-btn").disabled = false;

    }
    else {
        document.getElementById("submit-btn").disabled = true;

    }

}, 1000);

// ============================================================================

// ==========================================================================
// ===============================Dtat Submit===============================


const scriptURL = 'https://script.google.com/macros/s/AKfycbxCrEkS929OoxUvQG-7wCOyJ_enTZlOTMXP2HFkJVi6zPeaPDRg-g5sWoXOvwZB8E1b/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))


        .catch(error => console.error('Error!', error.message))

})


function wait() {
    document.getElementById("submit-btn").style.display = "none"
    document.getElementById("wait_mess").style.display = "block"
    document.getElementById("tnx_mess").innerText = `Thanks ${document.getElementById("name").value}`

    setTimeout(() => {

        document.getElementById("cmnt").value = ""
        document.getElementById("wait_mess").style.display = "none"
        document.getElementById("tnx_mess").style.display = "block"

        setTimeout(() => {
            document.getElementById("tnx_mess").style.display = "none"
            document.getElementById("submit-btn").style.display = "block"

        }, 3000);

    }, 4000);


}
// ==========================================================================
// ===============================Message Load===============================



setInterval(() => {
    load();
}, 4000);

let old_len = 0;

function load() {

    fetch(scriptURL)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep);


            let length = data.length;


            // console.log(length);

            // console.log(data[2][2]);
            if (length > old_len) {
                let j = 1;
                document.querySelectorAll(".all_comments")[0].innerHTML = "";

                for (let i = 1; i < length; i++) {

                    if (data[i][3] == '-1') {


                        let b = `<div class="comment">
<div class="sndr_name"><i style="font-size:24px" class="fa">&#xf2be;&nbsp;</i>${data[i][1]}&emsp;${(data[i][0]).slice(0, 21)}
</div>

<span class="comment_message">${j + '. ' + data[i][2]}</span>
<button class="reply_btn" onclick="click_on_reply(${j - 1},'${data[i][1]}')">Reply</button>

<div class="reply_box">

   
</div>
</div>`

                        document.querySelectorAll(".all_comments")[0].innerHTML += b
                        j++;
                    }

                }
                old_len = length;

                for (let k = 1; k < length; k++) {

                    if (data[k][3] != '-1') {

                        let c = ` <div class="reply_msg">
<div class="sndr_name"><i style="font-size:24px"
        class="fa">&#xf2be;&nbsp;</i>${data[k][1]}&emsp;${(data[k][0]).slice(0, 21)}</div>

<span class="comment_message replymsg">${data[k][2]}</span>
</div>`

                        document.querySelectorAll(".reply_box")[data[k][3]].innerHTML += c


                    }
                }
            }
        })
}




// ======================================================================================

function save(idv) {

    if (localStorage.getItem(idv) != null) {

        let b = document.getElementById(idv);
        b.value = localStorage.getItem(idv);
    }



    document.getElementById(idv).addEventListener("change", () => {



        if (document.getElementById(idv).value != localStorage.getItem(idv)) {

            // console.log("local storage data update");

            let a = document.getElementById(idv).value;
            localStorage.setItem(idv, a);
        }


    })



}



function click_on_reply(ind, nam) {


    if (document.querySelectorAll(".reply_box")[ind].style.display == "block") {
        document.getElementById("bcode").value = -1;
        document.getElementsByClassName("heading")[0].innerHTML = "<p>Comment your thoughts</p>";
        document.querySelectorAll(".reply_box")[ind].style.display = "none";
        document.getElementsByClassName("reply_btn")[ind].innerText = "Reply";

    }
    else {
        document.getElementById("bcode").value = ind;


        document.getElementsByClassName("heading")[0].innerHTML = `<p>Replies to ${nam}'s Comment</p>`;


        document.querySelectorAll(".reply_box").forEach(function (ele, index) {
            document.querySelectorAll(".reply_box")[index].style.display = "none";
            document.getElementsByClassName("reply_btn")[index].innerText = "Reply";

        });

        setTimeout(() => {

            document.querySelectorAll(".comment")[ind].scrollIntoView();
        }, 500);
        
        document.querySelectorAll(".reply_box")[ind].style.display = "block";
        document.getElementsByClassName("reply_btn")[ind].innerText = "Click here to close";
    }
}
