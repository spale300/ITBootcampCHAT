import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// DOM
let ul = document.querySelector("ul");
let btnSend = document.getElementById("btnSend");
let inputSend = document.getElementById("inputMessage");
let btnUpdate = document.getElementById("btnUpdate");
let inputUpdate = document.getElementById("inputUsername");
let btns = document.querySelector("nav");
let colorP = document.getElementById("fcolor");
let btnC = document.getElementById("colorC");
let body = document.querySelector("body");

let localColor = localStorage.getItem("color");
let localUsername = localStorage.getItem("username");
let localRoom = localStorage.getItem("room");
let chatroom = new Chatroom(localRoom, localUsername);

if (localRoom != null) {
  chatroom.room = localRoom;
} else {
  chatroom.room = "#general";
}

if (localUsername != null) {
  chatroom.username = localUsername;
} else {
  chatroom.username = "Anonymus";
}

if (localColor != null) {
  colorP.value = localColor;
} else {
  colorP.value = "#fff";
}
btns.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.tagName === "BUTTON") {
    let actBtn = document.querySelector(".active");
    if (actBtn) {
      actBtn.classList.remove("active");
    }
    e.target.classList.add("active");

    let room = e.target.textContent;
    chatroom.updateRoom(room);

    localStorage.setItem("room", room);
    chatUI.clear();

    chatroom.getChats((data) => {
      chatUI.templateLI(data, chatroom.username);
    });
  }
});

let chatUI = new ChatUI(ul);

chatroom.getChats((data) => {
  chatUI.templateLI(data, chatroom.username);
});

btnC.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("color", colorP.value);

  setTimeout(() => {
    body.style.backgroundColor = colorP.value;
  }, 500);
});

body.style.backgroundColor = localColor;

btnSend.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputSend.value != "") {
    chatroom
      .addChat(inputSend.value)
      .then(() => {
        inputSend.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

let notification = (msg) => {
  let spanUser = document.getElementById("update");
  spanUser.textContent = msg;
  setTimeout(() => {
    spanUser.textContent = "";
  }, 3000);
};
notification(chatroom.username);

btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputUpdate.value != "") {
    chatroom.username = inputUpdate.value;
  }

  localStorage.setItem("username", chatroom.username);
  inputUpdate.value = "";

  notification(chatroom.username);
  window.location.reload();
});

ul.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.tagName);

  if (e.target.tagName === "IMG") {
    if (confirm(`Are you sure you want to delete the message?`) == true) {
      let li = e.target.parentElement;
      li.remove();
      console.log(li);
      let id = li.id;
      console.log(id);
      let username = li.classList;
      console.log(username);
      if (username.contains(localUsername)) {
        chatroom
          .removeChat(id)
          .then(() => {
            console.log("Chat deleted!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
});
