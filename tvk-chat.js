// --- TVK CHATBOT WIDGET SCRIPT --- //

(function() {
    // 1. Define the HTML Structure
    const chatHTML = `
      <button id="chatBtn" class="chat-toggle-btn" onclick="toggleChat()">
        <span class="chat-icon">💬</span>
        <span class="close-icon" style="display:none">✕</span>
      </button>
      
      <div id="chatWindow" class="chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <h4>TVK Assistant</h4>
            <span class="status-dot"></span> Online
          </div>
        </div>
      
        <div id="chatBody" class="chat-body">
          <div class="message bot-msg">
            <p>வணக்கம்! (Hello!) 🙏<br>TVK IT Wing-க்கு வரவேற்கிறோம். உங்களுக்கு எப்படி உதவலாம்?</p>
            <span class="time">Just now</span>
          </div>
        </div>
      
        <div class="chat-footer">
          <input type="text" id="chatInput" placeholder="Type a message..." onkeypress="handleKeyPress(event)">
          <button onclick="sendMessage()">➤</button>
        </div>
      </div>
    `;

    // 2. Define the CSS Styles (Theme: Dark Red & Yellow)
    const chatCSS = `
        <style>
            /* Floating Button */
            .chat-toggle-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background-color: #8B0000; /* Dark Red */
                color: #FFD700; /* Yellow */
                border: none;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                z-index: 9999;
                transition: transform 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .chat-toggle-btn:hover { transform: scale(1.1); }

            /* Chat Window */
            .chat-window {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 320px;
                height: 400px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 9999;
                display: none; /* Hidden by default */
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #ddd;
            }

            /* Header */
            .chat-header {
                background: #8B0000; /* Dark Red */
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
            }
            .chat-header h4 { margin: 0; font-size: 16px; color: #FFD700; }
            .status-dot {
                height: 8px; width: 8px;
                background-color: #00e676;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
            }

            /* Body */
            .chat-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f4f6f9;
            }
            .message { margin-bottom: 10px; max-width: 80%; }
            .bot-msg { align-self: flex-start; }
            .bot-msg p {
                background: #e9ecef;
                padding: 10px;
                border-radius: 10px 10px 10px 0;
                font-size: 14px;
                color: #333;
            }
            
            /* User Message Style */
            .user-msg { text-align: right; margin-left: auto; }
            .user-msg p {
                background: #FFD700; /* Yellow */
                color: #8B0000; /* Red Text */
                padding: 10px;
                border-radius: 10px 10px 0 10px;
                font-size: 14px;
                font-weight: 500;
            }

            /* Footer */
            .chat-footer {
                padding: 10px;
                border-top: 1px solid #eee;
                display: flex;
                background: white;
            }
            .chat-footer input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }
            .chat-footer button {
                background: #8B0000;
                color: white;
                border: none;
                padding: 8px 15px;
                margin-left: 5px;
                border-radius: 50%;
                cursor: pointer;
            }
        </style>
    `;

    // 3. Inject HTML & CSS into the page
    document.head.insertAdjacentHTML('beforeend', chatCSS);
    document.body.insertAdjacentHTML('beforeend', chatHTML);

})();

// --- JAVASCRIPT LOGIC --- //

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatIcon = document.querySelector('.chat-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        chatWindow.style.display = 'none';
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    const chatBody = document.getElementById('chatBody');

    if (message) {
        // 1. Add User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-msg';
        userDiv.innerHTML = `<p>${message}</p>`;
        chatBody.appendChild(userDiv);

        // Clear input
        input.value = '';

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // 2. Simulate Bot Reply (Optional Demo Logic)
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-msg';
            botDiv.innerHTML = `<p>Thanks for contacting TVK IT Wing. We will update you soon.</p>`;
            chatBody.appendChild(botDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}