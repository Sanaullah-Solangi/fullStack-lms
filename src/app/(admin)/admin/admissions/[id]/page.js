import { getSingalAdmission } from "@/app/actions/admissions";
import AdmissionDetails from "@/components/AdmissionDetails/AdmissionDetails";

export default async function AdmissionDetailsPage({ params }) {
  const { id } = await params;
  const { admission } = await getSingalAdmission(id);
  console.log("Details in DynamicRoute of Admission=>", admission);
  return <AdmissionDetails admission={admission} />;
}