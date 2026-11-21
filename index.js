const axios = require('axios');
const parser = require('fast-html-parser');
const Host = 'https://mycima.fun';




client = axios.create({
            timeout: 4000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0"
            }
        });




async function search(type, query) {


    if (type === 'movie') {
        try {
            var URL = `${Host}/search/${query.replace(/\s/g, '+')}`;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch(error) {
            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
        }
    }
    else if (type === 'series'){
        try {
            var URL = `${Host}/search/${query.replace(/\s/g, '+')}/list/series/`;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch(error) {
            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
        }
        
    }


    try {
        var promise = (await client.get(link)).data;
    }catch (error) {
        console.log(error);
    }    


    let parsed = parser.parse(promise).querySelector('.Grid--MycimaPosts').querySelectorAll('.GridItem');


        return parsed.map( (movie) => {
            if (movie) {
                let cat = {
                    id: movie.querySelector('a').rawAttributes['href'].toString(),
                    type: type,
                    title : movie.querySelector('a').rawAttributes['title'].toString(),
                    poster : movie.querySelector('.BG--GridItem').rawAttributes['data-lazy-style'].replace(/\(|\)|;|--image:url/g, ''),
                }
                if (movie.querySelector('.year')) {
                    cat.released = movie.querySelector('.year').rawText.toString();
