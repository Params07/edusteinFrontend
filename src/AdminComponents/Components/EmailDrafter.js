import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import usePost from '../Hooks/UsePost';


const EmailDrafter = ({ emails, onClose,showPopup }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [errors,setErrors]=useState({})
  const { post, loading, error } = usePost(`${process.env.REACT_APP_BACKEND_URL}/send-email`);
  const [scheduleOption, setScheduleOption] = useState('now'); // 'now' or 'schedule'
  const formatForDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const [scheduleDate, setScheduleDate] = useState(formatForDateTimeLocal(new Date()));
  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSend = async () => {
    const newEr = {}
    if ( !content) {
      newEr.content = "cant send empty email"
      setErrors(newEr);
      return;
    }
    setErrors(newEr);
    
    setIsSending(true);
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', content);
    formData.append('to', JSON.stringify(emails));

    files.forEach((file) => {
      formData.append('files', file);
    });
    if (scheduleOption === 'schedule') {
      const now = new Date();
      const scheduledTime = new Date(scheduleDate);
      const offset = 5.5 * 60 * 60 * 1000; 
      const scheduledTimeUTC = new Date(scheduledTime.getTime() - offset);
       const delayMs = scheduledTime.getTime() - now.getTime();
      
      
      formData.append('startDelay', delayMs);
      console.log(delayMs)
    }else{
      formData.append('startDelay', 0);
    }
    try {
      await post(formData);
     showPopup({success: true, message: 'email sent' })
      onClose(); 
    } catch (error) {
      console.error('Failed to send emails:', error);
      showPopup({success:false, message: 'Couldnt send email' })
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Draft Email</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">To:</label>
          <div className="border p-2 rounded">
            {emails.join(', ')}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Subject:</label>
          <input
            type="text"
            value={subject}
            required
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Body:</label>
          <ReactQuill value={content} onChange={setContent} />
          {errors.content && <p className='text-red-300'> {errors.content}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Attach Files:</label>
          <input
            type="file"
            multiple
            onChange={handleFilesChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {files.length > 0 && (
            <div>
              <h3 className="font-semibold mt-2">Selected Files:</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4">
       
          <label className="block text-sm font-bold mb-2">Schedule Email:</label>
          <select
            value={scheduleOption}
            onChange={(e) => setScheduleOption(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="now">Send Now</option>
            <option value="schedule">Schedule for Later</option>
          </select>
          {scheduleOption === 'schedule' && (
            <div className="mt-2">
              <label className="block text-sm font-bold mb-2">Schedule Date & Time:</label>
              <input
                type="datetime-local"
                min={formatForDateTimeLocal(new Date())}

                value={scheduleDate}

                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${loading || isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || isSending}
          >
            {loading || isSending ? 'Sending...' : 'Send'}  
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </div>
    </div>
  );
}
export default EmailDrafter;
