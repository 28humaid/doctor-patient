// components/admin/PatientCard.jsx
'use client';

import { User, Calendar, Edit, Trash2 } from 'lucide-react';

export default function PatientCard({ patient, onViewHistory, onEdit, onDelete }) {
  const appointmentCount = patient.appointments?.length || 0;
  const lastAppointment = patient.appointments?.length
    ? new Date(patient.appointments[patient.appointments.length - 1].appointmentDate).toLocaleDateString('en-IN')
    : 'No appointments yet';

  return (
    <div className="card p-6 hover:shadow-lg transition-all cursor-pointer group" onClick={onViewHistory}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <User size={14} /> {patient.age} years • {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 text-gray-500 hover:text-[hsl(var(--color-primary))] rounded hover:bg-gray-100"
            title="Edit patient details"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
            title="Delete patient"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1.5">
        <p className="flex items-center gap-2">
          <span className="font-medium">Phone:</span> {patient.phone}
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-500" />
          <span className="font-medium">Appointments:</span> {appointmentCount}
        </p>
        <p className="flex items-center gap-2 text-gray-600">
          <span className="font-medium">Last visit:</span> {lastAppointment}
        </p>
      </div>
    </div>
  );
}