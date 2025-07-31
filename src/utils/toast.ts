// src/utils/toast.js
import { toast } from "react-toastify";

const Toast = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast.info(msg),
  warn: (msg: string) => toast.warn(msg),
};

export default Toast;
