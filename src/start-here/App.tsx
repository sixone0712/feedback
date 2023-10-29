import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import CategoryProvider from '../fill-here/CategoryProvider';
import Archive from './components/Archive';
import Feedback from './components/Feedback';
import { useFeedbackContext } from './libs/context/FeedbackProvider';

function App() {
  const [isFetching, setFetching] = useState(false);
  const { saveCategories } = useFeedbackContext();

  useEffect(() => {
    const getCategories = async () => {
      setFetching(true);

      const { categories } = await CategoryProvider.getCategories();
      return categories;
    };

    getCategories()
      .then((categories) => {
        saveCategories(categories);
      })
      .catch((error) => {
        console.error(error);
        alert('데이터를 가져오는 데 실패했습니다.');
        saveCategories([]);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return (
    <>
      <h1>피드백 유형 관리</h1>
      {isFetching ? 'Loading....' : <Feedback />}
      <h1>아카이브</h1>
      {isFetching ? 'Loading....' : <Archive />}
    </>
  );
}

export default App;
