import service from "../appwrite/configuration.js";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage, imgHeight="280px" }) {
    console.log(imgHeight); // "1000px"
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-full mb-4">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className={`rounded-xl w-full object-cover`}
                        style={{ height: imgHeight }}
                    />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
            </div>
        </Link>
    );
}
