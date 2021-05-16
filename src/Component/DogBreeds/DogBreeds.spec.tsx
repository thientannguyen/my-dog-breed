import { render } from '@testing-library/react';
import DogBreeds from './DogBreeds';

describe('DogBreeds component', () => {
    it('renders DogBreeds properly', () => {
        const dummyDogBreeds = [
            {
                id: '1',
                name: 'dog',
                height: { metric: '12 - 15' },
                life_span: '15 - 18',
                reference_image_id: '123',
                temperament: 'dog',
                weight: { metric: '12 - 15' },
            },
        ];

        const { getByText } = render(<DogBreeds items={dummyDogBreeds} />);
        setTimeout(() => {
            expect(getByText(dummyDogBreeds[0].name)).toBeInTheDocument();
        }, 1000);
        setTimeout(() => {
            expect(getByText(dummyDogBreeds[0].life_span)).toBeInTheDocument();
        }, 1000);
        setTimeout(() => {
            expect(getByText('12 - 15')).toBeInTheDocument();
        }, 1000);
        setTimeout(() => {
            expect(getByText('15 - 18')).toBeInTheDocument();
        }, 1000);
    });
});
