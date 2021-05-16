import { useState, useEffect } from 'react';
import DogService from '../../Utils/DogService';
import './DogImage.css';

export interface IDogImage {
    id: string;
}

const DogImage = (props: IDogImage) => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            setIsLoading(true);
            if (props.id) {
                const result = await DogService.getImage(props.id);
                if (result) setUrl(result);
            }
            setIsLoading(false);
        };
        loadImage();
    }, [props.id]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : url ? (
                <img src={url} className="imageContainer" alt="img"></img>
            ) : (
                <div>There is no image</div>
            )}
        </div>
    );
};

export default DogImage;
