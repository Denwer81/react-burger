import { useEffect, useState } from 'react';
import { getBurgersDB } from '../utils/api';

function useGetBurgersDB() {
  const [burgersDB, setDBurgersDB] = useState([])

  useEffect(() => {
    getBurgersDB()
    .then(res => {
      setDBurgersDB(res.data)
    })
    .catch(error => {
      console.log(error.message)
    });
  }, [])

  return burgersDB
}

export default useGetBurgersDB;
