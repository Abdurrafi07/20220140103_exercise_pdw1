// Menunggu sampai seluruh dokumen telah dimuat sebelum menjalankan skrip
document.addEventListener("DOMContentLoaded", function() {
    // Memilih semua tautan dengan kelas "alert"
    const alertLinks = document.querySelectorAll(".alert a");
    
    // Iterasi melalui setiap tautan
    alertLinks.forEach(function(link) {
        // Menambahkan event listener untuk setiap tautan
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah tautan membuka halaman baru
            const pageURL = this.getAttribute("href"); // Mengambil URL halaman dari atribut href
            
            // Melakukan fetch untuk mendapatkan konten halaman yang ditautkan
            fetch(pageURL)
                .then(response => response.text()) // Mengambil konten halaman
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, "text/html"); // Parsing konten halaman sebagai dokumen HTML
                    const content = doc.querySelector("body").innerHTML; // Mengambil konten halaman
                    const contentArea = document.querySelector(".content-area");
                    contentArea.innerHTML = content; // Memasukkan konten halaman ke dalam area konten
                    
                    // Melakukan scroll ke area konten yang dimuat
                    contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
                })
                .catch(error => console.error("Error:", error)); // Menangani kesalahan yang mungkin terjadi saat mengambil konten halaman
        });
    });
});
