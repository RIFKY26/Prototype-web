window.addEventListener('DOMContentLoaded', () => {
    
    // --- Logika Burger Menu ---
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (burgerMenuBtn && sidebar && mainContent) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('full-width');
        });
    }

    // --- Logika Halaman Detail Donasi ---
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get('id');

    // --- SIMULASI DATABASE DONASI ---
    const donationDatabase = {
        "pakan-kucing": {
            title: "Bantu Pakan & Perawatan Kucing Jalanan",
            image: "assets/images/donasi-pakan-kucing.png",
            shelter: { name: "Rumah Kucing Bahagia", location: "Jakarta Utara", avatar: "https://i.imgur.com/5D63UyY.jpg" },
            description: "Masih banyak kucing jalanan yang kelaparan dan tidak mendapatkan tempat aman. Melalui donasi ini, kamu bisa membantu menyediakan pakan, vaksinasi, serta biaya perawatan agar mereka bisa hidup lebih sehat dan berpeluang untuk diadopsi.",
            terkumpul: 1250000,
            target: 5000000,
            donors: [
                { name: "Ramadhan", avatar: "https://i.imgur.com/k2gW25y.jpg", time: "12 menit yang lalu", amount: 100000 },
                { name: "Anonim", avatar: "https://i.imgur.com/user-placeholder.png", time: "15 menit yang lalu", amount: 50000 },
                { name: "Budi", avatar: "https://i.imgur.com/J16tCfD.png", time: "20 menit yang lalu", amount: 25000 }
            ]
        },
        "rawat-kucing": {
            title: "Rawat Kucing Sakit Terlantar",
            image: "assets/images/donasi-rawat-kucing.png",
            shelter: { name: "Meow Shelter", location: "Jakarta", avatar: "https://i.imgur.com/k2gW25y.jpg" },
            description: "Banyak kucing sakit yang kami temukan di jalanan dengan kondisi memprihatinkan. Donasi Anda akan sangat membantu biaya pengobatan dan pemulihan mereka.",
            terkumpul: 4800000,
            target: 5000000,
            donors: [
                { name: "Siti", avatar: "https://i.imgur.com/5D63UyY.jpg", time: "5 menit yang lalu", amount: 200000 },
                { name: "Joko", avatar: "https://i.imgur.com/J16tCfD.png", time: "30 menit yang lalu", amount: 75000 }
            ]
        }
    };

    // --- Mengisi data donasi secara dinamis ---
    const campaign = donationDatabase[campaignId];
    if (campaign) {
        // Format Angka ke Rupiah
        const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

        // Mengisi Detail Kampanye
        document.getElementById('campaign-title').textContent = campaign.title;
        document.getElementById('campaign-image').src = campaign.image;
        document.getElementById('campaign-shelter').innerHTML = `<img src="${campaign.shelter.avatar}" alt="Avatar Shelter"> <b>${campaign.shelter.name}</b> - ${campaign.shelter.location}`;
        document.getElementById('campaign-description').textContent = campaign.description;
        document.getElementById('campaign-progress-text').innerHTML = `Terkumpul <strong>${formatRupiah(campaign.terkumpul)}</strong> dari ${formatRupiah(campaign.target)}`;
        
        const progressPercentage = (campaign.terkumpul / campaign.target) * 100;
        document.getElementById('campaign-progress-bar').style.width = `${progressPercentage}%`;
        
        // Mengisi Daftar Donatur
        const donorContainer = document.getElementById('donor-list-container');
        donorContainer.innerHTML = ''; // Kosongkan dulu
        
        campaign.donors.forEach(donor => {
            const donorHTML = `
                <div class="donor-item">
                    <img src="${donor.avatar}" alt="Avatar Donatur">
                    <div class="donor-info">
                        <div>
                            <span class="name">${donor.name}</span>
                            <span class="time">${donor.time}</span>
                        </div>
                        <p class="donation-text">Berdonasi sebesar <strong>${formatRupiah(donor.amount)}</strong></p>
                    </div>
                </div>
            `;
            donorContainer.innerHTML += donorHTML;
        });

    } else {
        document.querySelector('.donation-detail-wrapper').innerHTML = '<h2>Program Donasi Tidak Ditemukan</h2>';
    }
});