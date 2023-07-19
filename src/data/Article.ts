//Моковые входящие данные в карточку статьи

import { IArticle } from '../components/interface/IArticle';

export const article: IArticle[] = [
  {
    imgAuthor: '../img/data/author.png',
    autor: 'Иванов Петр',
    city: 'Алтай',
    category: 'Путешествия',
    time: 5,

    titleArticle:
      '«Алтайская кругосветка»: кольцевой автомаршрут по Горному Алтаю',
    textArticle:
      '«Алтайская кругосветка»: кольцевой автомаршрут по Горному Алтаю',
    imgArticle: '../img/data/article.png',

    likes: 256,
    comments: 20,
  },
];
