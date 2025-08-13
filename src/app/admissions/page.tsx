import { AdmissionForm } from "@/components/admission-form";
import { Header } from "@/components/header";

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <AdmissionForm />
        </div>
      </main>
    </div>
  );
}
