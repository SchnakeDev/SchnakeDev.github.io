function get() {
    let intent = document.getElementById('intent').value;
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    
    console.log(intent, question, answer);
    fetch(`http://143.198.112.75:3001/train?intent=${intent}&question=${question}&answer=${answer}`)
    
    

    clear();
}

function clear(){
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
}

