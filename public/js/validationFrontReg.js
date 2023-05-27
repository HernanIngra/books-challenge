window.addEventListener("load", function () {
    console.log("holisssss MOTHERFUCKER");
    let form = document.querySelector("form.card");
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let errores = [];
        // name
        let namevjs = document.getElementById("name");
        console.log(namevjs);
        if (namevjs.value == "") {
            errores.push("Name cannot be empty");
        } else if (namevjs.value.length < 3) {
            errores.push("Name must be 3 letters min")
            console.log(namevjs.value.length);
        }
         // country
        let countryvjs = document.getElementById("country");
        if (countryvjs.value == "") {
            errores.push("Country cannot be empty");
            } else if (countryvjs.value.length < 3) {
            errores.push("Name must be 3 letters min")
            }

        // email
        let emailvjs  = document.getElementById("email");
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if (emailvjs.value == "") {
            errores.push("Email cannot be empty");
         } else if (!(emailvjs.value.match(validRegex))){
            errores.push("This email doesn't have a valid format")
        }
        
        // password
        let passvjs  = document.getElementById("password");
        if (passvjs.value == "") {
            errores.push("Password must be written");
        }
        // category
        let catvjsadmin  = document.getElementById("admin").checked;
        let catvjsuser = document.getElementById('user').checked;
        if (catvjsadmin == false && catvjsuser == false) {
            errores.push("Category must be selected");
        }
        
        //ul
        let ulErrores = document.getElementById("errores");
        ulErrores.innerHTML = ""

        if (errores.length > 0) {
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li class=err-li>${errores[i]}</li>`

            }

        }
        else {
            form.submit();
        }

    });
}) 