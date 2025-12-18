<?php
try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $tables = ['pengaduans', 'tanggapans', 'notifikasis', 'feedbacks'];
    
    // Delete migration records that created or modified these tables
    // We use LIKE queries to match standard naming conventions
    $sql = "DELETE FROM migrations WHERE 
            migration LIKE '%create_pengaduans%' OR 
            migration LIKE '%create_tanggapans%' OR 
            migration LIKE '%create_notifikasis%' OR 
            migration LIKE '%create_feedbacks%' OR
            migration LIKE '%add_%_to_pengaduans%' OR
            migration LIKE '%update_%_pengaduans%' OR
            migration LIKE '%feedback%'"; // Catch-all for feedback
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    echo "Deleted " . $stmt->rowCount() . " rows from migrations table.\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
