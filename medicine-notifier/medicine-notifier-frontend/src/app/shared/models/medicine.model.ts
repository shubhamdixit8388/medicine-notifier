export class Medicine {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    shapeImgUrl: string;
    isActive: boolean;
    status: 'completed' | 'in-progress';
}
