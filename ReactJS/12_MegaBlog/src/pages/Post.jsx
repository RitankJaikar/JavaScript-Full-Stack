import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { managePosts } from "../store/postSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    let posts = useSelector(state => state.post.postData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);

                posts = posts.filter(post1 => post1.$id !== post.$id);
                dispatch(managePosts(posts));

                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 min-h-screen text-gray-100">
            <Container>
                {/* Featured Image Section */}
                <div className="w-full flex justify-center mb-6 relative rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full max-h-[68vh] object-cover border border-gray-600"
                    />

                    {/* Edit/Delete Buttons */}
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-3">
                    {post.title}
                </h1>

                {/* Author Name */}
                <p className="text-center text-gray-400 mb-6 pb-6 border-b border-gray-600">
                    By <span className="font-semibold text-white">{post.authorName ? post.authorName : "Unknown Author"}</span>
                </p>

                {/* Content */}
                <div className="prose prose-invert max-w-4xl mx-auto text-gray-200">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}