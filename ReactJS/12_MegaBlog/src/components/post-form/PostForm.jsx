import { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService  from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { managePosts } from "../../store/postSlice";

export default function PostForm({ post }) {
    const [submitError, setSubmitError] = useState(null);
    const { register, handleSubmit, watch, setValue, control, getValues, formState: {errors, isSubmitting} } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const submit = async (data) => {
        try {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (post) {
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                let dbPost;
                if(post.$id === data.slug) {
                    // Update existing post if slug matches
                    // console.log("Update existing post if slug matches", post);
                    // console.log(data);
                    dbPost = await appwriteService.updatePost(post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : undefined,
                    });
                }
                else {
                    // Slug has changed, delete old post and create a new post
                    // console.log("Slug has changed, delete old post and create a new post", post);
                    // console.log(data);
                    const postFeaturedImage = post.featuredImage;
                    const deleteStatus = await appwriteService.deletePost(post.$id);
                    if(deleteStatus) {
                        dbPost = await appwriteService.createPost({
                            ...data,
                            featuredImage: file ? file.$id : postFeaturedImage,
                            userId: userData.$id 
                        });
                    }
                }

                const res = await appwriteService.getPost([]);
                if(res) {
                    dispatch(managePosts(res.documents));
                }

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // No existing post, create a new post
                // console.log("No existing post, create a new post");
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    const res = await appwriteService.getPost([]);
                    if(res) {
                        dispatch(managePosts(res.documents));
                    }

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        }
        catch(err) {
            if(err.message.includes("requested ID already exists")){
                setSubmitError("slug alread exist, please try different slug");
            }
            else {
                setSubmitError(`Error during post submission: ${err.message}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, getValues, post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: "title is required" })}
                />
                {errors.title && <p className='text-red-600 text-center mt-[-16px]'>{errors.title.message}</p>}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: "slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className='text-red-600 text-center mt-[-16px]'>{errors.slug.message}</p>}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: {value: !post, message: "image is required"} })}
                />
                {errors.image && <p className='text-red-600 text-center mt-[-16px] mb-4'>{errors.image.message}</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "status is required" })}
                />
                {errors.status && <p className='text-red-600 text-center mt-[-16px]'>{errors.status.message}</p>}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={isSubmitting}>
                    {post ? isSubmitting ? "Updating" : "Update" : isSubmitting ? "Submitting" : "Submit"}
                </Button>
                {submitError && <p className='text-red-600 text-center'>{submitError}</p>}
            </div>
        </form>
    );
}