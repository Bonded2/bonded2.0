import React, { useState } from 'react'
import { signoutII } from '../../../services/ii'


const Setting = () => {

   const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {

        setIsSigningOut(true)

        try {

            const signout = await signoutII()

            if (signout) {
              window.location.reload()
            }

        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
            setTimeout(() => 
                setIsSigningOut(false), 800
            )
        }

    }

  return (
    <>
    
    <div>Setting</div>

    <button onClick={handleSignOut} disabled={isSigningOut}>{isSigningOut ? ('Signing Out') : ('Sign Out')}</button>
    
    </>
    
  )
}

export default Setting