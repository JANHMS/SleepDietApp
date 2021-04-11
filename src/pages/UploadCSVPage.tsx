import { IonCard, IonContent, IonPage } from '@ionic/react'
import React, { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'

const MyDropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <IonPage>
      <IonContent>
        <IonCard>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </IonCard>

      </IonContent>
    </IonPage>
  )
}

export default MyDropzone;