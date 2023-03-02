import React, { useEffect, useState} from 'react'
import UploadSection from "./UploadSection"
import RubricSection from "./RubricSection"

export default function UploadP(){

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
      fetch("/api").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])


    return (
        <div className="UploadP">
            <h1>Create</h1>
            <UploadSection />
            <RubricSection />
        </div>
    )
}
