// Menyimpan log history kalkulator

// Fungsi untuk menambahkan angka ke layar kalkulator
function appendToDisplay(value) {
  const display = document.getElementById("display");

  // Jika nilai display adalah '0', kita hapus dan ganti dengan angka pertama
  if (display.value === "0") {
    display.value = value;
  } else {
    display.value += value; // Menambahkan angka setelahnya
  }
}

// Fungsi untuk menambahkan operator ke layar kalkulator
function appendOperator(operator) {
  const display = document.getElementById("display");
  const lastChar = display.value[display.value.length - 1];

  // Memastikan bahwa tidak ada dua operator berturut-turut
  if (lastChar && !isNaN(lastChar)) {
    // Menambahkan operator hanya jika karakter terakhir adalah angka
    display.value += operator;
  }
}
// Fungsi untuk menghitung hasil
function calculatE() {
  const display = document.getElementById("display");
  const inputValue = display.value.trim(); // Ambil nilai input dan hapus spasi di depan dan belakang

  // Validasi input sebelum melakukan evaluasi
  if (inputValue === "") {
    display.value = "Error"; // Jika kosong, tampilkan Error
    return;
  }

  // Ganti 'x' dengan '*' sebelum perhitungan
  let currentValue = inputValue.replace(/x/g, "*");

  // Validasi input menggunakan regular expression agar hanya karakter yang valid
  const validInputPattern = /^[\d+\-*/().\s]*$/;
  if (!validInputPattern.test(currentValue)) {
    display.value = "Error"; // Jika input tidak valid, tampilkan Error
    return;
  }

  try {
    // Menghitung ekspresi matematika yang dimasukkan
    const result = eval(currentValue);

    // Menangani hasil yang tidak valid seperti NaN atau Infinity
    if (isNaN(result) || !isFinite(result)) {
      display.value = "Error"; // Jika hasilnya NaN atau Infinity, tampilkan Error
    } else {
      display.value = result; // Jika hasil valid, tampilkan hasil

      // Menambahkan hasil ke history jika bukan angka 0
      if (result !== 0) {
        addToHistory(result); // Menyimpan hasil perhitungan ke dalam log history
      }
    }
  } catch (error) {
    // Tangani kesalahan lain yang mungkin terjadi
    display.value = "Error"; // Jika ada error dalam evaluasi, tampilkan Error
  }
}

// Array untuk menyimpan history operasi
let historyLog = [];

// Fungsi untuk menghapus tampilan layar kalkulator
function clearDisplay() {
  document.getElementById("display").value = "0";
}

// Fungsi untuk menghapus seluruh history kalkulator
function clearHistory() {
  historyLog = []; // Hapus semua elemen dalam history
  updateHistory(); // Perbarui tampilan history
}

// Fungsi untuk menambahkan operasi ke history
function addToHistory(operation) {
  // Tambahkan operasi ke array history
  historyLog.push(operation);

  // Update tampilan history
  updateHistory();
}

// Fungsi untuk memperbarui tampilan history di UI
function updateHistory() {
  const historyElement = document.getElementById("history-log");

  // Kosongkan tampilan history
  historyElement.innerHTML = "";

  // Tambahkan setiap item dalam historyLog ke tampilan
  historyLog.forEach((operation) => {
    const listItem = document.createElement("li");
    listItem.textContent = operation;
    historyElement.appendChild(listItem);
  });
}

// Fungsi untuk menghapus karakter terakhir (tombol Hapus)
function deleteLastChar() {
  const display = document.getElementById("display");
  let currentValue = display.value;

  // Jika hanya tersisa "0" atau tampilan kosong, biarkan tetap "0"
  if (currentValue.length === 1 || currentValue === "0") {
    display.value = "0";
  } else {
    display.value = currentValue.slice(0, -1); // Menghapus karakter terakhir
  }
}

// Fungsi untuk mengganti tanda angka (tombol ±)
function toggleSign() {
  const display = document.getElementById("display");
  if (display.value) {
    if (display.value.startsWith("-")) {
      display.value = display.value.substring(1); // Hapus tanda minus jika ada
    } else {
      display.value = "-" + display.value; // Tambahkan tanda minus
    }
  }
}
