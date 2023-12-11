const url = 'https://be-2-medan-12.up.railway.app/';

function searchRooms() {
  const type = document.getElementById('roomtype').value;

  if (!type) {
    alert('Please select a room type.');
    return;
  }

  fetch(`${url}/room/${type}`)
    .then(res => res.json())
    .then(data => {
      if (type === type) {
        const searchPageURL = `searchpage.html?type=${type}`;
        window.location.href = searchPageURL;
      } else {
        alert('No matching rooms found.');
      }
    })
    .catch(error => {
      console.error(error);
    });
}


function searchPageRooms() {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const roomtype = document.getElementById('roomtype').value;
  const guests = document.getElementById('guests').value;

  const searchParams = new URLSearchParams({
    checkin,
    checkout,
    roomtype,
    guests,
  });

  fetch(`${url}/room/${type, searchParams.toString()}`)
    .then(res => res.json())
    .then(data => {
      renderResults(data.data);
    })
    .catch(error => {
      console.error('Error fetching room data:', error);
      alert('An error occurred while searching for rooms');
    });
}

function renderResults(rooms) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = ''; 
  if (rooms.length === 0) {
    resultsContainer.innerHTML = 'No matching rooms found.';
    return;
  }

  for (const room of rooms) {
    const roomElement = document.createElement('div');
    roomElement.innerHTML = `
      <p>Type: ${room.type}, Description: ${room.description}</p>
    `;
    resultsContainer.appendChild(roomElement);
  }
}


async function fetchRoomDetails() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const roomType = urlParams.get('type');
  
      const response = await fetch(`${url}/room/${roomType}`);
      const data = await response.json();
      console.log(data)
      renderRoomDetails(data);
    } catch (error) {
      console.error('Error fetching room details:', error);
      handleFetchError();
    }
  }
  
  function renderRoomDetails(room) {
    const roomDetailsContainer = document.getElementById('table');
    roomDetailsContainer.innerHTML = '';
  
    if (!room) {
      roomDetailsContainer.innerHTML = 'Room details not found.';
      return;
    }
  
    const roomDetailsElement = createRoomDetailsElement(room);
    roomDetailsContainer.appendChild(roomDetailsElement);
  }
  
  function createRoomDetailsElement(room) {
    const { data } = room
    const roomDetailsElement = document.createElement('div');
    roomDetailsElement.className = 'row';
    roomDetailsElement.innerHTML = `
      <div class="col">
          <img src="${data.img}" width="50%" align-content="center">
          <div class="judul">
              <h2>${data.type} Room</h2>
              <span>Price ${data.price}</span>
          </div><br>
          <a href="reservation-form.html?type=${data.type}"><button>Reserve</button></a>
      </div>
    `;
    return roomDetailsElement;
  }
  
  function handleFetchError() {
    const roomDetailsContainer = document.getElementById('table');
    roomDetailsContainer.innerHTML = 'Error fetching room details. Please try again later.';
  }
  
  fetchRoomDetails();


