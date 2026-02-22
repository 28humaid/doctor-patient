// components/admin/PatientsTable.jsx
import { Trash2 } from 'lucide-react';

export default function PatientsTable({
  patients,
  currentYear,
  onViewDetails,
  onDeleteRequest,
  deleteLoading,
}) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
        No patients found yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[160px]">
              Year of Birth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {patients.map((patient) => {
            const age = currentYear - patient.yearOfBirth;
            return (
              <tr key={patient._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-sm text-gray-900">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {patient.yearOfBirth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewDetails(patient)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDeleteRequest(patient)}
                    disabled={deleteLoading}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    title="Delete patient"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}