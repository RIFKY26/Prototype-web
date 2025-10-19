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

    // --- Logika Halaman Formulir Adopsi ---
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get('id');

    // --- SIMULASI DATABASE KUCING ---
    const catDatabase = {
        "Mochi": {
            name: "Mochi",
            image: "https://i.imgur.com/K0k9eDo.png",
            tags: { gender: "Betina", breed: "Persia", health: "Sehat" },
            shelter: { name: "Rumah Kucing BDG", location: "Bandung", avatar: "https://i.imgur.com/5D63UyY.jpg" },
            description: "Kucing cantik, sehat, dan bersih. Cocok untuk kamu yang ingin sahabat baru di rumah."
        },
        "Leo": {
            name: "Leo",
            image: "https://i.imgur.com/k2gW25y.jpg",
            tags: { gender: "Jantan", breed: "British", health: "Sehat" },
            shelter: { name: "Meow Shelter", location: "Jakarta", avatar: "https://i.imgur.com/k2gW25y.jpg" },
            description: "Leo sangat aktif dan suka bermain. Mencari rumah yang bisa mengajaknya bermain."
        }
    };

    // --- Mengisi data kucing secara dinamis ---
    const currentCat = catDatabase[catId];
    if (currentCat) {
        document.getElementById('cat-name').textContent = currentCat.name;
        document.getElementById('cat-image').src = currentCat.image;
        document.getElementById('cat-desc').textContent = currentCat.description;
        
        const tagsContainer = document.getElementById('cat-tags');
        tagsContainer.innerHTML = `
            <span class="tag"><i class="fa-solid fa-venus-mars"></i> ${currentCat.tags.gender}</span>
            <span class="tag"><i class="fa-solid fa-paw"></i> ${currentCat.tags.breed}</span>
            <span class="tag"><i class="fa-solid fa-heart-pulse"></i> ${currentCat.tags.health}</span>
        `;

        const shelterContainer = document.getElementById('cat-shelter');
        shelterContainer.innerHTML = `<img src="${currentCat.shelter.avatar}" alt="Avatar Shelter"> <b>${currentCat.shelter.name}</b> - ${currentCat.shelter.location}`;
    } else if(catId) { 
        document.querySelector('.cat-detail-card').innerHTML = '<h4>Kucing tidak ditemukan.</h4>';
        document.querySelector('.adoption-form-card').style.display = 'none';
    }

    // --- Logika Form Multi-Langkah ---
    const submitFormBtn = document.getElementById('submit-form-btn');
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', (event) => {
            event.preventDefault();
            alert("Formulir diajukan! (Langkah selanjutnya akan dibuat)");
            // Nanti kita akan panggil fungsi goToStep('verifikasi'); di sini
        });
    }
});