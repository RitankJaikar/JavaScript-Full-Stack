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
                <div className="flex flex-wrap">
                    {
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}