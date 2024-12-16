import React from "react";
import InputEmail from "../components/InputEmail";
import Link from "next/link";

function ForgetPasswordPage() {
  return (
    <>
      <form action="" className="w-[388px]">
        <div className="space-y-4">
          <div className="">
            <h3 className="text-2xl font-semibold">Lupa Password</h3>
            <h4>Masukkan Email Anda</h4>
          </div>

          <InputEmail />

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

export default ForgetPasswordPage;
