import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleCreateJournal = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // get the jwt
  const jwt = request.cookies?.jwt;

  // get the payload

  const { title, description } = request.body;

  try {
    const payload = JSON.stringify({
      title,
      description,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/journal/`, {
      body: payload,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const journalInfo: any = await res.json();
    response.status(201).send({
      createdAt: journalInfo.created_at,
      description: journalInfo.description,
      journal_id: journalInfo.journal_id,
      owner: {
        user_id: journalInfo.owner.user_id,
        username: journalInfo.owner.username,
      },
      title: journalInfo.title,
      updated_at: journalInfo.update_at,
    });
  } catch (e: any) {
    response.status(400).send(e);
  }
};

const handleViewJournal = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // get the jwt
  const jwt = request.cookies?.jwt;

  // get the payload

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/journal/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const journalInfo: any = await res.json();
    response.status(200).send(journalInfo);
  } catch (e: any) {
    response.status(400).send(e);
  }
};



const handler = async (request: NextApiRequest, res: NextApiResponse) => {

  if(request.method === "POST"){
     handleCreateJournal(request, res);
  } 
  else if(request.method === "GET"){
     handleViewJournal(request, res);
  }
   

  
};

export default handler;
