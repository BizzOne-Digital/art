import Image from "next/image";
import Link from "next/link";

const BRAND_LOGO = "/elite-body-logo.png";
const ISSA_SEAL = "/issa-certified-seal.png";

export function BrandHeader() {
  return (
    <div className="relative z-[58] border-b border-black/10 bg-white px-3 py-3 sm:px-4 sm:py-4">
      <Link
        href="/"
        aria-label="Elite Body Fitness Pros home"
        className="mx-auto flex max-w-md flex-col items-center"
      >
        <Image
          src={BRAND_LOGO}
          alt="Elite Body Fitness Pros"
          width={320}
          height={180}
          priority
          className="h-auto w-full max-w-[220px] object-contain sm:max-w-[280px] md:max-w-[320px]"
        />
        <Image
          src={ISSA_SEAL}
          alt="ISSA Nationally Certified Trainer"
          width={120}
          height={120}
          className="mt-2 h-auto w-full max-w-[72px] object-contain sm:max-w-[88px] md:max-w-[100px]"
        />
      </Link>
    </div>
  );
}
