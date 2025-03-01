import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.projectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }
        catch (err) {
            console.log("Appwrite service :: createPost :: error :: ", err);
            throw err;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        }
        catch (err) {
            console.log("Appwrite service :: updatePost :: error :: ", err);
            throw err;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            );
            return true;
        }
        catch (err) {
            console.log("Appwrite service :: deletePost :: error :: ", err);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug
            );
        }
        catch (err) {
            console.log("Appwrite service :: getPost :: error :: ", err);
            //return false;
            throw err;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            );
        }
        catch (err) {
            console.log("Appwrite service :: getPosts :: error :: ", err);
            //return false;
            throw err;
        }
    }

    //file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
        }
        catch (err) {
            console.log("Appwrite service :: uploadFile :: error :: ", err);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
            return true;
        }
        catch (err) {
            console.log("Appwrite service :: deleteFile :: error :: ", err);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.bucketId,
                fileId
            )
        }
        catch (err) {
            console.log("Appwrite service :: getFilePreview :: error :: ", err);
            return false;
        }
    }
};

const service = new Service();

export default service;