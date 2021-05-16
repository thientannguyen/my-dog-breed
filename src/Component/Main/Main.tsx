import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { DogBreed } from '../../Model/DogBreed';
import DogService from '../../Utils/DogService';
import useDebounce from '../../Utils/UseDebounce';
import DogBreeds from '../DogBreeds/DogBreeds';
import './Main.css';

const Main = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [dogBreeds, setDogBreeds] = useState<DogBreed[] | undefined>();
    const [errorText, setErrorText] = useState('');
    const debouncedSearchText = useDebounce(searchText, 1000);
    const getDogBreed = useRef(() => {});

    getDogBreed.current = async () => {
        setErrorText('');
        setIsSearching(true);
        try {
            const result: DogBreed[] = await DogService.getDogBreed(searchText);
            console.log(result);
            setDogBreeds(result);
        } catch (err) {
            setErrorText(err);
        }
        setIsSearching(false);
    };

    useEffect(() => {
        if (debouncedSearchText) {
            getDogBreed.current();
        }
    }, [debouncedSearchText]);

    return (
        <div className="main-container">
            <h3>Input dog breed</h3>
            <input
                className="textBox"
                type="text"
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            {isSearching ? (
                <div>
                    <div style={{ marginBottom: '5vh' }}>
                        Searching dog breeds in progress ...
                    </div>
                    <CircularProgress
                        size={'2.5em'}
                        thickness={2}
                    ></CircularProgress>
                </div>
            ) : (
                dogBreeds !== undefined &&
                (dogBreeds.length > 0 ? (
                    <DogBreeds items={dogBreeds} />
                ) : (
                    <h3>CANNOT FOUND DOG BREED!</h3>
                ))
            )}

            <div className="error">{errorText}</div>
        </div>
    );
};

export default Main;
