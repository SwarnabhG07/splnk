"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import githubIcon from "@/assets/2111432.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";



const formSchema = z.object({
  Linkurl: z.string().url("Please enter a valid URL"),
  short: z.string().optional(),
});

type IFormInput = z.infer<typeof formSchema>;

export default function Home() {
  const [generated, setGenerated] = useState("")
  const [qrCode, setQrCode] = useState("")

  const downloadQr = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: data.Linkurl,
      shorturl: data.short,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.error) {
          toast.error(result.message);
          return;
        }
        const shortUrl = `${process.env.NEXT_PUBLIC_HOST}/${data.short}`;
        setGenerated(shortUrl);
        try {
          const qrDataUrl = await QRCode.toDataURL(shortUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#1E1145',
              light: '#FFFFFF',
            },
          });
          setQrCode(qrDataUrl);
        } catch (err) {
          console.error('QR generation failed:', err);
          toast.error('Failed to generate QR code');
        }
        toast.success('Short link generated successfully!');
        reset();
        
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please try again.');
      });
  };
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#1E1145]">
            SpLnk
          </Link>
         
        </div>
        <div className="flex items-center space-x-4">
          
          <Link href="https://github.com/SwarnabhG07/splnk" target="_blank" rel="noopener noreferrer">
            <Button  className="bg-[#6635D0] hover:bg-[#5225B5] text-white rounded-lg px-4 h-10 font-medium gap-2">
              <Image src={githubIcon} alt="GitHub" width={20} height={20} className="invert" />
              Github
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 text-center mt-8 md:mt-2">
        <h1 className="text-[44px] md:text-[56px] font-bold text-[#1E1145] leading-tight tracking-tight">
          Shorter Links.
        </h1>
        <h2 className="text-[44px] md:text-[56px] font-normal text-[#362A5A] leading-tight mb-5">
          Deeper Engagement.
        </h2>

        <p className="text-[#59526C] max-w-150 text-[16px] mb-10 leading-relaxed font-medium">
          Take full control. Create short, branded links and QR codes you can edit anytime to keep your campaigns fresh and effective.
        </p>

        {/* Input Area */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl flex flex-col gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Link2 className="h-5 w-5 stroke-[1.5]" />
            </div>
            <Input
              type="url"
              {...register("Linkurl")}
              placeholder="Paste your long url"
              className="w-full h-14 pl-12 pr-6 text-base rounded-[16px] bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent placeholder:text-gray-400"
            />
          </div>
          {errors.Linkurl && <p className="text-red-500 text-sm text-left px-4 -mt-2">{errors.Linkurl.message}</p>}
          <div className="relative">
            <Input
              type="text"
              {...register("short")}
              placeholder="short name"
              className="w-full h-14 px-6 pr-36 text-base rounded-[16px] bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent placeholder:text-gray-400"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <Button type="submit" className="h-full bg-[#6635D0] hover:bg-[#5225B5] text-white rounded-[12px] px-6 text-sm font-medium">
                Short link
              </Button>
            </div>
          </div>
          {errors.short && <p className="text-red-500 text-sm text-left px-4 -mt-2">{errors.short.message}</p>}
        </form>

        {/* Feature List */}
        {!generated && (
          <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] font-medium text-[#1E1145]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#6635D0]" />
              <span>Customize QR</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#6635D0]" />
              <span>Unlimited short links</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#6635D0]" />
              <span>Unlimited custom back-halve</span>
            </div>
          </div>
        )}
        {/* Result Card */}
        {generated && (
          <div className="w-full max-w-2xl mt-2 mb-12 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E8E5F0] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
              {/* QR Code */}
              {qrCode && (
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="rounded-xl border-2 border-[#E8E5F0] p-1 bg-white shadow-sm">
                    <img src={qrCode} alt="QR Code" className="w-40 h-40 rounded-lg" />
                  </div>
                  <Button
                    type="button"
                    onClick={downloadQr}
                    variant="outline"
                    className="w-full text-xs font-medium text-[#6635D0] border-[#E8E5F0] hover:bg-[#F5F3FA] rounded-xl h-9"
                  >
                    Download QR
                  </Button>
                </div>
              )}
              {/* Short Link Info */}
              <div className="flex-1 flex flex-col items-start gap-3 min-w-0 w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6635D0]">Your short link</span>
                <div className="flex items-center gap-3 w-full">
                  <code className="flex-1 text-left text-base font-semibold text-[#1E1145] bg-[#F5F3FA] rounded-xl px-4 py-3 truncate border border-[#E8E5F0]">
                    {generated}
                  </code>
                  <Button
                    type="button"
                    onClick={() => { navigator.clipboard.writeText(generated); toast.success('Link copied to clipboard!'); }}
                    className="shrink-0 bg-[#6635D0] hover:bg-[#5225B5] text-white rounded-xl px-5 h-11 text-sm font-medium transition-all"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-[#59526C]">Scan the QR code or share the link directly</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
