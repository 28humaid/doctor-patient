// app/admin/prescriptions/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, Table as TableIcon, Plus } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PatientCard from '@/components/admin/PatientCard';
import PatientTable from '@/components/admin/PatientTable';
import CreateAppointmentModal from '@/components/admin/CreateAppointmentModal';
import PatientHistoryModal from '@/components/admin/PatientHistoryModal';
import EditPatientModal from '@/components/admin/EditPatientModal';

export default function PrescriptionsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null); // for history modal
  const [editingPatient, setEditingPatient] = useState(null);   // for edit modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/patients?search=${encodeURIComponent(search)}&page=${page}&limit=12`,
        { credentials: 'include' }
      );
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to load patients');
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page, search]);

  const handleDeletePatient = async (patientId) => {
    if (!confirm('Delete this patient and ALL appointments? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/patients/${patientId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setPatients(patients.filter(p => p._id !== patientId));
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Error deleting patient');
    }
  };

  if (loading && patients.length === 0) return <LoadingSpinner message="Loading patients..." />;

  return (
    <>
      <main className="container py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* <h1 className="text-3xl font-bold text-[hsl(var(--color-primary))]">Prescriptions</h1> */}

          <div className="flex items-center gap-4">
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 flex items-center gap-2 ${
                  viewMode === 'cards' ? 'bg-[hsl(var(--color-primary))] text-white' : 'bg-gray-100'
                }`}
              >
                <LayoutGrid size={18} /> Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 flex items-center gap-2 ${
                  viewMode === 'table' ? 'bg-[hsl(var(--color-primary))] text-white' : 'bg-gray-100'
                }`}
              >
                <TableIcon size={18} /> Table
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-[hsl(var(--color-primary))] text-white px-5 py-2.5 rounded-md hover:opacity-90 transition"
            >
              <Plus size={18} /> New Appointment
            </button>
          </div>
          {/* Search input */}
          <div>
            <input
              type="text"
              placeholder="Search by name or phone"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full max-w-md px-4 py-2.5 border rounded-md focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary))/0.2]"
            />
          </div>
        </div>
        
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {patients.length === 0 && !loading ? (
          <p className="text-center text-gray-500 py-12">No patients found</p>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onViewHistory={() => setSelectedPatient(patient)}
                onEdit={() => setEditingPatient(patient)}
                onDelete={() => handleDeletePatient(patient._id)}
              />
            ))}
          </div>
        ) : (
          <PatientTable
            patients={patients}
            onViewHistory={setSelectedPatient}
            onEdit={setEditingPatient}
            onDelete={handleDeletePatient}
          />
        )}

        {/* Pagination (simple for now) */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-5 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 self-center">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-5 py-2 border rounded"
          >
            Next
          </button>
        </div>
      </main>

      {/* Modals */}
      {showCreateModal && (
        <CreateAppointmentModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchPatients(); // refresh list
          }}
        />
      )}

      {selectedPatient && (
        <PatientHistoryModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onRefresh={fetchPatients}
        />
      )}

      {editingPatient && (
        <EditPatientModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onSuccess={() => {
            setEditingPatient(null);
            fetchPatients();
          }}
        />
      )}
    </>
  );
}