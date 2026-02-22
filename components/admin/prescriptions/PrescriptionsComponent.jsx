import Tabs from "@/components/common/Tabs";
import AppointmentForm from "../AppointmentForm";
import PatientsListComponent from "./PatientsListComponent";

export default function PrescriptionsComponent({ tab }) {
    const currentTab = tab || "appointmentForm";

    const tabs = [
        { label: "Appointment Form", value: "appointmentForm" },
        { label: "Patients List", value: "patientsList" },
    ];

    return (
        <>
        <Tabs tabs={tabs} />
        <div className="p-6">
            {currentTab === "appointmentForm" && <AppointmentForm />}
            {currentTab === "patientsList" && <PatientsListComponent />}
        </div>
        </>
    );
}