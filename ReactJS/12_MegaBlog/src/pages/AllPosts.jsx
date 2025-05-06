// import { useState, useEffect } from "react";
// import service from "../appwrite/configuration";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

export default function AllPosts() {
    // const [posts, setPosts] = useState([])
    // useEffect(() => {
    //     service.getPosts([])
    //         .then((posts) => {
    //             if(posts) {
    //                 setPosts(posts.documents);
    //             }
    //         });
    // }, [])

    const posts = useSelector((state) => state.post.postData);

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-3xl font-semibold text-white mb-8 text-center">
                    All Posts
                </h1>
                <div className="flex flex-wrap -mx-4">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-6">
                            <PostCard {...post} imgHeight="200px" />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}