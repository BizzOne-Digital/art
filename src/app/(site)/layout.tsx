import { IntroWrapper } from "@/components/IntroWrapper";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerBar } from "@/components/DisclaimerBar";
import { SiteMusic } from "@/components/SiteMusic";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <IntroWrapper>
      <div className="flex min-h-screen flex-col">
        <DisclaimerBar text={settings.disclaimer} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteMusic src={settings.musicUrl} />
      </div>
    </IntroWrapper>
  );
}
