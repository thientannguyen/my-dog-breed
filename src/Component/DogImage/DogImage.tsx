import { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import './DogImage.css';

export interface IDogImage {
    id: string;
    loadAction: (id: string) => Promise<string>;
}

const DogImage = (props: IDogImage) => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            setIsLoading(true);
            if (props.id) {
                const result = await props.loadAction(props.id);
                if (result) setUrl(result);
            }
            setIsLoading(false);
        };
        loadImage();
    }, [props]);

    return (
        <div>
            {isLoading ? (
                <div className="loading">
                    <div> Loading... </div>
                    <CircularProgress
                        size={'2.5em'}
                        thickness={2}
                    ></CircularProgress>
                </div>
            ) : url ? (
                <img src={url} className="imageContainer" alt="img"></img>
            ) : (
                <div>There is no image</div>
            )}
        </div>
    );
};

export default DogImage;
