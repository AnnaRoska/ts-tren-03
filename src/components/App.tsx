import { useState } from 'react';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import { Article } from "../types/article";
// 1. Імпортуємо HTTP-функцію
import { fetchArticles } from "../services/articleService";


export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
//  Додаємо стан індикатора завантаження
  const [isLoading, setIsLoading] = useState(false);
 //  Оголошуємо стан
  const [isError, setIsError] = useState(false);
  const handleSearch = async (topic: string) => {	  
    //  Додаємо блок try...catch
    try {
    // змінюємо індикатор на true перед запитом
    setIsLoading(true);
//  Скидаємо стан помилки в false перед кожним запитом
      setIsError(false);
//  Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);    }
    catch {
      //  Встановлюємо стан isError в true
      setIsError(true);
} finally {
      // Встановлюємо стан isLoading в false після будь якого результату запиту
      setIsLoading(false);
    }
  };
  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      {/*  Відображаєм повідомлення про завантаження даних в JSX */}
      {isLoading && <p>Loading data, please wait...</p>}
      {/*  Використовуємо стан isError щоб показати помилку */}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}