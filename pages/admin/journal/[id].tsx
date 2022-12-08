import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../../components/Navbar";
import { Sanitized } from "../dashboard";
export { default as getServerSideProps } from "../../../lib/ServerProps";

const viewJournal = (props: { isAuthenticated: any; jwt: any }) => {
  const router = useRouter();
  const { id } = router.query;

  const [journal, setJournal] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  const fetchSingleJournal = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PREFIX}/journal/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${props.jwt}`,
          },
        }
      );

      const data = await response.json();
      setJournal(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      await fetchSingleJournal();
    })();
  }, []);

  const renderJournal = () =>{
    return(

        <div className="max-w-lg p-4 mx-auto pt-6 "> 
        <Link href="/admin/dashboard" className="text-gray-500 text-md mb-4 flex space-x-4 items-center text-underline">
            <span> Back to dashboard </span></Link>

         <article className="prose  pt-4">
         <h2> {journal.title} </h2>
         <Sanitized html={journal.description}/>
       </article>
        </div>
      
        
     
    )
  }

  return (
    <>
      <Navbar isAuthenticated={props.isAuthenticated} />
      {
        loading && 
        
        <div className="loading">
        <div className="loader"></div>
    </div>
        }

        {
            !loading && journal && renderJournal()
        }
    </>
  );
};

export default viewJournal;
