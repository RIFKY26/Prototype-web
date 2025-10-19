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

    // Nanti, kita bisa tambahkan logika untuk memproses pembayaran di sini
    console.log("Halaman pembayaran berhasil dimuat.");
    
});