import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Bootcamp = ({ initialData = {}, action }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [useCurrentTime, setUseCurrentTime] = useState(false);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [minDateTime, setMinDateTime] = useState('');
  const quillRef = useRef(null);
  const flag = Object.keys(initialData).length > 0 
  useEffect(() => {
    const now = new Date();
    const minDateTimeString = now.toISOString().slice(0, 16);
    setMinDateTime(minDateTimeString);
  }, []);

  useEffect(() => {
    if (flag) {
      const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16);
      };

      setMinDateTime(formatDate(initialData.start_date));
      setTitle(initialData.title || '');
      setStartDate(formatDate(initialData.start_date));
      setEndDate(formatDate(initialData.end_date));
      setAdditionalInfo(initialData.additional_info || '');
      setAmount(initialData.amount || '');

     
        setImage(initialData.image_path || '');
        setImagePreview(initialData.image_path || '');
      
    }
  }, [initialData]);

  const handleUseCurrentTimeChange = (event) => {
    const checked = event.target.checked;
    setUseCurrentTime(checked);
    if (checked) {
      setStartDate(minDateTime);
    } else {
      setStartDate('');
      setEndDate('');
    }
  };

  const addHoursToDate = (dateString, hours) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toISOString().slice(0, 16);
  };

  const handleImageChange = (e) => {
    
    
      setImage(e.target.value);
      setImagePreview(e.target.value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let now = new Date();
    const errors = {};
    if (initialData) {
      now = minDateTime;
    }
    if (useCurrentTime) {
      if (!startDate) {
        errors.startDate = 'Start date is required.';
      }
    } else {
      if (new Date(startDate) <= now) {
        errors.startDate = 'Start date must be in the future.';
      }
    }

    if (new Date(endDate) <= new Date(startDate)) {
      errors.endDate = 'End date must be at least 1 hour after start date.';
    }
    if (additionalInfo.length < 20) {
      errors.additionalInfo = 'Additional info should be more than 20 characters.';
    }
    if (image == null) {
      errors.image = 'Image field cannot be empty.';
    }
    if (!amount) {
      errors.amount = 'Amount field cannot be empty.';
    }
    setErrors(errors);
    if (Object.keys(errors).length) {
      return;
    }
  console.log(image)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('additionalInfo', additionalInfo);
    formData.append('image_path', image);
    formData.append('amount', amount);

    if (action(formData)) {
      handleReset();
    } else {
      return;
    }
  };

  const handleReset = () => {
    setTitle(initialData.title || '');
    setStartDate(initialData.startDate || '');
    setEndDate(initialData.endDate || '');
    setAdditionalInfo(initialData.additionalInfo || '');
    setImage(initialData.image_path || null);
    setImagePreview(initialData.image_path ? initialData.image : null);
    setAmount(initialData.amount || '');
    setUseCurrentTime(false);
    setErrors({});
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{initialData.title ? 'Edit Bootcamp' : 'Add Bootcamp'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-lg font-semibold mb-2">Bootcamp Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter Bootcamp Title"
            required
          />
        </div>

        <div className={`"flex flex-col mb-4" `}>
          <div className={`${useCurrentTime ? 'hidden' : 'block'} flex flex-col mb-4`}>
            <label htmlFor="start-date" className="text-lg font-semibold mb-2">Start Date and Time:</label>
            <input
              type="datetime-local"
              id="start-date"
              name="start-date"
              min={minDateTime}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`p-2 border rounded ${errors.startDate ? 'border-red-500' : ''}`}
              disabled={useCurrentTime}
              required
            />
          </div>
          {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="use-current-time"
              checked={useCurrentTime}
              onChange={handleUseCurrentTimeChange}
              className="mr-2"
            />
            <label htmlFor="use-current-time" className="text-lg font-semibold">Use Current Time</label>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="end-date" className="text-lg font-semibold mb-2">End Date and Time:</label>
          <input
            type="datetime-local"
            id="end-date"
            name="end-date"
            value={endDate}
            min={addHoursToDate(startDate === '' ? minDateTime : startDate, 1)}
            onChange={(e) => setEndDate(e.target.value)}
            className={`p-2 border rounded ${errors.endDate ? 'border-red-500' : ''}`}
            required
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="image" className="text-lg font-semibold mb-2">Upload Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={handleImageChange}
            className="p-2 border rounded"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-24 h-32"
            />
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="additional-info" className="text-lg font-semibold mb-2">Additional Info:</label>
          <ReactQuill
            ref={quillRef}
            id="additional-info"
            value={additionalInfo}
            onChange={setAdditionalInfo}
            className="p-2 border rounded"
          />
          {errors.additionalInfo && <p className="text-red-500">{errors.additionalInfo}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="text-lg font-semibold mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`p-2 border rounded ${errors.amount ? 'border-red-500' : ''}`}
            placeholder="Enter Amount"
            required
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">{flag ? 'Save': 'Add Bootcamp' }</button>
          {flag && <button type="button" onClick={handleReset} className="bg-gray-300 text-black p-2 rounded">Cancel</button>}
        </div>
      </form>
    </div>
  );
}; 

export default Bootcamp;
