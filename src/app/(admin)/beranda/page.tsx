"use client";

import React, { useState } from "react";
import DeleteModal from "@/components/ui/modal/delete";

function BerandaAdminPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("Data dihapus");
  };
  return (
    <>
      <div className="text-black dark:text-white">Halaman Beranda</div>
      <button
        className="text-black dark:text-white"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        Hapus Item
      </button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Hapus"
        description="Anda yakin ingin menghapus item ini ?"
      />
    </>
  );
}

export default BerandaAdminPage;
