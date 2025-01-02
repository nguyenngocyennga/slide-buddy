"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoaderPinwheel } from 'lucide-react';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { ingest } from '@/convex/myAction';
  

function UploadSlideDialog({children}) {

    const generateUploadUrl = useMutation(api.slideStorage.generateUploadUrl);
    const addSlideEntry = useMutation(api.slideStorage.addSlideEntryToDatabase);
    const getSlideUrl = useMutation(api.slideStorage.getSlideUrl);
    const embeddSlide = useAction(api.myAction.ingest);

    const { user } = useUser();
    const [slide, setSlide] = useState();
    const [loading, setLoading] = useState(false);
    const [slideName, setSlideName] = useState();
    const [open, setOpen] = useState(false);

    const onSlideSelect = (event) => {
        setSlide(event.target.files[0]);
    }

    const onUpload = async () => {
        setLoading(true);

        // Step 1: Get a short-lived upload URL
        const tempPostUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(tempPostUrl, {
        method: "POST",
        headers: { "Content-Type": slide?.type },
        body: slide,
        });
        const { storageId } = await result.json();

        console.log('storageId', storageId);

        const slideId = uuid4();
        const slideUrl = await getSlideUrl({ storageId });

        // Step 3: Save the newly allocated storage id to the database
        const uploadResult = await addSlideEntry({
            slideId: slideId,
            storageId: storageId,
            slideName: slideName || 'Untitled Slide 🎢',
            slideUrl: slideUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        // await sendImage({ storageId, author: name });
        console.log('uploadResult: ', uploadResult);

        // API call to fetch slide data
        const apiResult = await axios.get('/api/slide-loader?pdfUrl='+slideUrl);
        console.log('apiResult: ', apiResult.data.result);

        await embeddSlide({
            splitText: apiResult.data.result,
            slideId: slideId,
        });

        // console.log('embeddResult: ', embeddResult);
        setLoading(false);
        setOpen(false);

    }

    return (
    <Dialog open={open}>
    <DialogTrigger asChild>
    {/* {children} */}
    <Button onClick={()=>setOpen(true)} className="w-full">
        + Upload Lecture Slide
    </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Slide Into Knowledge! 🎢</DialogTitle>
            <DialogDescription asChild>
                <div>
                    <p className='p-1'>🧙 Abracadabra! Drop your slides here, and let us weave some magic! ✨</p>
                    <div className='flex gap-2 p-2 rounded-md'>
                        <input 
                            className='' 
                            type="file" 
                            accept='application/pdf'
                            onChange={(event)=>onSlideSelect(event)} />
                    </div>
                    <div className='p-2'>
                        <Input placeholder='Give this slide a name to shine! ✨' onChange={(e)=>setSlideName(e.target.value)} />
                    </div>
                </div>
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload}>
            {loading ? 
            <LoaderPinwheel className='animate-spin' /> : 
            "Upload 🚀"
            }
            
          </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>

    );
}

export default UploadSlideDialog;