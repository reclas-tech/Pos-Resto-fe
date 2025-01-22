import Swal from "sweetalert2";

interface AlertProps {
  message: string;
  onConfirm?: () => void;
}

export const showAlertDineIn = ({ message, onConfirm }: AlertProps) => {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: true,
    timerProgressBar: false,
    showClass: { popup: "animate__animated animate__fadeInDown" },
    hideClass: { popup: "animate__animated animate__fadeOutUp" },
    confirmButtonText: "Print",
    confirmButtonColor: "#114F44",
    backdrop: `rgba(0, 0, 0, 0.4)`,
    iconColor: "#00BF40",
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};
