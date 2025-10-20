window.addEventListener('DOMContentLoaded', () => {
    
    // --- Logika Burger Menu (tetap sama) ---
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (burgerMenuBtn && sidebar && mainContent) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('full-width');
        });
    }

    // --- DATABASE SIMULASI DENGAN STRUKTUR BARU ---
    let allCatsData = [
        {
            id: "Leo", name: "Leo", /* ...info Leo lainnya... */
            reminders: [
                { id: 1, title: "Memberi Makan Pagi", time: "08:00", frequency: "harian", checked: true },
                { id: 2, title: "Memberi Vitamin", time: "08:00", frequency: "harian", checked: false }
            ]
        },
        {
            id: "Mochi", name: "Mochi", /* ...info Mochi lainnya... */
            reminders: [
                { id: 4, title: "Memberi Makan Sore", time: "17:00", frequency: "harian", checked: true }
            ]
        }
    ];

    let currentCatIndex = 0;

    // --- Ambil Elemen DOM ---
    const reminderListContainer = document.getElementById('reminder-list');
    const addReminderBtn = document.getElementById('addReminderBtn');
    const modal = document.getElementById('reminderModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const reminderForm = document.getElementById('reminderForm');
    const reminderIdInput = document.getElementById('reminderId');
    const reminderTitleInput = document.getElementById('reminderTitle');
    const reminderTimeInput = document.getElementById('reminderTime');
    const reminderFrequencyInput = document.getElementById('reminderFrequency');
    
    // --- FUNGSI-FUNGSI ---

    function renderReminders(catIndex) {
        const cat = allCatsData[catIndex];
        reminderListContainer.innerHTML = '';
        
        cat.reminders.forEach(rem => {
            const isChecked = rem.checked ? 'checked' : '';
            reminderListContainer.innerHTML += `
                <div class="reminder-item">
                    <div class="reminder-info">
                        <span>${rem.title}</span>
                        <p>${rem.frequency.charAt(0).toUpperCase() + rem.frequency.slice(1)} - ${rem.time}</p>
                    </div>
                    <div class="reminder-actions">
                        <label class="switch"><input type="checkbox" data-id="${rem.id}" class="reminder-toggle" ${isChecked}><span class="slider"></span></label>
                        <button class="edit-btn" data-id="${rem.id}"><i class="fa-solid fa-pen"></i></button>
                        <button class="delete-btn" data-id="${rem.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
    }

    function openModal(reminderId = null) {
        reminderForm.reset();
        if (reminderId) {
            // Mode EDIT
            modalTitle.textContent = "Edit Pengingat";
            const cat = allCatsData[currentCatIndex];
            const reminder = cat.reminders.find(r => r.id === reminderId);
            if(reminder) {
                reminderIdInput.value = reminder.id;
                reminderTitleInput.value = reminder.title;
                reminderTimeInput.value = reminder.time;
                reminderFrequencyInput.value = reminder.frequency;
            }
        } else {
            // Mode TAMBAH
            modalTitle.textContent = "Tambah Pengingat Baru";
            reminderIdInput.value = '';
        }
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function displayCatData(index) {
        // Implementasi fungsi ini seperti di respons sebelumnya
        // Untuk menampilkan nama kucing, gambar, info, dan aktivitas
        renderReminders(index); // Pastikan ini dipanggil
    }

    // --- EVENT LISTENERS ---

    addReminderBtn.addEventListener('click', () => openModal());
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    reminderListContainer.addEventListener('click', (e) => {
        const cat = allCatsData[currentCatIndex];
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        const toggleSwitch = e.target.closest('.reminder-toggle');

        if (editBtn) {
            openModal(parseInt(editBtn.dataset.id));
        }
        if (deleteBtn) {
            const idToDelete = parseInt(deleteBtn.dataset.id);
            if (confirm("Apakah Anda yakin ingin menghapus pengingat ini?")) {
                cat.reminders = cat.reminders.filter(r => r.id !== idToDelete);
                renderReminders(currentCatIndex);
            }
        }
        if (toggleSwitch) {
            const idToToggle = parseInt(toggleSwitch.dataset.id);
            const reminder = cat.reminders.find(r => r.id === idToToggle);
            if(reminder) reminder.checked = toggleSwitch.checked;
        }
    });

    reminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = reminderIdInput.value;
        const cat = allCatsData[currentCatIndex];
        const newReminderData = {
            title: reminderTitleInput.value,
            time: reminderTimeInput.value,
            frequency: reminderFrequencyInput.value,
        };

        if (id) { // UPDATE
            const index = cat.reminders.findIndex(r => r.id === parseInt(id));
            if (index > -1) {
                cat.reminders[index] = { ...cat.reminders[index], ...newReminderData };
            }
        } else { // CREATE
            cat.reminders.push({ id: Date.now(), ...newReminderData, checked: false });
        }
        
        renderReminders(currentCatIndex);
        closeModal();
    });
    
    // Inisialisasi halaman dengan data kucing pertama
    displayCatData(currentCatIndex);
});