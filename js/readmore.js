document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.getElementById("readMoreBtn");
    const articleText = document.querySelector("#home .article p");

    const summaryLength = 50; // Jumlah karakter untuk ringkasan
    const fullText = articleText.innerHTML; // Simpan teks penuh

    let isOpen = false;

    function toggleText() {
        isOpen = !isOpen;

        if (isOpen) {
            articleText.innerHTML = fullText; // Mengembalikan teks penuh
            readMoreBtn.innerText = "Read Less";
        } else {
            articleText.innerHTML = truncateText(fullText, summaryLength); // Kembali menampilkan ringkasan
            readMoreBtn.innerText = "Read More";
        }
    }

    // Tampilkan ringkasan awal
    articleText.innerHTML = truncateText(fullText, summaryLength);

    readMoreBtn.addEventListener("click", toggleText);
});

function truncateText(text, length) {
    return text.slice(0, length) + (text.length > length ? "..." : "");
}




// ----------------------menu hambuger-----------------------------------------------------------------------
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('.navigasi-halaman ul');

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('slide')
});
