// const chatbotMessages = document.getElementById('chatbot-messages');
// const chatbotInput = document.getElementById('chatbot-input');
// const chatbotSend = document.getElementById('chatbot-send');

// let step = 0;
// let userData = {};

// const questions = [
//   "Hi! Let's get started. What's your name?",
//   "Great! How old are you?",
//   "Got it. What's your gender?",
//   "What’s your height in cm?",
//   "And your weight in kg?",
//   "What is your activity level? (Sedentary, Light, Moderate, Active)",
//   "Any dietary preferences (e.g., vegan, keto)?",
//   "Any known health conditions?",
//   "Thanks! We'll now give you personalized food suggestions!"
// ];

// // Initial greeting
// setTimeout(() => botSay(questions[0]), 500);

// chatbotSend.addEventListener('click', handleUserInput);
// chatbotInput.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') handleUserInput();
// });

// function handleUserInput() {
//   const input = chatbotInput.value.trim();
//   if (!input) return;

//   appendMessage(input, 'user');
//   chatbotInput.value = '';

//   processUserInput(input);
// }

// function appendMessage(message, type) {
//   const msg = document.createElement('div');
//   msg.className = `chat-message ${type}`;
//   msg.innerText = message;
//   chatbotMessages.appendChild(msg);
//   chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
// }

// function botSay(message) {
//   setTimeout(() => appendMessage(message, 'bot'), 700);
// }

// function processUserInput(input) {
//   switch (step) {
//     case 0:
//       userData.name = input;
//       break;
//     case 1:
//       userData.age = input;
//       break;
//     case 2:
//       userData.gender = input;
//       break;
//     case 3:
//       userData.height = input;
//       break;
//     case 4:
//       userData.weight = input;
//       break;
//     case 5:
//       userData.activity = input;
//       break;
//     case 6:
//       userData.diet = input;
//       break;
//     case 7:
//       userData.conditions = input;
//       break;
//     case 8:
//       submitUserData();
//       return;
//   }

//   step++;
//   if (step < questions.length) {
//     botSay(questions[step]);
//   }
// }

// function submitUserData() {
//   botSay("Submitting your data...");
//   // Send to backend (if needed)
//   console.log("Collected User Data:", userData);

//   setTimeout(() => {
//     botSay("✅ Data saved. You’ll receive recommendations shortly!");
//     // Optionally call your ML API here.
//   }, 1000);
// }


document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");

  const questions = [
    "Hello! What's your name?",
    "What is your age?",
    "What is your gender? (male/female/other)",
    "What is your weight (in kg)?",
    "What is your height (in cm)?",
    "What is your activity level? (sedentary/light/moderate/active)",
    "Do you have any dietary preferences? (e.g., vegetarian, keto)",
    "Do you have any known health conditions? (e.g., diabetes)",
    "Do you have any food allergies?"
  ];

  const userData = {};
  let currentQuestion = 0;

  function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function askNextQuestion() {
    if (currentQuestion < questions.length) {
      addMessage(questions[currentQuestion], "bot");
    } else {
      addMessage("Thanks! Your information has been collected. ✅", "bot");
      console.log("Collected User Data:", userData);

      // TODO: send `userData` to server via fetch if needed
      chatInput.disabled = true;
      sendButton.disabled = true;
    }
  }

  function handleUserResponse() {
    const input = chatInput.value.trim();
    if (!input) return;

    addMessage(input, "user");

    switch (currentQuestion) {
      case 0:
        userData.name = input;
        break;
      case 1:
        userData.age = input;
        break;
      case 2:
        userData.gender = input;
        break;
      case 3:
        userData.weight = input;
        break;
      case 4:
        userData.height = input;
        break;
      case 5:
        userData.activity = input;
        break;
      case 6:
        userData.diet = input;
        break;
      case 7:
        userData.health = input;
        break;
      case 8:
        userData.allergies = input;
        break;
    }

    currentQuestion++;
    chatInput.value = "";
    setTimeout(askNextQuestion, 500);
  }


  function sendChatToServer(userId, userQuery, botResponse) {
  fetch('http://localhost:3000/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      userQuery: userQuery,
      botResponse: botResponse
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Chat saved:', data);
  })
  .catch(error => {
    console.error('Error saving chat:', error);
  });
}

  sendButton.addEventListener("click", handleUserResponse);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleUserResponse();
  });

  // Start chat
  askNextQuestion();
});
