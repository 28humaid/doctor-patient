// components/admin/AppointmentForm.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Input from '@/components/common/Input'; // your Input component

export default function AppointmentForm({ onSuccess }) {
  const [form, setForm] = useState({
    phone: '',
    name: '',
    yearOfBirth: '',
    gender: '',
    issue: '',
    prescription: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Search patients when phone changes (min 3 chars)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (form.phone.length < 3) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        const res = await fetch(`/api/admin/patients/search?q=${encodeURIComponent(form.phone)}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [form.phone]);

  const handleSelectPatient = (patient) => {
    setForm(prev => ({
      ...prev,
      phone: patient.phone,
      name: patient.name,
      yearOfBirth: patient.yearOfBirth.toString(),
      gender: patient.gender,
    }));
    setSearchResults([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone.trim(),
          name: form.name.trim(),
          yearOfBirth: Number(form.yearOfBirth),
          gender: form.gender,
          issue: form.issue.trim(),
          prescription: form.prescription.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccessMsg(data.message);
      if (onSuccess) onSuccess(data);

      // Reset form (except phone – doctor may want to add another appointment)
      setForm(prev => ({
        ...prev,
        issue: '',
        prescription: '',
        // name, age, gender stay filled if existing patient
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-wrap gap-4">
            {/* phone + Search Dropdown */}
            <div className="relative py-2 flex-1 min-w-[200px]">
            <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter 10-digit phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => {
                    // Small delay so click on dropdown item can register first
                    setTimeout(() => setIsPhoneFocused(false), 200);
                }}
                required
                maxLength={10}
            />

            {isPhoneFocused && form.phone.length > 0 && (
                <div
                ref={dropdownRef}
                className="absolute z-10 w-full mt-1 bg-blue-500 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                {searchLoading ? (
                    <div className="p-3 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                    searchResults.map(p => (
                    <div
                        key={p._id}
                        className="px-4 py-2 hover:bg-blue-50 hover:text-blue-500 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSelectPatient(p)}
                    >
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-600">{p.phone}</div>
                    </div>
                    ))
                ) : form.phone.length >= 3 ? (
                    <div className="p-3 text-center text-gray-500">No patient found</div>
                ) : null}
                </div>
            )}
            </div>

            {/* name */}
            <div className="py-2 flex-1 min-w-[200px]">
                <Input label="Patient Name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            {/* Year of Birth */}
            <div className="py-2 flex-1 min-w-[200px]">
                <Input
                label="Year of Birth"
                name="yearOfBirth"
                type="number"
                placeholder="YYYY"
                value={form.yearOfBirth}
                onChange={handleChange}
                required
                min={1900}
                max={new Date().getFullYear()}
                />
            </div>
            {/* gender wala dropdown */}
            <div className="py-2 flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                </label>
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2"
                >
                    <option value="" className="bg-blue-500">Select gender</option>
                    <option value="male" className="bg-blue-500">Male</option>
                    <option value="female" className="bg-blue-500">Female</option>
                    <option value="other" className="bg-blue-500">Other</option>
                </select>
            </div>
        </div>
        {/* complaints */}
        <div className="py-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chief Complaint / Issue <span className="text-red-500">*</span>
          </label>
          <textarea
            name="issue"
            value={form.issue}
            onChange={handleChange}
            required
            rows={3}
            className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2"
            placeholder="Describe the main problem..."
          />
        </div>

        {/* prescriptions */}
        <div className="py-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Prescription / Notes</label>
          <textarea
            name="prescription"
            value={form.prescription}
            onChange={handleChange}
            rows={5}
            className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2"
            placeholder="Medicines, dosage, instructions, follow-up advice..."
          />
        </div>
        
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {successMsg && <p className="text-green-600 font-medium my-4">{successMsg}</p>}

        <button
          type="submit"
          disabled={formLoading}
          className={`w-full my-6 py-3 px-4 font-medium rounded-md text-white ${
            formLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors flex items-center justify-center gap-2`}
        >
          {formLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            'Save Appointment'
          )}
        </button>
      </form>
    </div>
  );
}