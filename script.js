document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const orderDetails = document.getElementById('order-details');
    const buyButton = document.getElementById('buy-button');
    const activeOrdersTableBody = document.querySelector('#active-orders-table tbody');
    
    let selectedService = null;

    // Fungsi untuk memformat angka menjadi Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    }

    // 1. Logika Pemilihan Layanan
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Hapus seleksi dari card lain
            serviceCards.forEach(c => c.classList.remove('selected'));
            
            // Tambahkan seleksi ke card yang diklik
            card.classList.add('selected');
            
            const serviceName = card.dataset.service;
            const servicePrice = card.dataset.price;
            const serviceIcon = card.querySelector('img').src;

            selectedService = {
                name: serviceName,
                price: servicePrice,
                icon: serviceIcon
            };
            
            // Update panel order
            orderDetails.innerHTML = `
                <div class="order-item">
                    <img src="${serviceIcon}" alt="${serviceName}">
                    <div class="order-item-info">
                        <span>${serviceName}</span>
                        <p>${formatRupiah(servicePrice)}</p>
                    </div>
                </div>
            `;
            
            // Aktifkan tombol beli
            buyButton.disabled = false;
        });
    });

    // 2. Logika Tombol Beli (Simulasi)
    buyButton.addEventListener('click', () => {
        if (!selectedService) return;

        // Hilangkan empty state jika ada
        const emptyStateRow = activeOrdersTableBody.querySelector('.empty-state');
        if (emptyStateRow) {
            emptyStateRow.parentElement.removeChild(emptyStateRow);
        }

        // Buat baris baru untuk tabel order
        const newRow = document.createElement('tr');
        const orderId = 'order-' + Date.now(); // ID unik untuk setiap order
        newRow.id = orderId;

        // Simulasi data
        const fakePhoneNumber = '+62812' + Math.floor(100000000 + Math.random() * 900000000);
        let timeLeft = 600; // 10 menit

        newRow.innerHTML = `
            <td>
                <div class="order-item" style="margin:0;">
                    <img src="${selectedService.icon}" alt="${selectedService.name}" style="width:24px; height:24px;">
                    <span>${selectedService.name}</span>
                </div>
            </td>
            <td>${fakePhoneNumber} <button class="action-btn" title="Salin"><i class="far fa-copy"></i></button></td>
            <td class="status-waiting">Menunggu SMS...</td>
            <td class="timer">${Math.floor(timeLeft / 60)}:${('0' + timeLeft % 60).slice(-2)}</td>
            <td>
                <button class="action-btn" title="Batalkan"><i class="fas fa-times-circle"></i></button>
            </td>
        `;
        
        activeOrdersTableBody.prepend(newRow);

        // Reset pilihan
        orderDetails.innerHTML = `<p class="placeholder">Pilih layanan untuk memulai.</p>`;
        buyButton.disabled = true;
        serviceCards.forEach(c => c.classList.remove('selected'));
        selectedService = null;

        // Logika Timer dan Simulasi OTP Masuk
        const timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = ('0' + timeLeft % 60).slice(-2);
            const currentRow = document.getElementById(orderId);
            if (currentRow) {
                currentRow.querySelector('.timer').textContent = `${minutes}:${seconds}`;
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (currentRow) {
                    currentRow.remove(); // Hapus baris jika waktu habis
                }
            }
        }, 1000);
        
        // Simulasi OTP diterima setelah beberapa detik
        setTimeout(() => {
            const currentRow = document.getElementById(orderId);
            if (currentRow) {
                const otpCell = currentRow.querySelector('.status-waiting');
                if (otpCell) {
                    otpCell.textContent = Math.floor(100000 + Math.random() * 900000); // Kode OTP 6 digit
                    otpCell.classList.remove('status-waiting');
                    otpCell.classList.add('status-received');
                }
            }
        }, Math.random() * 10000 + 5000); // Antara 5-15 detik
    });
    
    // 3. Logika Pencarian
    const searchInput = document.getElementById('serviceSearch');
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        serviceCards.forEach(card => {
            const serviceName = card.querySelector('span').textContent.toLowerCase();
            if (serviceName.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
