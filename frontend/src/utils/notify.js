import { toast } from "react-toastify";

const notify = async (type, message, delay = 5000, hideProgressBar = false) => {
  await toast[type](message, {
    position: "top-right",
    autoClose: delay,
    hideProgressBar: hideProgressBar,
  });
};

export default notify;
