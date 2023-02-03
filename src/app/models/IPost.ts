export interface IPost {
  _id?: string;
  content?: any;
  photo?: string;
  createdAt?: string;
  createdBy?: string;
  likeCount?: number;
  likedBy?: ILike[];
  comments?: IComment[];
}

export interface ILike {
  author: string;
  name: string;
  isLiked: boolean;
}
export interface IComment {
  createdBy?: string;
  comment?: string;
  timestamp?: number;
}
