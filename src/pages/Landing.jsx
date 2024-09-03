import logo from '../../public/logo.png';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import data from '../data/companies.json'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Autoplay from 'embla-carousel-autoplay'
import faq from '../data/faq.json'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const Landing = () => {

    return (
        <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            <section className="text-center">
                <h1 className="flex flex-col justify-center items-center gradient-title text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter py-4">
                    Find your Dream Job
                    <span className="flex items-center gap-2 sm:gap-6"> and get
                        <img className='h-14 sm:h-24 md:h-28 lg:h-32' src={logo} alt="Hirred Logo" />
                    </span>
                </h1>
                <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
                    Explore thousands of job listings or find the perfect candidate
                </p>
            </section>
            <div className='flex justify-center gap-6'>
                <Link to='/jobs'>
                    <Button size='xl' variant='blue'>Find Jobs</Button>
                </Link>
                <Link to='/post-job'>
                    <Button size='xl' variant='destructive'>Post Jobs</Button>
                </Link>
            </div>
            <Carousel
                plugins={[Autoplay({ delay: 1500, stopOnInteraction: true })]}
                className="w-full py-10"
            >
                <CarouselContent className='flex gap-5 items-center'>
                    {data.map((ele, index) => (
                        <CarouselItem key={ele.id} className="md:basis-1/3 lg:basis-1/6" >
                            <img
                                className='h-9 sm:h-24 object-contain'
                                src={ele.path} alt="" />

                        </CarouselItem>
                    ))}

                </CarouselContent>
                {/* <CarouselPrevious />
                    <CarouselNext /> */}
            </Carousel>
            <img className='w-full' src="/banner.jpeg" alt="" />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">For Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Search and apply for jobs, track applications, and more.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Post jobs, manage applications, and find the best candidates.
                    </CardContent>
                </Card>
            </section>

            <Accordion type="single" collapsible>
                {
                    faq.map((item, index) => {
                        return (
                            <AccordionItem value={`item${-index+1}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>



        </main >
    )
}

export default Landing;