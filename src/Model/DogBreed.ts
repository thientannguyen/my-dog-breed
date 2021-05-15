export class DogBreed {
    public id: string;
    public name: string;
    public life_span: string;
    public origin: string;
    public reference_image_id: string;
    public temperament: string;
    public bred_for: string;
    public breed_group: string;
    public weight: { imperial: string; metric: string };
    public height: { imperial: string; metric: string };

    constructor(
        id: string,
        name: string,
        life_span: string,
        origin: string,
        reference_image_id: string,
        temperament: string,
        bred_for: string,
        breed_group: string,
        weight: { imperial: string; metric: string },
        height: { imperial: string; metric: string }
    ) {
        this.id = id;
        this.name = name;
        this.life_span = life_span;
        this.origin = origin;
        this.reference_image_id = reference_image_id;
        this.temperament = temperament;
        this.bred_for = bred_for;
        this.breed_group = breed_group;
        this.weight = weight;
        this.height = height;
    }
}
