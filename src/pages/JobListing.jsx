import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { BarLoader, ScaleLoader } from 'react-spinners'
import JobCard from '@/components/job-card';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city';

const JobListing = () => {

  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  }
    = useFetch(getJobs, { location, company_id, searchQuery });



  const {
    fn: fnCompanies,
    data: companies
  }
    = useFetch(getCompanies);



  useEffect(() => {
    if (isLoaded)
      fnCompanies();

    console.log('companies:: ', companies);

  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded)
      fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);



  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };
  const handleClearFilters = () => {
    setCompany_id('');
    setLocation('');
    setSearchQuery('')
  };

  if (!isLoaded) {
    return <ScaleLoader className='text-center' width={'2%'} size={'40'} color='#8B0000' />
  }



  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-8xl text-center pb-8'>Latest Jobs</h1>
      {/* add filter here */}

      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="sm:w-80 w-full">
            <SelectValue placeholder="Filter by Location " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {
                State.getStatesOfCountry('IN').map(ele => {
                  return <SelectItem key={ele.name} value={ele.name}>{ele.name}</SelectItem>
                })
              }


            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="sm:w-80 w-full">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                companies?.map(ele => {

                  return <SelectItem key={ele.name} value={ele.id}>{ele.name}</SelectItem>
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={handleClearFilters} className="h-full w-full sm:w-80" variant="destructive">
          Clear Filters
        </Button>

      </div>



      {loadingJobs &&
        <BarLoader width={'100%'} color='#8B0000' />
      }
      {loadingJobs == false &&
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length > 0
            ?
            jobs.map(ele => {
              return <JobCard
                key={ele.id}
                savedInit={ele?.saved?.length > 0}
                job={ele}
              />
            })
            :
            'No Jobs Found '}
        </div>
      }

    </div>
  )
}

export default JobListing
