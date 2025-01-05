// ------------------------ Authentication Page ---------------------------
// This component renders the SignIn page using Clerk's SignIn component.

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
      <div className='flex items-center justify-center h-screen'>
        <SignIn />
      </div>
  )
}
