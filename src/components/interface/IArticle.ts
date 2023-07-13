//Интерфейс входящих в статью данных

export interface IArticle {
  imgAuthor: string;
  autor: string;
  city: string;
  category: string;
  time: number;
  titleArticle: string;
  textArticle: string;
  imgArticle: string;
  likes: number;
  comments: number;
}
