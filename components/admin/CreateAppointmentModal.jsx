// components/admin/CreateAppointmentModal.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Loader2, UserPlus, Check } from 'lucide-react';
import Input from '@/components/common/Input'; // your reusable Input
import ConfirmModal from '@/components/common/ConfirmModal';

export default function CreateAppointmentModal({ onClose, onSuccess }) {
  const [phone, setPhone] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    appointmentDate: '',
    issue: '',
    prescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced phone search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phone.length >= 3) {
        searchPatients();
      } else {
        setSearchResults([]);
        setSelectedPatient(null);
        setIsAddingNew(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [phone]);

  const searchPatients = async () => {
    try {
      const res = await fetch(`/api/admin/patients?search=${encodeURIComponent(phone)}&limit=8`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSearchResults(data.patients || []);
    } catch {
      setSearchResults([]);
    }
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData((prev) => ({
      ...prev,
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
    }));
    setIsAddingNew(false);
    setSearchResults([]);
  };

  const handleAddNewPatient = () => {
    setIsAddingNew(true);
    setSelectedPatient(null);
    setFormData((prev) => ({
      ...prev,
      name: '',
      age: '',
      gender: '',
    }));
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (isAddingNew) {
      if (!formData.name || !formData.age || !formData.gender) {
        setError('Please fill all patient details for new patient');
        return;
      }
    }
    if (!formData.appointmentDate || !formData.issue) {
      setError('Appointment date and issue are required');
      return;
    }

    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError('');

    try {
      let patientId = selectedPatient?._id;

      // Step 1: Create new patient if needed
      if (isAddingNew) {
        const createRes = await fetch('/api/admin/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            name: formData.name.trim(),
            age: parseInt(formData.age),
            gender: formData.gender,
            phone: phone.trim(),
          }),
        });

        if (!createRes.ok) {
          const errData = await createRes.json();
          throw new Error(errData.error || 'Failed to create patient');
        }

        const newPatient = await createRes.json();
        patientId = newPatient.patient._id;
      }

      // Step 2: Add appointment
      const apptRes = await fetch(`/api/admin/patients/${patientId}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          appointmentDate: new Date(formData.appointmentDate).toISOString(),
          issue: formData.issue.trim(),
          prescription: formData.prescription.trim() || undefined,
        }),
      });

      if (!apptRes.ok) throw new Error('Failed to add appointment');

      onSuccess();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--bg-card)] rounded-[var(--radius-lg)] 
            shadow-[0_10px_25px_rgba(0,0,0,0.12)] 
            max-w-md w-full overflow-hidden
            transform transition-all duration-200 overflow-y-auto max-h-[560px] relative">
                {/* header */}
        <div className="sticky top-0 px-6 py-4 border-b flex justify-between items-center z-10 bg-[var(--bg-card)]">
            <h2 className="text-xl font-bold">New Appointment</h2>
            <button onClick={onClose} disabled={loading}>
                <X size={24} className="text-gray-500 hover:text-gray-800" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className=" space-y-5">
          {/* Phone + Search */}
          <div className="relative px-6">
            <Input
              label="Patient Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              required
              maxLength={10}
            />

            {searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {searchResults.map((p) => (
                  <div
                    key={p._id}
                    className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => handleSelectPatient(p)}
                  >
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.phone}</div>
                    </div>
                    <Check size={16} className="text-green-600" />
                  </div>
                ))}
                <div
                  className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 cursor-pointer flex items-center gap-2 font-medium text-[hsl(var(--color-primary))]"
                  onClick={handleAddNewPatient}
                >
                  <UserPlus size={16} /> Add New Patient
                </div>
              </div>
            )}
          </div>

          {/* Patient fields – shown when selected or adding new */}
          {(selectedPatient || isAddingNew) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 px-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isAddingNew}
                required
              />
              <Input
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                disabled={!isAddingNew}
                required
                min="0"
              />
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  disabled={!isAddingNew}
                  className="w-full px-4 py-2.5 border rounded-md focus:border-[hsl(var(--color-primary))]"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Appointment fields */}
          {(selectedPatient || isAddingNew) && (
            <div className="space-y-5 pt-4 px-6">
              <Input
                label="Appointment Date & Time"
                name="appointmentDate"
                type="datetime-local"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                required
              />
              <Input
                label="Chief Complaint / Issue"
                name="issue"
                placeholder="e.g., Fever, cough for 3 days"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription (optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.prescription}
                  onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-md focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary))/0.2]"
                  placeholder="e.g., Tab. Paracetamol 500mg TDS × 3 days..."
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
{/* Footer */}
          <div className="sticky bottom-0 py-4 px-6 border-t flex justify-between items-center z-10 bg-[var(--bg-card)]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 border rounded-md hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (!selectedPatient && !isAddingNew)}
              className="px-6 py-2.5 bg-[hsl(var(--color-primary))] text-white rounded-md hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? 'Saving...' : 'Save Appointment'}
            </button>
          </div>
        </form>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        title="Confirm Appointment"
        message="Are you sure you want to save this appointment?"
        confirmText="Save"
        confirmButtonClass="bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-dark))]"
        isLoading={loading}
      />
    </div>
  );
}