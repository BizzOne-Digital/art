import { SiteBrand } from "@/components/SiteBrand";

export function PageBrandBar() {
  return (
    <div className="border-b border-black/10 bg-white px-4 py-5 sm:px-6 sm:py-7">
      <div className="container-site flex justify-center">
        <SiteBrand size="page" linked={false} className="justify-center" />
      </div>
    </div>
  );
}
