'use strict';

const connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();
const button = document.getElementById('sendButton');
const user = document.getElementById('userInput');
const message = document.getElementById('messageInput');

button.disabled = true;

connection.on('ReceiveMessage', function(user, message) {
	const fullMessage = `${user} says ${message}`;
	const li = document.createElement('li');
	li.textContent = fullMessage;
	document.getElementById('messagesList').appendChild(li);
});

connection.start().then(() => {
	document.getElementById('sendButton').disabled = false;
}).catch((error) => {
	console.log(error);
});

button.addEventListener('click', function(event) {
	connection.invoke('SendMessage', user.value, message.value)
		.catch((error) => {
			console.log(error);
		});
	event.preventDefault();
})