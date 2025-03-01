import service from "../appwrite/configuration.js"
import { Link } from 'react-router-dom'

export default function PostCard({
    $id,
    title,
    featuredImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl h-[16vw] w-full object-cover' />
                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}