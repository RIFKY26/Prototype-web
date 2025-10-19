window.addEventListener('DOMContentLoaded', () => {

    // --- DATA KUCING (SUMBER DATA UTAMA) ---
    const catData = [
        {
            id: "Mochi",
            nama: "Mochi",
            gambar: "https://i.imgur.com/K0k9eDo.png",
            gender: "betina",
            ras: "persia",
            umurTeks: "1 thn",
            shelter: { nama: "Rumah Kucing BDG", lokasi: "Bandung", avatar: "https://i.imgur.com/5D63UyY.jpg" },
            deskripsi: "Mochi adalah kucing yang tenang dan penyayang, cocok untuk keluarga."
        },
        {
            id: "Leo",
            nama: "Leo",
            gambar: "https://i.imgur.com/k2gW25y.jpg",
            gender: "jantan",
            ras: "british",
            umurTeks: "8 bln",
            shelter: { nama: "Meow Shelter", lokasi: "Jakarta", avatar: "https://i.imgur.com/5D63UyY.jpg" },
            deskripsi: "Leo sangat aktif dan suka bermain. Mencari rumah yang bisa mengajaknya bermain."
        },
        {
            id: "Kiko",
            nama: "Kiko",
            gambar: "https://i.imgur.com/J16tCfD.png",
            gender: "jantan",
            ras: "domestik",
            umurTeks: "1.5 thn",
            shelter: { nama: "Paw Friends", lokasi: "Yogyakarta", avatar: "https://i.imgur.com/k2gW25y.jpg" },
            deskripsi: "Kiko adalah kucing yang mandiri dan suka menjelajah."
        },
        {
            id: "Bella",
            nama: "Bella",
            gambar: "https://i.imgur.com/5D63UyY.jpg",
            gender: "betina",
            ras: "domestik",
            umurTeks: "2 thn",
            shelter: { nama: "Rumah Kucing BDG", lokasi: "Bandung", avatar: "https://i.imgur.com/5D63UyY.jpg" },
            deskripsi: "Bella sangat manja dan senang berada di dekat manusia."
        }
    ];

    const catGrid = document.querySelector('.cat-adoption-grid');

    // --- FUNGSI UNTUK MERENDER KARTU KUCING ---
    function renderCats(catsToRender) {
        if (!catGrid) return; // Hentikan jika tidak di halaman yang benar
        catGrid.innerHTML = ''; 

        if (catsToRender.length === 0) {
            catGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Tidak ada kucing yang sesuai dengan filter.</p>';
            return;
        }

        catsToRender.forEach(cat => {
            const catCardHTML = `
                <div class="cat-card">
                    <img src="${cat.gambar}" alt="Foto ${cat.nama}">
                    <div class="cat-card-body">
                        <h3>${cat.nama}</h3>
                        <div class="cat-info-tags">
                            <span class="tag">${cat.gender}</span>
                            <span class="tag">${cat.ras}</span>
                            <span class="tag">${cat.umurTeks}</span>
                        </div>
                        <div class="shelter-info">
                            <img src="${cat.shelter.avatar}" alt="Avatar Shelter">
                            <span><b>${cat.shelter.nama}</b> - ${cat.shelter.lokasi}</span>
                        </div>
                        <p>${cat.deskripsi}</p>
                        <a href="form-adopsi.html?id=${cat.id}" class="btn-adopt">Adopsi</a>
                    </div>
                </div>
            `;
            catGrid.innerHTML += catCardHTML;
        });
    }

    // --- LOGIKA FILTER DINAMIS ---
    const filterCheckboxes = document.querySelectorAll('.cat-filter');

    function applyFilters() {
        const selectedFilters = {
            gender: [],
            ras: []
        };
        
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const group = checkbox.closest('.filter-group').querySelector('b').textContent.toLowerCase();
                if (group.includes('jenis kelamin')) {
                    selectedFilters.gender.push(checkbox.value);
                } else if (group.includes('ras kucing')) {
                    selectedFilters.ras.push(checkbox.value);
                }
            }
        });

        let filteredCats = catData.filter(cat => {
            const genderMatch = selectedFilters.gender.length === 0 || selectedFilters.gender.includes(cat.gender);
            const rasMatch = selectedFilters.ras.length === 0 || selectedFilters.ras.includes(cat.ras);
            return genderMatch && rasMatch;
        });

        renderCats(filteredCats);
    }

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // --- Render semua kucing saat halaman pertama kali dimuat ---
    renderCats(catData);

    // --- Logika untuk Tombol Filter & List Adopsi ---
    const filterButton = document.getElementById('filterButton');
    const listAdopsiBtn = document.getElementById('listAdopsiBtn');
    const filterPanel = document.getElementById('filterPanel');

    function setActiveButton(activeButton) {
        if (!filterButton || !listAdopsiBtn) return;
        if (activeButton === 'filter') {
            filterButton.classList.add('active');
            listAdopsiBtn.classList.remove('active');
        } else {
            listAdopsiBtn.classList.add('active');
            filterButton.classList.remove('active');
        }
    }

    if (filterButton && listAdopsiBtn && filterPanel) {
        filterButton.addEventListener('click', () => {
            filterPanel.classList.toggle('show'); 
            if (filterPanel.classList.contains('show')) {
                setActiveButton('filter');
            } else {
                setActiveButton('list');
            }
        });

        listAdopsiBtn.addEventListener('click', () => {
            filterPanel.classList.remove('show');
            setActiveButton('list');
        });
    }

    // --- Logika untuk Burger Menu ---
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (burgerMenuBtn && sidebar && mainContent) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('full-width');
        });
    }
});
