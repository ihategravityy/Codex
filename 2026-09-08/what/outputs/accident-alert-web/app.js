const form = document.querySelector('#alert-form');
const locate = document.querySelector('#locate');
const locationField = document.querySelector('#location');
const modal = document.querySelector('#success-modal');
const modalText = document.querySelector('#modal-text');

locate.addEventListener('click', () => {
  if (!navigator.geolocation) { locationField.value = 'Location services are not supported by this browser'; return; }
  locate.textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => { locationField.value = `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`; locate.textContent = 'Location found'; },
    () => { locationField.value = 'Unable to access location — enter an address'; locate.textContent = 'Try again'; }
  );
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const incident = document.querySelector('#incident').value;
  const people = document.querySelector('#people').value;
  modalText.textContent = `${incident} alert for ${people} person${people === '1' ? '' : 's'} has been shared with City General Hospital and St. Mary’s Medical Centre.`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
});
document.querySelector('#close-modal').addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); });
