document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const playerNameInput = document.getElementById('playerName');
    const mapSection = document.getElementById('map');
    const displayName = document.getElementById('displayName');

    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = playerNameInput.value.trim();
      if (!name) return;

      localStorage.setItem('playerName', name);

      displayName.textContent = name;

      nameForm.parentElement.classList.add('hidden');
      mapSection.classList.remove('hidden');
    });

    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      document.querySelector('.container').classList.add('hidden');
      displayName.textContent = savedName;
      mapSection.classList.remove('hidden');
    }

    document.querySelectorAll('.dungeon-button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dungeon = btn.getAttribute('data-dungeon');
        if (!dungeon) return;
  
        window.location.href = `dungeon.html?d=${dungeon}`;
      });
    });
  });
  