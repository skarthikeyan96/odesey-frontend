import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/router";

// userAction.js
export const registerUser: any = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (data: any, { rejectWithValue }) => {
    const { email, password, userName } = data;

    
    console.log(`${process.env.NEXT_PUBLIC_URL_PREFIX}`);
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL_PREFIX}/user/create`,
        { email, password, username: userName },
        config
      );


    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const userLogin:any = createAsyncThunk(
    'user/login',
    async (values:any, { rejectWithValue }) => {
      try {
        const {email, password} = values
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // Proxy that will talk to FastAPI server
        const { data } = await axios.post(
          '/api/login',
          { email, password },
          config
        )
        
    // get the user details if everything goes well
        console.log(data)

        const response = await axios.get('/api/user')
        console.log(response)
        // store user's token in local storage
        return data


      } catch (error:any) {
        // return custom error message from API if any
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )