import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TableSortLabel,
    Paper,
} from '@material-ui/core';
import { useRef, useState } from 'react';
import { DogBreed } from '../../Model/DogBreed';
import DogImage from '../DogImage/DogImage';

export interface IDogBreeds {
    items: DogBreed[];
}

export default function DogBreeds(props: IDogBreeds) {
    const rows = props.items.map(
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
            image: reference_image_id,
            temperament,
            weight: weight.metric,
        })
    );
    console.log(rows);
    const sortBy = useRef('name');
    const sortOrder = useRef<'asc' | 'desc' | undefined>('asc');

    const sortData = (
        sortBy: string,
        sortOrder: 'asc' | 'desc' | undefined,
        rows: any
    ) => {
        var itemsToSort = JSON.parse(JSON.stringify(rows));
        var sortedItems = [];
        var compareFn = null;
        switch (sortBy) {
            case 'name':
                compareFn = (i: any, j: any) => {
                    if (i.name < j.name) {
                        return sortOrder === 'asc' ? -1 : 1;
                    } else {
                        if (i.name > j.name) {
                            return sortOrder === 'asc' ? 1 : -1;
                        } else {
                            return 0;
                        }
                    }
                };
                break;
            case 'height':
                compareFn = (i: any, j: any) => {
                    const firstSpaceIndex = i.height.indexOf(' ');
                    const first =
                        firstSpaceIndex === -1
                            ? i.height
                            : Number(i.height.substr(0, firstSpaceIndex));
                    const secondSpaceIndex = j.height.indexOf(' ');
                    const second =
                        secondSpaceIndex === -1
                            ? j.height
                            : Number(j.height.substr(0, secondSpaceIndex));
                    if (first < second) {
                        return sortOrder === 'asc' ? -1 : 1;
                    } else {
                        if (first > second) {
                            return sortOrder === 'asc' ? 1 : -1;
                        } else {
                            return 0;
                        }
                    }
                };
                break;
            case 'life_span':
                compareFn = (i: any, j: any) => {
                    const firstSpaceIndex = i.life_span.indexOf(' ');
                    const first =
                        firstSpaceIndex === -1
                            ? i.life_span
                            : Number(i.life_span.substr(0, firstSpaceIndex));
                    const secondSpaceIndex = j.life_span.indexOf(' ');
                    const second =
                        secondSpaceIndex === -1
                            ? j.life_span
                            : Number(j.life_span.substr(0, secondSpaceIndex));
                    if (first < second) {
                        return sortOrder === 'asc' ? -1 : 1;
                    } else {
                        if (first > second) {
                            return sortOrder === 'asc' ? 1 : -1;
                        } else {
                            return 0;
                        }
                    }
                };
                break;
            default:
                break;
        }
        sortedItems = itemsToSort.sort(compareFn);
        return sortedItems;
    };

    const [sortedItems, setSortItems] = useState(
        sortData(sortBy.current, sortOrder.current, rows)
    );

    const requestSort = (pSortBy: string) => {
        if (pSortBy === sortBy.current) {
            sortOrder.current = sortOrder.current === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy.current = pSortBy;
            sortOrder.current = 'asc';
        }
        setSortItems(sortData(sortBy.current, sortOrder.current, rows));
    };

    return (
        <div className="container">
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy.current === 'name'}
                                    direction={sortOrder.current}
                                    onClick={() => {
                                        requestSort('name');
                                    }}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy.current === 'height'}
                                    direction={sortOrder.current}
                                    onClick={() => {
                                        requestSort('height');
                                    }}
                                >
                                    Height
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy.current === 'life_span'}
                                    direction={sortOrder.current}
                                    onClick={() => {
                                        requestSort('life_span');
                                    }}
                                >
                                    Life Span
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Temperament</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedItems.map((item: any, indx: number) => {
                            return (
                                <TableRow key={indx}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.height}</TableCell>
                                    <TableCell>{item.life_span}</TableCell>
                                    <TableCell>{item.temperament}</TableCell>
                                    <TableCell>{item.weight}</TableCell>
                                    <TableCell>
                                        <DogImage id={item.image} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter />
                </Table>
            </Paper>
        </div>
    );
}
