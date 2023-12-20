const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const dbConfig = require('./dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke database
sql.connect(dbConfig, (err) => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    console.log('Terhubung ke database SQL Server');
  }
});

// Routes - Endpoint untuk menambahkan data ke tabel 'mahasiswa'
app.post('/addData', (req, res) => {
  const { Nama, Alamat, 'Nomor Telepon': NomorTelepon, 'Jenis kelamin': JenisKelamin } = req.body;
  const query = 'INSERT INTO mahasiswa (Nama, Alamat, [Nomor Telepon], [Jenis kelamin]) VALUES (@Nama, @Alamat, @NomorTelepon, @JenisKelamin)';
  
  // Parameter untuk query
  const params = {
    Nama,
    Alamat,
    NomorTelepon,
    JenisKelamin
  };

  // Eksekusi query dengan parameterized query
  new sql.Request().input('Nama', sql.NVarChar, params.Nama)
                    .input('Alamat', sql.NVarChar, params.Alamat)
                    .input('NomorTelepon', sql.NVarChar, params.NomorTelepon)
                    .input('JenisKelamin', sql.NVarChar, params.JenisKelamin)
                    .query(query, (err, result) => {
                        if (err) {
                            console.error('Error:', err);
                            res.status(500).send('Terjadi kesalahan saat menambahkan data');
                        } else {
                            console.log('Data berhasil ditambahkan');
                            res.status(200).send('Data berhasil ditambahkan');
                        }
                    });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
