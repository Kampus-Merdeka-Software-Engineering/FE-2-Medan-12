// GET
const apiURL = 'http://localhost:5000';

fetch(`${apiURL}/room/rooms`)
.then(res =>res.json())
.then(hotel => renderDataToContent(hotel.data));

function renderDataToContent(rooms){
  let line = document.getElementById('content-section');
  let id = 1;
  for(room of rooms){
    console.log(rooms);
      line.innerHTML += `<div class="content-item" id = ${id}>
      <div>
          <a href="login.html">
          <img src = ${room.img} alt="Deskripsi Gambar">
          <p> ${room.type}</p> 
          <span>${room.guest} guests </span>
          </a>
      </div>
      </div>`
      id++;
  }
}


function redirectToDetail(detail){
  console.log('Redirect to detail');
  window.location.href = "beranda/Details.html" + detail;
}