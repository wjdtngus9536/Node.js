export interface PostDto { // 게시글의 데이터를 나타내는 타입
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date;
    updatedDT ?: Date;
}