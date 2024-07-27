import Swal from "sweetalert2";

export const swalAdd = () => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Data berhasil ditambahkan",
    confirmButtonColor: "#3085d6",
  });
};

export const swalUpdate = () => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Data berhasil diupdate",
    confirmButtonColor: "#3085d6",
  });
};

export const swalDelete = (
  deleteData,
  message = "Data yang di hapus tidak dapat dikembalikan"
) => {
  Swal.fire({
    title: "Apa anda yakin?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteData()
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Data berhasil di hapus",
            icon: "success",
          });
        })
        .catch((error) => {
          swalError(error.message);
        });
    }
  });
};

export const swalFail = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Data tidak ditemukan!",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const swalError = (message = "Something went wrong") => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
