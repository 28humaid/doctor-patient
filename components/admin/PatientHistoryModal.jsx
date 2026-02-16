// components/admin/PatientHistoryModal.jsx
'use client';

import { X, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function PatientHistoryModal({ patient, onClose, onRefresh }) {
  if (!patient) return null;

  const sortedAppointments = [...(patient.appointments || [])].sort(
    (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p className="text-sm text-gray-600">
              {patient.age} years • {patient.gender} • {patient.phone}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {sortedAppointments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No appointments recorded yet
            </div>
          ) : (
            <div className="space-y-6">
              {sortedAppointments.map((appt) => (
                <div key={appt._id} className="border rounded-lg p-5 bg-gray-50/50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-[hsl(var(--color-primary))]" size={20} />
                      <div>
                        <p className="font-medium">
                          {format(new Date(appt.appointmentDate), 'dd MMM yyyy • hh:mm a')}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">Issue: {appt.issue}</p>
                      </div>
                    </div>
                  </div>

                  {appt.prescription && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-start gap-2">
                        <FileText size={16} className="text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Prescription:</p>
                          <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
                            {appt.prescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}