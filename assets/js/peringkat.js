window.addEventListener('DOMContentLoaded', () => {

    // --- Logika Burger Menu (agar berfungsi juga di halaman ini) ---
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (burgerMenuBtn && sidebar && mainContent) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('full-width');
        });
    }

    // --- DATABASE RIWAYAT POIN (SIMULASI) ---
    const pointHistoryDatabase = {
        "Shaq O'niel": [
            { type: 'donasi', description: 'Donasi untuk Pakan Kucing', points: 150 },
            { type: 'adopsi', description: 'Adopsi kucing bernama Mochi', points: 257 },
            { type: 'donasi', description: 'Donasi untuk Rawat Kucing Sakit', points: 379 }
        ],
        "yung kai": [
            { type: 'adopsi', description: 'Adopsi kucing bernama Leo', points: 657 },
            { type: 'lapor', description: 'Melaporkan kucing terlantar', points: 319 }
        ],
        "Rex Orange": [
            { type: 'donasi', description: 'Donasi untuk Vaksinasi', points: 865 }
        ],
        "Laufey": [
            { type: 'donasi', description: 'Donasi untuk Pakan Kucing', points: 200 },
            { type: 'donasi', description: 'Donasi untuk Shelter Baru', points: 669 }
        ]
    };
    
    // --- LOGIKA MODAL RIWAYAT POIN ---
    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const actionButtons = document.querySelectorAll('.tindakan-btn');

    function openModal(userId, userName) {
        const history = pointHistoryDatabase[userId] || [];
        
        modalTitle.textContent = `Riwayat Poin untuk ${userName}`;
        modalBody.innerHTML = ''; // Kosongkan konten sebelumnya

        if (history.length === 0) {
            modalBody.innerHTML = '<p>Tidak ada riwayat poin untuk pengguna ini.</p>';
        } else {
            history.forEach(item => {
                let iconClass = '';
                let icon = '';
                if(item.type === 'adopsi') {
                    iconClass = 'adopsi';
                    icon = 'fa-paw';
                } else if (item.type === 'donasi') {
                    iconClass = 'donasi';
                    icon = 'fa-hand-holding-dollar';
                } else {
                    iconClass = 'lapor';
                    icon = 'fa-flag';
                }

                const itemHTML = `
                    <div class="history-item">
                        <div class="icon ${iconClass}"><i class="fa-solid ${icon}"></i></div>
                        <div class="history-info">
                            <strong>${item.description}</strong>
                        </div>
                        <div class="history-points">+${item.points}</div>
                    </div>
                `;
                modalBody.innerHTML += itemHTML;
            });
        }
        
        modal.style.display = 'flex'; // Tampilkan modal
    }

    function closeModal() {
        modal.style.display = 'none'; // Sembunyikan modal
    }

    // Tambahkan event listener ke setiap tombol tindakan
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.dataset.userid;
            const userName = button.dataset.username;
            openModal(userId, userName);
        });
    });

    // Event listener untuk tombol close dan klik di luar modal
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

});