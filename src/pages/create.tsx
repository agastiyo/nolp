import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import HeroSection from 'components/hero-section'

type CreateInputs = {
  name: string
  about: string
  location: string
  // upload files?
}

export default function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateInputs>()
  const onSubmit: SubmitHandler<CreateInputs> = (data) => console.log(data)

  const router = useRouter()
  const [session, loading] = useSession()

  // if (!loading && !session) {
  //   router.push('/')
  //   return null
  // }

  return (
    <>
      <HeroSection title="Create a new business" subtitle="Get started with Nolp today." />
      <section className="relative flex flex-col items-center justify-center px-2">
        <div className="w-full px-4 py-8 pt-5 mx-3 sm:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="name">Name</label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true })}
                  className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="about">About</label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea id="about" {...register('name', { required: true })} className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="block text-sm font-medium leading-5 text-gray-700">Location</label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  id="location"
                  {...register('name', { required: true })}
                  className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-3"><span className="block w-full rounded-md shadow-sm"><button type="submit" className="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 cursor-default focus:outline-none focus:border-gray-700 focus:shadow-outline-indigo active:bg-gray-700 transition duration-150 ease-in-out">Create</button></span></div>
          </form>
        </div>
      </section>
    </>
  )
}
