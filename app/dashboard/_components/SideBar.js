import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bluetooth, Layout, LayoutDashboardIcon, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadSlideDialog from "./UploadSlideDialog";

function SideBar () {
  return (
    <div className="shadow-md h-screen p-7">
      <Image src="/logo.png" width={170} height={170} alt="logo"/>
      <div className="mt-10">
        <UploadSlideDialog>
          <Button className="w-full">+ Upload Lecture Slide</Button>
        </UploadSlideDialog>
        <div className="flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
            <LayoutDashboardIcon />
            <h2>Your Learning Hub</h2>
        </div>

        <div className="flex gap-2 items-center p-2 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer">
            <Shield />
            <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-20 w-[80%]">
        <Progress value={20} />
        <p className="text-sm mt-2">1 out of 5 slides uploaded ✨</p>
        <p className="text-xs text-gray-400 mt-1">Upgrade to make more notes</p>

      </div>
    </div>
  );
}

export default SideBar;