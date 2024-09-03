import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { saveJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { deleteJob } from '@/api/apiJobs';
import { BarLoader } from 'react-spinners';

const JobCard = ({ key,
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { }
}) => {

    const [saved, setSaved] = useState(savedInit);


    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob,
    } = useFetch(saveJobs, { alreadySaved: saved });




    let { user } = useUser();
    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
        job_id: job.id,
    });


    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id
        });
        onJobSaved();
        console.log('savedJob:: ', savedJob);
    }

    const handleDeleteJob = async () => {
        await fnDeleteJob();
        onJobSaved();
    };


    useEffect(() => {
        if (savedJob !== undefined) {
            setSaved(savedJob?.length > 0);
        }
    }, [saved])


    return (

        <div className='gap-2'>

            <Card className="flex flex-col">
                {loadingDeleteJob && (
                    <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
                )}
                <CardHeader>
                    <CardTitle className=" flex justify-between font-bold">
                        {job.title}
                        {isMyJob &&
                            <Trash2Icon
                                fill='red'
                                size={18}
                                className='text-red-300 cursor-pointer'
                                onClick={handleDeleteJob}
                            />
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4 flex-1 min-h-48'>
                    <div className='flex justify-between'>
                        {job.company && <img className='h-6' src={job.company.logo_url} />}
                        <div className='flex justify-between items-center gap-2'>
                            <MapPinIcon size={15} /> {job.location}
                        </div>
                    </div>
                    <hr />
                    {job.description.substring(0, job.description.indexOf('.') + 1)}
                </CardContent>
                <CardFooter className='flex gap-2'>
                    <Link to={`/job/${job.id}`} className='flex-1'>
                        <Button variant='secondary' className='w-full'>More Details</Button>
                    </Link>

                    {!isMyJob &&
                        <Button
                            variant='outline'
                            className='w-15'
                            onClick={handleSaveJob}
                            disabled={loadingSavedJob}
                        >
                            {
                                saved ?
                                    <Heart size={20} stroke='red' fill='red' />
                                    :
                                    <Heart size={20} />
                            }
                            {/* <Heart size={20} stroke='red' fill='red' /> */}
                        </Button>
                    }

                </CardFooter>
            </Card>



        </div>
    )
}

export default JobCard;
