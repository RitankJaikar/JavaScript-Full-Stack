// import { useState, useEffect } from "react";
// import service from "../appwrite/configuration";
// import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
    // const [posts, setPosts] = useState([]);
    // const status = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    let posts = useSelector((state) => state.post.postData);
    posts = posts.filter((post) => post.status === "active");
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(status) {
    //         service.getPosts()
    //             .then((res) => {
    //                 if (res) {
    //                     // console.log(res);
    //                     setPosts(res.documents)
    //                 }
    //                 else {
    //                     setPosts([])
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log("Failed to fetch posts :: ", err.message);
    //                 setPosts([]);
    //             })
    //     }
    // }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1
                                className="text-2xl font-bold hover:text-gray-500 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            {userData?.name && (
                <h1 className="text-center text-3xl font-semibold text-white mb-8">
                    Welcome, {userData.name}
                </h1>
            )}
            <Container>
                <div className="flex flex-wrap -mx-4">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
