import { PostAddSharp } from '@material-ui/icons';
import React, { useEffect, useReducer, useState} from 'react';

import PostList from '../components/PostList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';

const Posts = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPosts, setLoadedPosts ]= useState();
    useEffect(()=>{
        const fetchPosts = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/posts"
                  );
                  setLoadedPosts(responseData.posts);
            }catch(err){}
        };
        fetchPosts();
    },[sendRequest]);
    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
        {!isLoading && loadedPosts &&<PostList items={loadedPosts} />}
        </React.Fragment>;
};

export default Posts;