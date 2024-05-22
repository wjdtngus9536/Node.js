// 블로그 게시글의 타입을 정의
export interface PostDto {
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date;
    updatedDt?: Date;
}