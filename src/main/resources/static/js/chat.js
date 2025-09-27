// chat.js - connects to /chat and handles messages + typing indicator

let stompClient = null;
let typingTimeouts = {};
let typingUsers = new Set();

function connect() {
    const socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        subscribeToRoom();
    }, function (err) {
        console.error('STOMP error', err);
    });
}

function subscribeToRoom() {
    stompClient.subscribe('/topic/room/' + roomId, function (message) {
        const msg = JSON.parse(message.body);
        appendMessage(msg);
    });

    stompClient.subscribe('/topic/typing/' + roomId, function (message) {
        const who = message.body;
        showTyping(who);
    });
}

function appendMessage(msg) {
    const chatBox = document.getElementById('chat-box');
    const p = document.createElement('p');
    const time = new Date(msg.timeStamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    p.innerHTML = `<small class="text-muted">${time}</small> <b>${escapeHtml(msg.sender)}</b>: ${escapeHtml(msg.content)}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// send message when clicking send button
document.addEventListener('DOMContentLoaded', function () {
    connect();
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('message-input');

    sendBtn.addEventListener('click', function () {
        sendMessage();
    });

    input.addEventListener('keydown', function (e) {
        // send typing event
        sendTyping();
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();
    if (!content) return;
    if (!stompClient) {
        alert('Not connected');
        return;
    }
    const payload = JSON.stringify({content: content});
    stompClient.send('/app/sendMessage/' + roomId, {}, payload);
    input.value = '';
}

function sendTyping() {
    if (!stompClient) return;
    stompClient.send('/app/typing/' + roomId, {}, {});
}

function showTyping(who) {
    if (!who || who === username) return;
    typingUsers.add(who);
    renderTyping();
    // clear after 3 seconds
    if (typingTimeouts[who]) clearTimeout(typingTimeouts[who]);
    typingTimeouts[who] = setTimeout(() => {
        typingUsers.delete(who);
        renderTyping();
    }, 3000);
}

function renderTyping() {
    const el = document.getElementById('typing');
    if (!el) return;
    if (typingUsers.size === 0) {
        el.textContent = '';
        return;
    }
    const arr = Array.from(typingUsers);
    el.textContent = arr.join(', ') + (arr.length === 1 ? ' is typing...' : ' are typing...');
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[&<"'>]/g, function (m) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m];
    });
}
