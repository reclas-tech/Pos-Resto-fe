import Swal from "sweetalert2";

export const showAlert2 = (type: "success" | "error", message: string) => {
  const isSuccess = type === "success";

  Swal.fire({
    icon: isSuccess ? "success" : "error",
    title: isSuccess ? "Sukses" : "Gagal",
    text: message,
    timer: isSuccess ? 2000 : undefined,
    showConfirmButton: false,
    timerProgressBar: isSuccess,
    showClass: { popup: "animate__animated animate__fadeInDown" },
    hideClass: { popup: "animate__animated animate__fadeOutUp" },
    customClass: {
      title: isSuccess
        ? "text-2xl font-semibold text-green-600"
        : "text-2xl font-semibold text-red-600",
      icon: isSuccess ? "text-green-500 animate-bounce" : "animate-bounce",
      timerProgressBar: "bg-gradient-to-r from-blue-400 to-green-400",
      confirmButton: "bg-primary",
    },
    backdrop: `rgba(0, 0, 0, 0.4)`,
    iconColor: isSuccess ? "#A5DC86" : "#EE1616",
  });
};
