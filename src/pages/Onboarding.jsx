import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ScaleLoader } from 'react-spinners'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {

  const { user, isLoaded } = useUser();
  console.log(isLoaded, 'user: onboarding: ', user);
  if (!isLoaded) {
    return <ScaleLoader className='text-center' width={'2%'} size={'40'} color='#8B0000' />
  }
  let navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await
      user.update({
        unsafeMetadata: { role },
      })
        .then(() => {
          navigate(role === 'recruiter' ? '/post-job' : '/jobs')
        })
        .catch(err => {
          console.log('Error in updating the role:: ', err);
        })
  }

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user?.unsafeMetadata?.role === 'recruiter' ? '/post-job' : '/jobs')
    }
  }, [user])
  useEffect(()=>{},[])

  return (
    <div className='flex flex-col justify-center items-center mt-32'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>
        I am a..
      </h2>
      <div className='grid grid-cols-2 mt-16 gap-4 w-full md:px-40'>
        <Button variant='blue' className='h-36 text-2xl' onClick={() => { handleRoleSelection('candidate') }}>Candidate</Button>
        <Button variant='destructive' className='h-36 text-2xl' onClick={() => { handleRoleSelection('recruiter') }}>Recruiter</Button>

      </div>

    </div>
  )
}

export default Onboarding
