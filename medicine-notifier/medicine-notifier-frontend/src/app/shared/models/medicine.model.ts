export class Medicine {
    id: string;
    name: string;
    description: string;
    date: number;
    time: number;
    shapeImgUrl: string;
    isActive: boolean;
    status: 'completed' | 'in-progress';
}
