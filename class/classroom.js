function get() {
    let intent = document.getElementById('intent').value;
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    
    console.log(intent, question, answer);
    fetch(`https://comrade-jeremy.us:3443/train?intent=${intent}&question=${question}&answer=${answer}`)
    
    

    clear();
}

function clear(){
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
}

