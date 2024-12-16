import React from "react";
import InputPassword from "../components/InputPassword";
import Link from "next/link";

function CreateNewPasswordPage() {
  return (
    <>
      <form action="" className="w-[388px]">
        <div className="space-y-4">
          <div className="">
            <h3 className="text-2xl font-semibold">Buat Kata Sandi Baru</h3>
            <h4>Silahkan masukkan kata sandi baru</h4>
          </div>
          <div className="space-y-2">
            <InputPassword />
            <InputPassword />
            <Link href="/auth/lupa-password" className="inline-block text-sm">
              Lupa Password?
            </Link>
          </div>
          <div className="space-y-2 text-center">
            <button
              type="submit"
              className="w-full bg-primaryColor rounded-md py-2 "
            >
              Masuk
            </button>

            <p className="text-danger">Masukkan Email Anda</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateNewPasswordPage;
