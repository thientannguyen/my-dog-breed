import { DogBreed } from './../Model/DogBreed';
import axios from 'axios';

export default class DogService {
    private static apiKey = '9ca68f1f-27ef-43a1-b313-33d456f4deb2';
    public static async getDogBreed(name: string): Promise<DogBreed[]> {
        let res = await axios.get(
            `https://api.thedogapi.com/v1/breeds/search?q=${name}`,
            {
                headers: {
                    'x-api-key': this.apiKey,
                },
            }
        );

        if (res.status === 200) {
            if (res.data) {
                return res.data;
            } else {
                return [];
            }
        }
        return Promise.reject(
            'Error occurred when get Dog Breed: ' + res.statusText
        );
    }

    public static async getImage(imageId: string): Promise<string> {
        let res = await axios.get(
            `https://api.thedogapi.com/v1/images/${imageId}`,
            {
                headers: {
                    'x-api-key': this.apiKey,
                },
            }
        );

        if (res.status === 200) {
            if (res.data) {
                return res.data.url;
            } else {
                return '';
            }
        }
        return Promise.reject(
            'Error occurred when get image: ' + res.statusText
        );
    }
}
