import React, { useState, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { qqSearch } from './server';
import { debounce } from './utils';
import Loading from './components/Loading';
import { SearchResult, SerachError } from './types/app.type'
import './App.css';

function App() {

  const [serachResult, setSerachResult] = useState<SearchResult | null>(null);
  const [serachError, setSerachError] = useState<SerachError | null>(null);
  const [loadingVisible, setLoadingVisible] = useState<boolean>(false);

  const handleSearch = useCallback((event: any): any => {
    const validateReg = /^\d+$/g; 
    const qq = event.target.value;
    // 验证输入的qq号码格式
    if(validateReg.test(qq)) {
      unstable_batchedUpdates(() => {
        setSerachError(null);
        setLoadingVisible(true);
      })
      
      qqSearch(qq).then(response => {
        if(response?.data?.code === 1) {
          // 批量更新，避免重复render
          unstable_batchedUpdates(() => {
            setSerachResult(response.data)
            setLoadingVisible(false);
          })
        }else{
          // 批量更新，避免重复render
          unstable_batchedUpdates(() => {
            setSerachError({
              visible: true,
              tip: response.data.msg
            })
            setLoadingVisible(false);
          })
        }
        
      }).catch(error => {
        unstable_batchedUpdates(() => {
          setSerachError({
            visible: true,
            tip: error
          })
          setLoadingVisible(false);
        })
      })
    }else{
      // 校验不通过
      setSerachError({
        visible: true,
        tip: '请输入合法QQ号'
      })
    }
    
  }, [])

  return (
    <>
      <div className="qq-search-wrap">
        <h1>QQ号查询</h1>
        <div>
          QQ
        <input className="qq-search-input" type="text" onInput={debounce(handleSearch)} />
        </div>
        {
          serachError?.visible &&
          <div className="search-error-wrap">
            {serachError?.tip}
          </div>
        }
        <div className="search-result-wrap">
          <div className="search-result-image">
            {
              serachResult?.qlogo && 
              <img src={serachResult?.qlogo} alt="img" />
            }
          </div>
          <div className="search-result-content">
            <p title={serachResult?.name}>{serachResult?.name}</p>
            <p title={serachResult?.qq}>{serachResult?.qq}</p>
          </div>
          <Loading visible={loadingVisible} />
        </div>
      </div>
    </>
  );
}

export default App;
