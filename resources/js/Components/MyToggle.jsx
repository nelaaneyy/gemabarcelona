// resources/js/Components/MyToggle.jsx
import { useState } from 'react';
import { Switch } from '@headlessui/react';

// 'enabled' & 'setEnabled' dikirim sebagai props dari luar
export default function MyToggle({ enabled, setEnabled }) {
  
  return (
    <Switch
      checked={enabled} // 1. Nilai (state) dari toggle
      onChange={setEnabled} // 2. Fungsi untuk mengubah state
      
      // 3. Styling menggunakan Tailwind
      // ui-checked: adalah class saat 'enabled' = true
      // ui-not-checked: adalah class saat 'enabled' = false
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2
        ${enabled ? 'bg-green-600' : 'bg-gray-200'}
      `}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        aria-hidden="true"
        // 4. Animasi untuk lingkaran di dalamnya
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </Switch>
  );
}