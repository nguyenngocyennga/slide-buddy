// ------------------------ Upload Slide Dialog Component ----------------------------------
// This component provides a dialog for uploading lecture slides.
// It allows users to upload PDF files, name the slide, and process it for text extraction and embedding.
// Features:
// - File upload with validation for PDF format.
// - Integration with Convex for generating upload URLs and saving slide metadata.
// - Text extraction and embedding for AI-powered processing.
// - Toast notifications for user feedback.

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
import { toast } from 'sonner';
  
/**
 * UploadSlideDialog Component
 * Handles the upload of lecture slides and integrates multiple functionalities:
 * - Generates a short-lived upload URL via Convex.
 * - Uploads the slide and saves its metadata to the database.
 * - Extracts text content from the slide and embeds it for AI processing.
 * - Displays a toast notification upon successful upload. 
 */
function UploadSlideDialog({children}) {
    // Convex API hooks for mutations and actions
    const generateUploadUrl = useMutation(api.slideStorage.generateUploadUrl);
    const addSlideEntry = useMutation(api.slideStorage.addSlideEntryToDatabase);
    const getSlideUrl = useMutation(api.slideStorage.getSlideUrl);
    const embeddSlide = useAction(api.myAction.ingest);

    // User data from Clerk
    const { user } = useUser();

    // Local state for managing slide data and UI behavior
    const [slide, setSlide] = useState();
    const [loading, setLoading] = useState(false);
    const [slideName, setSlideName] = useState();
    const [open, setOpen] = useState(false);

    // Handles file selection for slide upload
    const onSlideSelect = (event) => {
        setSlide(event.target.files[0]);
    }

    // Handles the upload of the selected slide
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

        // console.log('storageId', storageId);

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
        // console.log('uploadResult: ', uploadResult);

        // Step 4: Extract text content from the slide
        const apiResult = await axios.get('/api/slide-loader?pdfUrl='+slideUrl);
        // console.log('apiResult: ', apiResult.data.result);

        // Step 5: Embed the extracted text for AI processing
        await embeddSlide({
            splitText: apiResult.data.result,
            slideId: slideId,
            slideName, 
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });

        // Finalize the process
        // console.log('embeddResult: ', embeddResult);
        setLoading(false);
        setOpen(false);
        toast.success('Slide uploaded successfully! 🎢');

    }

    return (
    <Dialog open={open}>
    <DialogTrigger asChild>
    {/* {children} */}
    <Button onClick={()=>setOpen(true)} className="w-full p-3">
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