export interface Profile {
  username : string;
  bio : string | null;
  image : string | null;
  following : boolean;
}

export interface Article {
  slug : string;
  title : string;
  description : string;
  body : string;
  tagList : string[];
  createdAt : string; 
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author : Profile;
}

export interface User {
  email: string;
  token: string;
  userName : string;  
  bio: string | null;
  image: string | null;
}

export interface Comment {
  id : number;
  body: string;
  createdAt: string;
  author: Profile;
}