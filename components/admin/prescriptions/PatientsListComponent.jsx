// components/admin/PatientsListPage.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PatientsTable from './PatientsTable';
import PatientDetailDrawer from './PatientDetailDrawer';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function PatientsListComponent() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/patients', {
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error('Please login as admin');
        throw new Error('Failed to load patients');
      }

      const data = await res.json();
      setPatients(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering (name OR mobile)
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;

    const term = searchTerm.toLowerCase().trim();

    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.phone.includes(term)
    );
  }, [patients, searchTerm]);

  const handleDeleteRequest = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return;

    setDeleteLoading(true);
    setShowDeleteConfirm(false);

    try {
      const res = await fetch(`/api/admin/patients/${patientToDelete._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setPatients((prev) => prev.filter((p) => p._id !== patientToDelete._id));

      if (selectedPatient?._id === patientToDelete._id) {
        setSelectedPatient(null);
      }
    } catch (err) {
      setError('Could not delete patient: ' + err.message);
      console.error(err);
    } finally {
      setDeleteLoading(false);
      setPatientToDelete(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading patients..." />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full px-4 py-2.5 border border-gray-300 rounded-md 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              placeholder:text-gray-400 transition-colors
            "
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <PatientsTable
        patients={filteredPatients}
        currentYear={currentYear}
        onViewDetails={setSelectedPatient}
        onDeleteRequest={handleDeleteRequest}
        deleteLoading={deleteLoading}
      />

      <PatientDetailDrawer
        patient={selectedPatient}
        currentYear={currentYear}
        onClose={() => setSelectedPatient(null)}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        patientName={patientToDelete?.name}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteLoading}
      />
    </div>
  );
}