<?php
try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. PENGADUANS
    echo "Creating pengaduans table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS pengaduans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        judul VARCHAR NOT NULL,
        deskripsi TEXT NOT NULL,
        kategori VARCHAR NOT NULL CHECK(kategori IN ('jalan', 'lampu', 'drainase', 'lainnya')),
        foto VARCHAR DEFAULT NULL,
        status VARCHAR DEFAULT 'pending' CHECK(status IN ('pending', 'diproses', 'selesai')),
        handled_by INTEGER DEFAULT NULL,
        created_at DATETIME,
        updated_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (handled_by) REFERENCES users (id) ON DELETE SET NULL
    )");

    // 2. TANGGAPANS
    echo "Creating tanggapans table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS tanggapans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pengaduan_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        isi_tanggapan TEXT NOT NULL,
        is_private BOOLEAN DEFAULT 0,
        created_at DATETIME,
        updated_at DATETIME,
        FOREIGN KEY (pengaduan_id) REFERENCES pengaduans (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )");

    // 3. NOTIFIKASIS
    echo "Creating notifikasis table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS notifikasis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        pesan TEXT NOT NULL,
        status VARCHAR DEFAULT 'unread' CHECK(status IN ('unread', 'read')),
        created_at DATETIME,
        updated_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )");

    // 4. FEEDBACKS
    echo "Creating feedbacks table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS feedbacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pengaduan_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        rating INTEGER DEFAULT NULL,
        komentar TEXT DEFAULT NULL,
        created_at DATETIME,
        updated_at DATETIME,
        FOREIGN KEY (pengaduan_id) REFERENCES pengaduans (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )");

    echo "All tables created successfully.\n";

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
