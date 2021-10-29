const fs = require('fs')

const fetchTranslateApi = require("./translate.js");

const _ = require("lodash");
const { values } = require('lodash');

const fileName = process.argv.slice(2)

try {
    const parsedData = JSON.parse(fs.readFileSync(`./${fileName}`, 'utf8'))

    if (typeof parsedData === "object") {

        const translatedData = (function some(data) {
            const objetcItemGenerator = getObjectDeepItemGenerator(data);

            let currentKey;

            const neestedDestiny = new Object();

            // do {
                currentKey = objetcItemGenerator.next();

            
                if (currentKey.value) {
                    if (typeof currentKey.value.value === "object") {
                        neestedDestiny[currentKey.value.key] = some(currentKey.value.value);
                    } else {
                        getTranslate(currentKey.value.value)
                            .then(d => {
                                neestedDestiny[currentKey.value.key] = d;
                            })
                    }
                }
            // } while (currentKey.value)

            return neestedDestiny;
        }(parsedData))

        console.log(translatedData)
    }
} catch (err) {
    console.error(err)
}

function* getObjectDeepItemGenerator(object) {
    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
        // if (object[keys[i] !== "object"]) {
        //     getTranslate(object[keys[i]])
        //         .then(d => {
        //             neestedDestiny[currentKey.value.key] = d;
        //         });
            
        //     yield;
        // }

        yield {
            key: keys[i],
            value: object[keys[i]]
        };
    }
}

function getTranslate(value) {
    const body = {
        langs: ["en", "sr", "el", "fr", "ka", "sq", "ar", "he", "tr", "zh", "ja"],
        texts: value
    }

    return fetchTranslateApi(body);
}

function writeToFile(content) {
    fs.writeFile('./data.json', JSON.stringify(content), err => {
        if (err) {
            console.error(err)
            return
        }
        console.log("Done!")
    })
}