// import service from "../appwrite/configuration";
import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const postData = useSelector(state => state.post.postData);
    
    useEffect(() => {
        if (slug) {
            // service.getPost(slug)
            //     .then((post) => {
            //         if (post) {
            //             setPost(post);
            //         }
            //     })
            const currPost = postData.find(post => post.$id === slug);
            if(currPost) {
                setPost(currPost);
            }
        }
        else {
            navigate('/');
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}