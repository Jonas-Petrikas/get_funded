import { useState } from 'react';


export default function useImage() {

    const [image, setImage] = useState();

    const imageReader = img => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = _ => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const readFile = (e) => {
        const img = e.target.files[0];
        console.log(img);
        imageReader(img)
            .then(res => setImage({ ...img, src: res }))
            .catch(_ => setImage(({ ...img, src: null })))
    }



    return { image, readFile }

}