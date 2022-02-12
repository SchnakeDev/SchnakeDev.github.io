

//shorome suggested that we do the comrade thing

/* JS comes here */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function () {
        action.innerHTML = "<small>listening, please speak...</small>";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "<small> jeremy doesn't care about your opinion...</small>";
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {


        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;

        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
       document.getElementById("jeremy").innerHTML = '<img src = "jeremy_speaking.png" id = "jeremy">'
        output.classList.remove("hide");
      document.getElementById("jeremy").innerHTML = '<img src = "jeremy_speaking.png" id = "jeremy">';

        fetch(`http://143.198.112.75:3001/ask?q=${transcript}`)
            .then(response => response.json())
            .then(
                (data) => {
                    console.log(data);

                    var msg = new SpeechSynthesisUtterance();

                    msg.text = data.answer + " comrade!";
                    msg.pitch = -10;
                    window.speechSynthesis.speak(msg);
                    var e = data.answer.length * 100;
                    delay(e).then(() => document.getElementById("jeremy").innerHTML = '<img src = "jeremy_not_speaking.png" id = "jeremy">');
                }
            )
    };

    // start recognition
    recognition.start();

}