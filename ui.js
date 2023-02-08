export class ChatUI {
  constructor(ul) {
    this.ul = ul;
  }

  get ul() {
    return this._ul;
  }

  set ul(ul) {
    this._ul = ul;
  }

  templateLI(data, send) {
    let html = "";

    if (send == data.username) {
      html = `<li class="list list-r" id=""> <span class="username">${
        data.username
      } :</span>
    <span class="message">${data.message}</span><br>
    <span>${this.time(data)}</span>
    <img src='bin.png' class = 'img'>
    </li>
    `;
    } else {
      html = `<li class="list list-l" id=""> <span class="username">${
        data.username
      } :</span>
    <span class="message">${data.message}</span><br>
    <span>${this.time(data)}</span>
    <img src='bin.png' class = 'img'>
    </li>
    `;
    }

    this.ul.innerHTML += html;
  }

  time(data) {
    let now = new Date();
    let date = data.created_at.toDate();
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let time = "";

    day = String(day).padStart(2, "0");
    mon = String(mon).padStart(2, "0");
    year = String(year).padStart(2, "0");
    min = String(min).padStart(2, "0");

    if (now.getFullYear() == year) {
      if (now.getMonth() + 1 == mon) {
        if (now.getDate() == day) {
          time = `${hour}:${min}`;
        } else {
          time = `${day}.${mon}.${year}. - ${hour}:${min}`;
        }
      } else {
        time = `${day}.${mon}.${year}. - ${hour}:${min}`;
      }
    } else {
      time = `${day}.${mon}.${year}. - ${hour}:${min}`;
    }

    return time;
  }

  clear() {
    this.ul.innerHTML = "";
  }
}
