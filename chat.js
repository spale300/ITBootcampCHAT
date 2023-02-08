export class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chat = db.collection("chats");
    this.unsub;
  }

  //room
  get room() {
    return this._room;
  }

  set room(r) {
    this._room = r;
  }

  // username
  get username() {
    return this._username;
  }

  set username(u) {
    if (u) {
      if (u.length > 2 && u.length <= 10) {
        if (u.trim().length > 0) {
          this._username = u;
          localStorage.setItem("username", u);
        } else {
          alert("Invalid username!");
        }
      } else {
        alert("Invalid username!");
      }
    }
  }

  //method
  updateRoom(ur) {
    this.room = ur;

    if (this.unsub) {
      this.unsub();
    }
  }

  async addChat(message) {
    let date = new Date();
    let ts = firebase.firestore.Timestamp.fromDate(date);
    let obj = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: ts,
    };

    let response = await this.chat.add(obj);
    return response;
  }

  async removeChat(id) {
    let response = await this.chats.doc(id).delete();
    return response;
  }

  getChats(callback) {
    this.unsub = this.chat
      .orderBy("created_at")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          let type = change.type;
          let doc = change.doc;

          if (type == "added") {
            callback(doc.data());
          }
        });
      });
  }
}
