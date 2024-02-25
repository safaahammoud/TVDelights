import axios from 'axios';
import { defineStore } from "pinia";

import { useToastStore } from '@/stores/ToastStore';

export const useConfigStore = defineStore('useConfigStore', () => {
    const toastStore = useToastStore();
    
    function setAxiosInterceptors() {   
        axios.interceptors.response.use((response) => {
            return response;
        }, function(error) {
            toastStore.showToast({
                severity: 'error',
                summary: 'Error',
                detail: 'Error occurred, please try again later',
                life: 5000,
            });
    
            return Promise.reject(error);
        });
    }

    return {
        setAxiosInterceptors,
    };
});