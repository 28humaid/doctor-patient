// components/admin/PatientDetailDrawer.jsx
import { X } from 'lucide-react';

export default function PatientDetailDrawer({ patient, currentYear, onClose }) {
  if (!patient) return null;

  const age = currentYear - patient.yearOfBirth;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      <div
        className={`
          w-full mx-auto bg-white rounded-t-2xl shadow-2xl 
          transform transition-transform duration-300 ease-in-out
          max-h-[90vh] overflow-y-auto
        `}
      >
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[hsl(var(--color-primary))]">
            {patient.name} • {patient.phone}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-[hsl(var(--color-primary))]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[hsl(var(--color-primary))]">
            <div>
              <label className="block text-sm text-gray-500">Name</label>
              <p className="mt-1 font-medium">{patient.name}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Mobile</label>
              <p className="mt-1 font-medium">{patient.mobile}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Gender</label>
              <p className="mt-1 font-medium capitalize">{patient.gender}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Year of Birth</label>
              <p className="mt-1 font-medium">{patient.yearOfBirth}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Approximate Age</label>
              <p className="mt-1 font-medium">{age} years</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Total Appointments</label>
              <p className="mt-1 font-medium">
                {patient.appointments?.length || 0}
              </p>
            </div>
          </div>

          {/* Appointments */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--color-primary))]">Appointment History</h3>

            {patient.appointments?.length > 0 ? (
              <div className="overflow-x-auto border border-gray-200 rounded-lg text-[hsl(var(--color-primary))]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Issue / Complaint
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Prescription
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patient.appointments
                      .slice()
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((appt, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs md:text-sm">
                            {new Date(appt.appointmentDate || appt.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 text-gray-900 text-xs md:text-sm">
                            {appt.issue}
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-xs md:text-sm">
                            {appt.prescription || <span className="text-gray-400">—</span>}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No appointments recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}