const url = 'http://localhost:5000';

function searchRooms() {
  const type = document.getElementById('roomtype').value;

  // Check if the type is provided
  if (!type) {
    alert('Please select a room type.');
    return;
  }

  // Make a GET request to the server endpoint with the selected room type
  fetch(`${url}/room/${type}`)
    .then(res => res.json())
    .then(data => {
      // Check if any matching rooms are found
      if (type === type) {
        // Redirect to the search page with the room type as a query parameter
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

  // Make a GET request to the server endpoint with the search parameters
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
  resultsContainer.innerHTML = ''; // Clear existing content

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
      // Parse the URL to get the room type
      const urlParams = new URLSearchParams(window.location.search);
      const roomType = urlParams.get('type');
  
      // Make a GET request to the server endpoint with the room type
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
  
    // Display room details in the container
    const roomDetailsElement = createRoomDetailsElement(room);
    roomDetailsContainer.appendChild(roomDetailsElement);
  }
  
  function createRoomDetailsElement(room) {
    const roomDetailsElement = document.createElement('div');
    roomDetailsElement.className = 'row';
    roomDetailsElement.innerHTML = `
      <div class="col">
          <img src="${room.img}" width="50%" align-content="center">
          <div class="judul">
              <h2>${room.type} Room</h2>
              <span>${room.price}</span>
          </div><br>
          <a href="reservation-form.html?id=1"><button>Reserve</button></a>
      </div>
    `;
    return roomDetailsElement;
  }
  
  function handleFetchError() {
    const roomDetailsContainer = document.getElementById('table');
    roomDetailsContainer.innerHTML = 'Error fetching room details. Please try again later.';
  }
  
  // Fetch room details when the page loads
  fetchRoomDetails();


