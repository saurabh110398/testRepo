import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import { Briefcase, DoorOpen, DoorClosed, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader, ScaleLoader } from 'react-spinners'
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {ApplyJobDrawer} from "@/components/apply-job";
import ApplicationCard from '@/components/application-card';

const JobPage = () => {

  const { isLoaded, user } = useUser();
  // console.log('user id::: ',user);
  
  let { id } = useParams();

  const { loading: loadingJob, data: job, fn: fnJob }
    = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fn: fnHiringStatus }
    = useFetch(updateHiringStatus, { job_id: id });

  useEffect(() => {
    if (isLoaded)
      fnJob();
  }, [isLoaded]);

  if (!isLoaded) {
    return <ScaleLoader className='text-center' width={'2%'} size={'40'} color='#8B0000' />
  }

  const handleStatusChange = (value) => {

    const isOpen = value === 'open';
    fnHiringStatus(value).then(() => fnJob())
  }


  return (
    <div className='flex flex-col'>
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center ">
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className='h-12' alt="" />
      </div>
      <div className='flex justify-between'>
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ?
            <><DoorOpen /> Open</> : <><DoorClosed /> Closed</>}
        </div>


      </div>
      {/*Hiring status*/}
      {loadingHiringStatus && <BarLoader className='text-center' width={'100%'} color='#8B0000' />}

      {
        job?.recruiter_id === user?.id && (
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-full ${job?.isOpen ? 'bg-green-950' : 'bg-red-950'}`}>
              <SelectValue placeholder={"Hiring Status " + (job?.isOpen ? 'Open' : 'Closed')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='open'>Open</SelectItem>
              <SelectItem value='close'>Close</SelectItem>
            </SelectContent>
          </Select>
        )
      }

      <h2 className="text-2xl sm:text-3xl font-bold">
        About the Job
      </h2>
      <p className='sm:text-lg'>{job?.description}</p>

      <h2 className='text-2xl sm:text3-xl font-bold'>
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg" // add global ul styles - tutorial
      />

      {/* render application */}
    
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id == user?.id && (
        <div>
          <h2 className='text-2xl sm:text3-xl font-bold'>Applications</h2>
          {job?.applications?.map(ele=>{
            return <ApplicationCard key={ele.id} application={ele}/>
          })}
        </div>
      )} 
      
    </div>
  )
}

export default JobPage
