import React, {useEffect, useState} from 'react'; //use effect is useful because it lets our app run after its called
import alanBtn from '@alan-ai/alan-sdk-web'; //we are importing the alan ai to our application

import NewsCards from './components/NewsCards/NewsCards.js';




import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles.js';

const alanKey = '0576b30945e660763eb900a2cdedc3e12e956eca572e1d8b807a3e2338fdd0dc/stage'; //api key from Alan.ai

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command.toLowerCase() === 'newheadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command.toLowerCase() === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if(command.toLowerCase() === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}): number;

                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again');
                    }
                    else if(article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening... ')
                    }
                    
                }
            }
        })
        
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo"/>

            </div>
            <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
        </div>
    );
}

export default App;