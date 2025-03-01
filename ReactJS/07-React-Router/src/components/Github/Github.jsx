import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function GitHub() {
    /*
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('https://api.github.com/users/ritankjaikar')
        .then(res1 => res1.json())
        .then(res2 => {
            console.log(res2);
            setData(res2);
        })
        .catch(err => console.log(err));
    }, [])
    */
    const data = useLoaderData();

    return (
        <div className="bg-gray-600 text-white  text-xl p-4 flex leading-[44px] md:text-3xl">
            <img src={data.avatar_url} className="w-[16%] h-[16%] mr-4" />
            <p className="w-[80%] break-words ">
                User: {data.name} <br />
                Id: {data.id} <br />
                Github followers: {data.followers} <br />
                Github followers: {data.followers} <br />
                Location: {data.location} <br />
                URL: {data.url}
            </p>
        </div>
    )
}

export const githubInfoLoader = async () => {
    const res = await fetch('https://api.github.com/users/ritankjaikar');
    return res.json();
}