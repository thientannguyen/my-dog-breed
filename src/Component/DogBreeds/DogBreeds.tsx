import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { DogBreed } from '../../Model/DogBreed';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'height', headerName: 'Height', width: 150 },
    { field: 'life_span', headerName: 'Life span', width: 150 },
    {
        field: 'reference_image_id',
        headerName: 'Image ID',
        width: 150,
        sortable: false,
    },
    {
        field: 'temperament',
        headerName: 'Temperament',
        width: 350,
        sortable: false,
    },
    { field: 'weight', headerName: 'Weight', width: 150, sortable: false },
];

export interface IDogBreeds {
    items: DogBreed[];
}

export default function DogBreeds(props: IDogBreeds) {
    let rows = props.items
        .map(
            ({
                id,
                name,
                height,
                life_span,
                reference_image_id,
                temperament,
                weight,
            }) => ({
                id,
                name,
                height: height.metric,
                life_span,
                reference_image_id,
                temperament,
                weight: weight.metric,
            })
        )
        .sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    return (
        <div style={{ height: 630, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} />
        </div>
    );
}
