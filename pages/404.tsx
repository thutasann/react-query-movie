import type { NextPage } from 'next';
import Link from 'next/link';

const Error: NextPage = () => (
    <div className='mt-[40px] flex flex-col items-center justify-center'>
        <h1 className='font-[700] text-[30px] mb-4 text-gray-500'>
            Page Not Found
        </h1>
        <Link href="/" className='bg-blue-400 text-white p-3 p rounded-md hover:bg-blue-500'>
            Go Back to Home
        </Link>
    </div>
)

export default Error;