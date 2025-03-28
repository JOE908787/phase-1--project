const API_URL = 'http://localhost:5000/routes';

const bookingForm = document.getElementById('booking-form');
const routesList = document.getElementById('routes-list');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  fetch(`${API_URL}?from=${from}&to=${to}`)
    .then((response) => response.json())
    .then((routes) => {
      routesList.innerHTML = '';

      if (routes.length > 0) {
        const ul = document.createElement('ul');
        routes.forEach(route => {
          const li = document.createElement('li');
          li.textContent = `${route.from} to ${route.to} | Departure: ${route.departure_time} | Price: KES ${route.price}`;
          ul.appendChild(li);
        });
        routesList.appendChild(ul);
      } else {
        routesList.innerHTML = '<p>No routes found.</p>';
      }
    });
});

const ratingForm = document.getElementById('rating-form');
ratingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const rating = document.getElementById('rating').value;

  fetch('http://localhost:5000/ratings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating })
  })
  .then((response) => response.json())
  .then((data) => {
    alert('Thank you for your rating!');
  });
});

function inviteFriend() {
  alert('You have invited a friend! Earn 50 points for each invite.');
}
