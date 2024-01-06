
const socket = io();

const forms=  document.getElementById("send-container");
const messageInput= document.getElementById('messageInp');
const messageContiner= Document.querySelector(".container");
var audio=Audio('ting.mp3');

forms.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value= ''
})
const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name); 

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
}) 

const append= (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContiner.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}