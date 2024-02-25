import { defineStore } from "pinia";
import type { ToastMessageOptions } from "primevue/toast";
import { useToast } from "primevue/usetoast";

export const useToastStore = defineStore('ToastStore', () => {
    const toast = useToast();

    function showToast(options: ToastMessageOptions) {
        toast.add(options);
    }

    return {
        showToast,
    };
});