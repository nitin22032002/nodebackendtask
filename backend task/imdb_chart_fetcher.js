const axios=require("axios");
const url=require("url")
const cheerio=require("cheerio")
const fetchMovieChart=async(chart_url="",items_count=0)=>{
    let parseUrl=url.parse(chart_url)
    let res=await axios.get(chart_url);
    let html=res.data;
    let $=cheerio.load(html)
    let all_movie=$('td.titleColumn').find('a')
    let selected_movie={}
    for(let i=0;i<Math.min(items_count,Object.keys(all_movie).length);i++){
        selected_movie[i]=`${parseUrl.protocol}//${parseUrl.hostname}${all_movie[i].next.prev.attribs.href}`
    }
    let movies=await fetchMovieContent(selected_movie);
    return movies;
}

async function fetchMovieContent(movie_object){
    let movies=[]
    for(let key in movie_object){
        let res=await axios.get(movie_object[key]);
        let html=res.data;
        let $=cheerio.load(html)
        let title=$('h1').text()
        let movie_release_year=$('span.sc-8c396aa2-2')[0].children[0].data
        let duration=$($('.ipc-inline-list__item')[2].children).text()
        let imdb_rating=$('.sc-7ab21ed2-1')[0].children[0].data
        let summary=$('.sc-16ede01-2').text()
        let genre_arr=$('.ipc-chip-list')[0]
        let genre=genre_arr.children.map((item)=>{
                return $(item).text()
            })
        genre=genre.join(",")
        movies.push({title,movie_release_year,imdb_rating,duration,summary,genre})
    }
    return movies;
}

let params=process.argv.slice(2)

fetchMovieChart(params[0],params[1]).then((movies)=>{
    console.log(movies)
}).catch((e)=>{
    console.log(e)
})