const apiURL = 'http://localhost:5000';

async function searchRooms() {
    try {
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const roomType = document.getElementById('roomtype').value;
        const guests = document.getElementById('guests').value;

        const response = await fetch(`${apiURL}/room/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkin, checkout, roomType, guests }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('results').innerHTML = formatSearchResults(data);
    } catch (error) {
        console.error('Error searching rooms:', error);
    }
}

function formatSearchResults(data) {
    let resultHtml = '';
    if (data.length > 0) {
        data.forEach(room => {
            resultHtml += `<div>Room ID: ${room.room_id}</div>`;
            resultHtml += `<div>Room Type: ${room.room_type}</div>`;
            resultHtml += `<hr>`;
        });
    } else {
        resultHtml = 'No available rooms match your criteria.';
    }
    return resultHtml;
}
