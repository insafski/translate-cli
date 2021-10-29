const url = process.env.TRANSLATE_API_URL ||  "https://api.fscch.ru/api/author/yc_service/translate";
const token = process.env.TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6ImluaUB0ZXN0In0sImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtc2Vzc2lvbi1pZCI6IjY1YTM5NWQ0LWRjYmQtNDEzZi04ZTkxLTI3NmFlZDEzMWI0NCIsIngtaGFzdXJhLXVzZXItaWQiOiI0IiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhdXRob3IiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYXV0aG9yIn0sImV4cGlyZV9hdCI6IjIwMjEtMTAtMDYgMjA6NTg6MzEgKzAwMDAifQ.xRjkgiZrfn9Bk7VKHR_RUT2cbJVmF2Wk6FExsidaGtQ";
const fetch = require("node-fetch");

const localesMapInvert = {
    ru: "ru",
    en: "en",
    el: "el",
    sr: "sr",
    fr: "fr",
    ka: "ge",
    sq: "al",
    ar: "ae",
    he: "he",
    tr: "tr",
    zh: "cn",
    ja: "ja",
}

function fetchTranslateApi (params) {
    // const fetchOptions = {
    //     headers: {
    //         "authorization": `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     },
    //     method: "POST",
    //     body: JSON.stringify(params),
    //     mode: "cors",
    //     credentials: "include",
    //     redirect: "follow",

    // };
    
    // fetch(url, fetchOptions)
    //     // .then(res => res.json())
        
    //     .then(res => console.log(res))
    //     // .then(text => console.log(text));

    return new Promise(resolve => {
        formatReceivedData({
            "en": {
                "translations": [
                    {
                        "text": "dwed",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "sr": {
                "translations": [
                    {
                        "text": "двед",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "el": {
                "translations": [
                    {
                        "text": "dwed",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "fr": {
                "translations": [
                    {
                        "text": "dwed",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "ka": {
                "translations": [
                    {
                        "text": "დაღეჭილი",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "sq": {
                "translations": [
                    {
                        "text": "pakësuar",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "ar": {
                "translations": [
                    {
                        "text": "dwed",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "he": {
                "translations": [
                    {
                        "text": "חתוך",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "tr": {
                "translations": [
                    {
                        "text": "dwedname",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "zh": {
                "translations": [
                    {
                        "text": "dwed碌录潞陆",
                        "detectedLanguageCode": "en"
                    }
                ]
            },
            "ja": {
                "translations": [
                    {
                        "text": "dwed",
                        "detectedLanguageCode": "en"
                    }
                ]
            }
        }).then(data => resolve(data));
    })
}

function formatReceivedData(data) {
    return new Promise(resolve => {
        const formattedData = Object.entries(data).reduce((result, [lang, translations]) => {
            const langTranslations = translations?.translations || [];

            return {
                ...result,
                [localesMapInvert[lang]]: langTranslations.length === 1 ? { auto: (langTranslations?.[0]?.text || "") } : langTranslations
            }
        }, {});

        return resolve(formattedData);
    })
}

module.exports = fetchTranslateApi;