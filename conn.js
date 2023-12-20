const sql = require('mssql');
const dbConfig = require('./dbConfig'); // Pastikan path ke file konfigurasi sesuai

// Fungsi untuk mencoba koneksi ke database
async function cobaKoneksi() {
  try {
    // Mencoba koneksi dengan konfigurasi yang telah Anda buat
    await sql.connect(dbConfig);
    console.log('Koneksi berhasil ke SQL Server');
  } catch (error) {
    console.error('Koneksi gagal:', error);
  } finally {
    // Menutup koneksi setelah selesai
    sql.close();
  }
}

// Memanggil fungsi untuk mencoba koneksi
cobaKoneksi();
