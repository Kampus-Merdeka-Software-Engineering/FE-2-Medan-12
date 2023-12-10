const apiURL = 'http://localhost:5000';

// Fetch reservations and render them
fetchReservations();

async function fetchReservations() {
  try {
    const res = await fetch(`${apiURL}/reserve/reserve-get`);
    const reserves = await res.json();

    // Fetch room details for each reservation
    const promises = reserves.data.map(reserve =>
      fetchRoomDetails(reserve.roomId)
    );

    // Wait for all room details to be fetched
    const roomDetails = await Promise.all(promises);

    // Merge reservation data with room data
    const mergedData = reserves.data.map((reserve, index) => ({
      ...reserve,
      room: roomDetails[index].data,
    }));

    renderDataToContent(mergedData);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    alert('An error occurred while retrieving reservations');
  }
}

async function fetchRoomDetails(roomId) {
  try {
    if (!roomId) {
      console.error('Error: Room ID is undefined.');
      return { data: {} }; // Return an empty object in case of an error
    }

    const response = await fetch(`${apiURL}/room/${roomId}-room`);
    const data = await response.json();

    return { data };
  } catch (error) {
    console.error(`Error fetching room details for room ID ${roomId}:`, error);
    return { data: {} }; // Return an empty object in case of an error
  }
}

function renderDataToContent(reserves) {
  let line = document.getElementById('table');
  line.innerHTML = ''; // Clear existing content before rendering

  for (const reserve of reserves) {
    // Check if reserve.roomId exists before accessing it
    const roomId = reserve.roomId || '';
  
    console.log('Room ID:', roomId);
  
    const reservationElement = document.createElement('div');
    reservationElement.className = 'row';
  
    // Check if reserve.room exists before accessing its properties
    const roomImg = reserve.room ? reserve.room.img : '';
    const roomType = reserve.room ? reserve.room.type : '';
  
    reservationElement.innerHTML = `
      <div class="col" id="${reserve.id}">
        <img src="${roomImg}" width="50%" align-content="center">
        <div class="judul">
          <h2>${roomType}</h2>
          <h4>Orderer by: </h4>
          <h5>${reserve.email}</h5>
          <p>CheckIn: ${reserve.checkin} <br>
             CheckOut: ${reserve.checkout}<br> 
             Guest: ${reserve.guest} </p>
        </div>
        <button type="button" onclick="cancelReservation(${reserve.id})">Cancel Reservation</button>
      </div>
    `;
  
    line.appendChild(reservationElement);
  }
}

// Function to cancel a reservation using the DELETE method
function cancelReservation(reservationId) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    // Send a request to the server to cancel the reservation using the DELETE method
    fetch(`${apiURL}/reserve/${reservationId}-reserve`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        
        // Remove the canceled reservation from the UI
        removeReservationFromUI(reservationId);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during cancellation');
      });
  }
}

// Function to remove a reservation from the UI
function removeReservationFromUI(reservationId) {
  const reservationElement = document.getElementById(reservationId);
  if (reservationElement) {
    reservationElement.parentNode.removeChild(reservationElement);
  }
}
