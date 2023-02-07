/**
 * Wrapper for notificaiton toasts
 */

import { useToast } from "vue-toastification";

export const useNotify = () => {
  const toast = useToast();

  const notifyError = (message, timeout = 2500) => {
    toast.error(message, {
      timeout,
      toastClassName: "notification-error",
    });
  };

  const notifySuccess = (message, timeout = 2500) => {
    toast.success(message, {
      timeout,
      toastClassName: "notification-success",
    });
  };

  return {
    notifyError,
    notifySuccess,
  };
};
