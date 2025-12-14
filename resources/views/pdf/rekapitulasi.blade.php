<!DOCTYPE html>
<html>
<head>
    <title>Rekapitulasi Pengaduan</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; }
        .header p { margin: 5px 0; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #333; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        .center { text-align: center; }
        .footer { margin-top: 30px; text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rekapitulasi Pengaduan Masyarakat</h1>
        <p>{{ $area }}</p>
        <p>Periode: Sampai dengan {{ $tanggal }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Tanggal</th>
                <th width="20%">Pelapor</th>
                <th width="30%">Judul Laporan</th>
                <th width="15%">Kategori</th>
                <th width="15%">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pengaduans as $index => $item)
                <tr>
                    <td class="center">{{ $index + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($item->created_at)->translatedFormat('d F Y') }}</td>
                    <td>{{ $item->user->name ?? 'Warga (Terhapus)' }}</td>
                    <td>{{ $item->judul }}</td>
                    <td>{{ $item->kategori ?? '-' }}</td>
                    <td class="center" style="font-weight: bold; color: green;">
                        {{ $item->status }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="center">Tidak ada data pengaduan yang selesai.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak pada: {{ $tanggal }}</p>
        <p>Oleh: {{ $user->name }} ({{ strtoupper($user->role) }})</p>
    </div>
</body>
</html>
