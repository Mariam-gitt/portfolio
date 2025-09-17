function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value,
    }



    emailjs.send("service_0b0atcq","service_0b0atcq",parms).then(alert("email sent!"));
}
