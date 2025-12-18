<?php
try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Dropping outdated pengaduans table...\n";
    $pdo->exec("DROP TABLE IF EXISTS pengaduans");

    echo "Recreating pengaduans table with FINAL schema...\n";
    
    // Status enum values: 'BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'DIPROSES_LURAH', 'SELESAI', 'DITOLAK', 'pending', 'diproses'
    // Default: 'BARU'
    
    $sql = "CREATE TABLE pengaduans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        judul VARCHAR NOT NULL,
        isi_laporan TEXT NOT NULL,
        kategori VARCHAR NOT NULL CHECK(kategori IN ('jalan', 'lampu', 'drainase', 'lainnya')),
        foto VARCHAR DEFAULT NULL,
        status VARCHAR DEFAULT 'BARU' CHECK(status IN ('BARU', 'DIPROSES_RT', 'DITERUSKAN_LURAH', 'DIPROSES_LURAH', 'SELESAI', 'DITOLAK', 'pending', 'diproses')),
        handled_by INTEGER DEFAULT NULL,
        is_urgent BOOLEAN DEFAULT 0,
        nama_pelapor VARCHAR NOT NULL,
        no_hp VARCHAR DEFAULT NULL,
        alamat_kejadian TEXT NOT NULL,
        tanggal_kejadian DATETIME DEFAULT NULL,
        created_at DATETIME,
        updated_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (handled_by) REFERENCES users (id) ON DELETE SET NULL
    )";
    
    $pdo->exec($sql);
    echo "Table pengaduans recreated successfully.\n";

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
