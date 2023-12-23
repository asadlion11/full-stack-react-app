import React, { useEffect, useState } from 'react'
import { Button, Input, Label, PostForm, Preview } from './Style'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER_POST, UPDATE_POST } from '../graphql/mutations';
import { GET_POST } from '../graphql/queries';
import { useParams } from 'react-router-dom';


const NewPost = ()=> {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [localLoading, setLocalLoading] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        console.log("Uploaded")
    }, [uploaded])

    const [registerPost] = useMutation(REGISTER_POST)
    const [updatePost] = useMutation(UPDATE_POST)

    const {data: postData, 
        loading: postLoading, 
        error: postError
    } = useQuery(GET_POST, {
        variables: {id: id}
    })
    useEffect(()=> {
        if(id && postData) {
            const {id, title, body, thumbnail, date} = postData.posts[0]
            setTitle(title)
            setBody(body)
            setThumbnail(thumbnail)
            setImagePreview(thumbnail)
        }
    }, [postData])
      

    const handleUploadImage = async () => {
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('upload_preset', 'graphql-preset')
        try {
            setLocalLoading(true)
            const {data} = await axios.post('https://api.cloudinary.com/v1_1/dcpmqqqod/image/upload', formData)
            setUploaded(true)
            setThumbnail(data.secure_url)
            setLocalLoading(false)
        } catch (err) {
            console.log(err)
        }
    } 

    const handleTitle = (e)=> {
        setTitle(e.target.value)
    }

    const handleImageSelected = (e)=> {
        setUploaded(false)
        const file = e.target.files[0]
        setSelectedFile(file)
        setImagePreview(window.URL.createObjectURL(file))
    }

    const handleQillChange = (e) => {
        setBody(e)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!title || !body || !thumbnail) {
            alert('Please fill empty fields')
        } 
        try {
            if(id) {
                const {data, loading, err} = updatePost({
                    variables:{
                        id:id,
                        title,
                        body,
                        thumbnail
                    }    
            })
    
            } else {
                const {data, loading, err} = registerPost({
                    variables:{
                        title,
                        body,
                        thumbnail
                    }    
            })
            }
            
            // if(err) alert('Something wrong please try again')
            // if(loading) setLocalLoading(true)
            setTitle("")
            setBody("")
            setSelectedFile("")
            setThumbnail("")
            setTitle("")
            setImagePreview("")
            setSelectedFile("")
            if(title && body && thumbnail) {
                alert('Success')
            }
        }catch(err) {
            alert(err)
            console.log(err)
        }
    }

    return(
        <div>
            <PostForm onSubmit={handleSubmit}>
                <Label>Post Title</Label>
                <Input placeholder='Thumbnail' id='title' name='title' type='text' value = {title}
                onChange={handleTitle}/>
                <Label>Post Body</Label>
                <ReactQuill theme = 'snow' modules={NewPost.modules} formats={NewPost.formats} 
                value = {body} onChange={handleQillChange}/>
                {imagePreview && <Preview src ={imagePreview} />}
                <Input type='file' id='fname' name='fname'
                onChange = {handleImageSelected}/>
                <Button type='button' disabled = {localLoading} onClick={handleUploadImage}> {localLoading ? 'Uploading....' : 'Upload'}</Button>
                <Button type = 'submit' disabled = {localLoading}>{localLoading ? 'Loading...' : id ? 'Update' : 'Register'}</Button>
            </PostForm>
        </div>
    )
}

NewPost.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
		["code-block"],
	],
};

NewPost.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"video",
	"code-block",
];
export default NewPost