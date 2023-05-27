window.addEventListener("load", function () {
    console.log("holisssss MOTHERFUCKER");
    let form = document.querySelector("form.card");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let errores = [];     

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