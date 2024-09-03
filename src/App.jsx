
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import { Children } from 'react'
import Onboarding from './pages/Onboarding'
import SavedJobs from './pages/SavedJobs'
import JobListing from './pages/JobListing'
import MyJobs from './pages/MyJobs'
import PostJob from './pages/PostJob'
import JobPage from './pages/JobPage'
import { ThemeProvider } from "@/components/theme-provider";
import ProtectedRoutes from './components/Protected-Routes'

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Landing />,
        },
        {
          path: '/onboarding',
          element: (
            <ProtectedRoutes>
              <Onboarding />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/jobs',
          element:
          (
            <ProtectedRoutes>
             <JobListing />
            </ProtectedRoutes>
          ) ,
        },
        {
          path: '/job/:id',
          element: (
            <ProtectedRoutes>
              <JobPage />
            </ProtectedRoutes>
          ),
        
        },
        {
          path: '/saved-job',
          element:(
            <ProtectedRoutes>
              <SavedJobs />
            </ProtectedRoutes>
          ) ,
        },
        {
          path: '/post-job',
          element:(
            <ProtectedRoutes>
             <PostJob />
            </ProtectedRoutes>
          ) ,
        },
        {
          path: '/my-job',
          element:(
            <ProtectedRoutes>
             <MyJobs />
            </ProtectedRoutes>
          ),
        },


      ]
    }
  ])


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>



    </>
  )
}

export default App
