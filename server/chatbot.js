// document.addEventListener("DOMContentLoaded", function () {
//   const chatbotContainer = document.getElementById("chatbot-container");
//   const chatBody = document.getElementById("chat-body");
//   const chatInput = document.getElementById("chat-input");
//   const sendButton = document.getElementById("send-button");

//   const questions = [
//     "Hello! What's your name?",
//     "What is your age?",
//     "What is your gender? (male/female/other)",
//     "What is your weight (in kg)?",
//     "What is your height (in cm)?",
//     "What is your activity level? (sedentary/light/moderate/active)",
//     "Do you have any dietary preferences? (e.g., vegetarian, keto)",
//     "Do you have any known health conditions? (e.g., diabetes)",
//     "Do you have any food allergies?"
//   ];

//   const userData = {};
//   let currentQuestion = 0;

//   function addMessage(message, sender) {
//     const messageDiv = document.createElement("div");
//     messageDiv.classList.add("chat-message", sender);
//     messageDiv.textContent = message;
//     chatBody.appendChild(messageDiv);
//     chatBody.scrollTop = chatBody.scrollHeight;
//   }

//   function askNextQuestion() {
//     if (currentQuestion < questions.length) {
//       addMessage(questions[currentQuestion], "bot");
//     } else {
//       addMessage("Thanks! Your information has been collected. ✅", "bot");
//       console.log("Collected User Data:", userData);

//       // TODO: send `userData` to server via fetch if needed
//       chatInput.disabled = true;
//       sendButton.disabled = true;
//     }
//   }

//   function handleUserResponse() {
//     const input = chatInput.value.trim();
//     if (!input) return;

//     addMessage(input, "user");

//     switch (currentQuestion) {
//       case 0:
//         userData.name = input;
//         break;
//       case 1:
//         userData.age = input;
//         break;
//       case 2:
//         userData.gender = input;
//         break;
//       case 3:
//         userData.weight = input;
//         break;
//       case 4:
//         userData.height = input;
//         break;
//       case 5:
//         userData.activity = input;
//         break;
//       case 6:
//         userData.diet = input;
//         break;
//       case 7:
//         userData.health = input;
//         break;
//       case 8:
//         userData.allergies = input;
//         break;
//     }

//     currentQuestion++;
//     chatInput.value = "";
//     setTimeout(askNextQuestion, 500);
//   }

//   sendButton.addEventListener("click", handleUserResponse);
//   chatInput.addEventListener("keypress", function (e) {
//     if (e.key === "Enter") handleUserResponse();
//   });

//   // Start chat
//   askNextQuestion();
// });
