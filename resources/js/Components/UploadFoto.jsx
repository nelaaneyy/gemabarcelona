import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function UploadFoto({ onFileSelect, label = "Upload Foto", error, currentImage }) {
    const [preview, setPreview] = useState(currentImage || null);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const [isCompressing, setIsCompressing] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    const processFile = async (file) => {
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Mohon upload file gambar.');
            return;
        }

        // Show preview immediately for better UX
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file);

            // Pass to parent
            if (onFileSelect) {
                onFileSelect(compressedFile);
            }
        } catch (error) {
            console.error("Compression failed:", error);
            // Fallback to original file
            if (onFileSelect) {
                onFileSelect(file);
            }
        } finally {
            setIsCompressing(false);
        }
    };

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const maxWidth = 1200; // Max width for HD quality
            const maxHeight = 1200;
            const quality = 0.7; // 70% quality (good balance)

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height *= maxWidth / width));
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width *= maxHeight / height));
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Canvas is empty'));
                            return;
                        }
                        const newFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(newFile);
                    }, 'image/jpeg', quality);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const clearImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onFileSelect) {
            onFileSelect(null);
        }
    };

    return (
        <div className="w-full">
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}

            <div
                className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer bg-white
                    ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
                    ${error ? 'border-red-500' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                {preview ? (
                    <div className="relative w-full h-full flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className={`max-h-64 rounded shadow-md object-contain ${isCompressing ? 'opacity-50 blur-sm' : ''}`}
                        />
                        {isCompressing && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                                    Memproses...
                                </span>
                            </div>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearImage();
                            }}
                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Klik atau seret foto ke sini
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG maka 5MB
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}