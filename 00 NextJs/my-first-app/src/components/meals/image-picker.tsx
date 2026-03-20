'use client';

import classes from './image-picker.module.css';
import { useRef } from 'react';

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerProps) {

    const imageInput = useRef<HTMLInputElement>(null);

    function handlePickClick() {
        imageInput.current?.click();
    }

    return <div className={classes.picker}> 
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <input 
               className={classes.input}
                type="file" 
                id={name} 
                accept="image/png, image/jpeg"
                name={name}
                ref={imageInput}
            />
            <button 
                onClick={handlePickClick} 
                className={classes.button} 
                type="button"
            >
                Pick an Image
            </button>
        </div>
    </div>
}