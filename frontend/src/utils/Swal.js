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

export const swalDelete = (id, deleteData) => {
  Swal.fire({
    title: "Apa anda yakin?",
    text: "Data yang di hapus tidak dapat dikembalikan",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteData(id);
      Swal.fire({
        title: "Deleted!",
        text: "Data berhasil di hapus",
        icon: "success",
      });
    }
  });
};
