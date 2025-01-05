// ------------------------ Dashboard Component ----------------------------------------
// This component serves as the main dashboard for the user's learning hub.
// It displays a list of uploaded slides and provides links to access individual slide details.
// Includes a loading skeleton while the data is being fetched.

"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Dashboard Component
 * Displays the user's uploaded slides in a grid layout.
 * - Fetches slides using Convex's `getUserSlides` query.
 * - Shows each slide as a card with a link to its specific learning hub.
 * - Displays a loading skeleton when the slide list is being fetched or is empty.
 */
function Dashboard () {
  // Fetch the logged-in user's data
  const { user } = useUser();

  // Query to fetch slides created by the current user
  const slideList = useQuery(api.slideStorage.getUserSlides, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  })

  // console.log('slideList', slideList);

  return (
    <div>
      <h2 className="font-medium text-xl">Your Learning Hub 📚</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {slideList?.length > 0 ? slideList?.map((slide) => (
          <Link key={slide.slideId} href={'/learning-hub/'+slide.slideId}>
            <div className="cursor-pointer hover:scale-105 transition-all flex p-5 shadow-md rounded-md flex-col items-center justify-center border">
              <Image src="/pdf-file.png" alt={slide.slideName} width={70} height={70} />
              <h3 className="mt-3 font-medium">{slide?.slideName}</h3>
              {/* <h3></h3> */}
            </div>
          </Link>
        )) : [1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-sl-200 rounded-md h-[150px] animate-pulse">

          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;