import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#1E1145]">
            SpLnk
          </Link>
          {/* <div className="hidden md:flex space-x-8 text-[15px] font-medium text-[#403B52]">
            <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
            <Link href="/" className="hover:text-purple-700 transition-colors">Pricing</Link>
            <Link href="/" className="hover:text-purple-700 transition-colors">FAQs</Link>
            <Link href="/" className="hover:text-purple-700 transition-colors">API</Link>
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-sm font-medium border-[#D5D2DF] text-[#1E1145] hover:bg-gray-50 rounded-lg px-6 h-10">
            Login
          </Button>
          <Button className="bg-[#6635D0] hover:bg-[#5225B5] text-white rounded-lg px-6 h-10 font-medium">
            Start for free
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 text-center mt-8 md:mt-16">
        <h1 className="text-[44px] md:text-[56px] font-bold text-[#1E1145] leading-tight tracking-tight">
          Shorter Links.
        </h1>
        <h2 className="text-[44px] md:text-[56px] font-normal text-[#362A5A] leading-tight mb-5">
          Deeper Engagement.
        </h2>
        
        <p className="text-[#59526C] max-w-[600px] text-[16px] mb-10 leading-relaxed font-medium">
          Take full control. Create short, branded links and QR codes you can edit anytime to keep your campaigns fresh and effective.
        </p>

        {/* Input Area */}
        <div className="w-full max-w-2xl relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Link2 className="h-5 w-5 stroke-[1.5]" />
          </div>
          <Input 
            type="url" 
            placeholder="Paste your long url" 
            className="w-full h-14 pl-12 pr-[120px] text-base rounded-[16px] bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent placeholder:text-gray-400"
          />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <Button className="h-full bg-[#6635D0] hover:bg-[#5225B5] text-white rounded-[12px] px-6 text-sm font-medium">
              Short link
            </Button>
          </div>
        </div>

        {/* Feature List */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] font-medium text-[#1E1145]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-[18px] w-[18px] text-[#6635D0]" />
            <span>Customize QR</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-[18px] w-[18px] text-[#6635D0]" />
            <span>Unlimited short links</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-[18px] w-[18px] text-[#6635D0]" />
            <span>Unlimited custom back-halve</span>
          </div>
        </div>
      </main>
    </div>
  );
}
