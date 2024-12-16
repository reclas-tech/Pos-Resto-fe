"use client";

import React, { useState } from "react";
import DeleteModal from "@/components/ui/actionButton/delete";

function BerandaAdminPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    // Logika penghapusan data Anda
    console.log("Data dihapus");
  };
  return (
    <>
      <div className="div">Halaman Beranda</div>
      <button onClick={() => setIsDeleteModalOpen(true)}>Hapus Item</button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Hapus Data"
        description="Apakah Anda yakin ingin menghapus data ini?"
      />
    </>
  );
}

export default BerandaAdminPage;
