//Моковые входящие данные в карточку статьи

import {Article} from '../interface/Article';

export async function get() {
    console.log("hello")
    return (await (await fetch("http://178.170.192.87/rest/v1/articles", {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
        }
    })).json()).map((el:any) => {
        console.log(el.icon_url)
        return {
            imgAuthor: '../img/data/author.png',
            autor: 'Иванов Петр',
            city: 'Алтай',
            category: 'Путешествия',
            time: 5,
    
            titleArticle:
                el.header,
            textArticle:
                el.description,
            imgArticle: el.icon_url||'../img/data/article.png',
    
            likes: 256,
            comments: 20,
        }
    })
}

export const article: Article[] = [
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
