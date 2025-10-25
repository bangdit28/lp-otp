document.addEventListener('DOMContentLoaded', function() {
    const addNumberBtn = document.getElementById('addNumberBtn');
    const newNumberInput = document.getElementById('newNumberInput');
    const availableNumbersList = document.getElementById('availableNumbersList');
    const adminActiveOrders = document.getElementById('adminActiveOrders');

    // Fungsi: Menambah nomor baru ke daftar
    addNumberBtn.addEventListener('click', () => {
        const number = newNumberInput.value.trim();
        if (number) {
            const li = document.createElement('li');
            li.innerHTML = `${number} <button class="delete-btn">Hapus</button>`;
            availableNumbersList.appendChild(li);
            newNumberInput.value = '';
        }
    });

    // Fungsi: Menghapus nomor
    availableNumbersList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Fungsi: Mengirim OTP (Simulasi)
    adminActiveOrders.addEventListener('click', (e) => {
        if (e.target.classList.contains('send-otp-btn')) {
            const row = e.target.closest('tr');
            const otpInput = row.querySelector('.otp-input');
            const otpCode = otpInput.value.trim();
            const orderId = row.dataset.orderId;

            if (otpCode) {
                // DI DUNIA NYATA: Kode ini akan mengirim OTP ke database
                // dan WebSockets akan memberitahu user.
                console.log(`Mengirim OTP "${otpCode}" untuk order ID ${orderId}`);
                
                // Ubah tampilan menjadi "Selesai"
                row.style.backgroundColor = '#16a085';
                row.innerHTML = `<td colspan="4">Order ${orderId} Selesai (OTP: ${otpCode})</td>`;

                // Hapus baris setelah beberapa detik
                setTimeout(() => {
                    row.remove();
                }, 3000);

            } else {
                alert('Kolom OTP tidak boleh kosong!');
            }
        }
    });
});
