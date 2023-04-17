import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
const FormularioUpdate = () => {
    const [posts, setsPosts] = useState([])

  const getPosts =  async()=>{
    try {
        const {id} = useParams();
      const response = await blogFetch.get(`/funcionario/${id}`);
      const data = response.data;
      setsPosts(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPosts();
  }, [])

  return (
    <div>FormularioUpdate</div>
  )
}

export default FormularioUpdate