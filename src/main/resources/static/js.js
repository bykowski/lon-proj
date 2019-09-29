var client = null;

function showMessage(value, user, color) {
    var newResponse = document.createElement('p');
    newResponse.appendChild(document.createTextNode(user));
    newResponse.appendChild(document.createTextNode(": "));
    newResponse.appendChild(document.createTextNode(value));
    newResponse.style.color=color;


    var response = document.getElementById('reponse');
    response.appendChild(newResponse);
}


function connect() {
    client = Stomp.client('ws://localhost:8080/chat');
    client.connect({}, function (frame) {
        client.subscribe("/topic/messages", function(message){
            showMessage(
                JSON.parse(message.body).value,
                JSON.parse(message.body).user,
                JSON.parse(message.body).color)
        });
    })
}

function sendMessage() {
    var messageToSend = document.getElementById('messageToSend').value;
    var user = document.getElementById('user').value;
    var userColor = document.getElementById('userColor').value;
    client.send("/app/chat", {}, JSON.stringify({
        'value': messageToSend,
        'user': user,
        'color': userColor}) );
    document.getElementById('messageToSend').value = "";
}