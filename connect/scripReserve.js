const apiURL = 'http://localhost:5000';

    // Fetch reservations when the page loads
    fetchReservations();

    async function fetchReservations() {
      try {
        const res = await fetch(`${apiURL}/reserve/reserve-get`);
        const reserves = await res.json();
        console.log('Reserves Data:', reserves);

        // Fetch room details for each reservation
        const promises = reserves.data.map(reserve =>
          fetchRoomDetails(reserve.roomId)
        );

        // Wait for all room details requests to complete
        const roomDetails = await Promise.all(promises);

        // Combine reservation data with room details
        const mergedData = reserves.data.map((reserve, index) => ({
          ...reserve,
          room: roomDetails[index].data,
        }));

        // Render data to the content
        renderDataToContent(mergedData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        alert('An error occurred while retrieving reservations');
      }
    }

async function fetchRoomDetails(roomId) {
  try {
    const response = await fetch(`${apiURL}/room/${roomId}`);
    const data = await response.json();
    console.log('Room Details:', data);
    return { data };
  } catch (error) {
    console.error(`Error fetching room details for room ID ${roomId}:`, error);
    return { data: {} };
  }
}

function renderDataToContent(reserves) {
  let line = document.getElementById('table');
  line.innerHTML = '';

  for (const reserve of reserves) {
    const roomId = reserve.roomId || '';

    console.log('Room ID:', roomId);

    const reservationElement = document.createElement('div');
    reservationElement.className = 'row';

    // const roomImg = reserve.roomId ? reserve.roomId.img : '';
    const roomType = reserve.room ? reserve.room.type : '';

    reservationElement.innerHTML = `
      <div class="col" id="${reserve.id}">
        <img src="https://dbijapkm3o6fj.cloudfront.net/resources/29181,1004,1,6,4,0,600,450/-4608-/20210503231944/deluxe-room.jpeg" width="50%" align-content="center">
        <div class="judul">
          <h2>Standard Room</h2>
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


    function cancelReservation(reservationId) {
      if (confirm("Are you sure you want to cancel this reservation?")) {
        fetch(`${apiURL}/reserve/${reservationId}-reserve`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            alert("Reservation Canceled");
            removeReservationFromUI(reservationId);
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during cancellation');
          });
      }
    }

    function removeReservationFromUI(reservationId) {
      const reservationElement = document.getElementById(reservationId);
      if (reservationElement) {
        reservationElement.parentNode.removeChild(reservationElement);
      }
    }