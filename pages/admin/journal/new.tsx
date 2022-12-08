import dynamic from "next/dynamic";
import { SetStateAction, useState } from "react";
import Navbar from "../../../components/Navbar";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export { default as getServerSideProps } from "../../../lib/ServerProps";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const NewJournal = (props: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const router = useRouter();
  
  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    const requestObj = {
      title: title,
      description: content,
    };

    if(title.length === 0 || content.length  === 0){
      toast("Please add valid journal title or description")
      return;
    }

    try {

      const response = await  fetch("/api/journal", {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {
          "Content-Type": "application/json",
        },
      })
     
      
      if(response.status === 201){
        
        toast('Created post successfully, redirecting')

        router.push('/admin/dashboard')
      }
      
      
    } catch (error:any) {

      toast(error)
      
    }

   
    
  }

  function handleTitleChange(event: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) {
    event.preventDefault();
    setTitle(event.target.value);
  }

  return (
    <>
      <Navbar isAuthenticated={props.isAuthenticated} />
      <div className="p-4 max-w-4xl mx-auto">
        <form onSubmit={submitHandler}>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Enter a title"
            onChange={handleTitleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          <label
            htmlFor="description"
            className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <ReactQuill
            // modules={modules}
            onChange={setContent}
            theme="snow"
          />
          <button className="bg-slate-800  text-white tracking-normal text-md font-sans  py-2 px-4 rounded mt-8 w-full">
            Save
          </button>
          {/* <p>{content}</p> */}
        </form>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </>
  );
};

export default NewJournal;
