import React, { useState } from "react";
import axios from "axios";
import { showPopup } from "../../Components/Notification";

const useCreateExcelFile = (filename) => {
    const [downloading, setDownloading] = useState(false);

    const downloadExcelFile = async (data) => {
        try {
            setDownloading(true);

            const response = await axios.post('/createExcel', data, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename+'.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setDownloading(false);
        } catch (error) {
            setDownloading(false);
            showPopup({ success: false, message: 'Error in downloading file' });
            console.error('Error downloading file:', error);
        }
    };

    return { downloadExcelFile, downloading };
};

export default useCreateExcelFile;
