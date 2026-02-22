import PrescriptionsComponent from "@/components/admin/prescriptions/PrescriptionsComponent";

export default async function PrescriptionsPage({ searchParams }){
  const params = await searchParams;
  const tab = params?.tab || "appointmentForm";
  return(
  <>
    <div>
      <PrescriptionsComponent tab={tab}/>
    </div>
  </> 
  )
}